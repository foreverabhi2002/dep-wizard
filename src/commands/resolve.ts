import fs from "fs-extra";
import chalk from "chalk";
import path from "path";
import semver from "semver";

export async function resolveConflicts(): Promise<void> {
  const packageJsonPath = path.resolve(process.cwd(), "package.json");

  if (!fs.existsSync(packageJsonPath)) {
    console.log(chalk.red("No package.json found in the current directory."));
    return;
  }

  const backupPath = `${packageJsonPath}.backup`;
  await fs.copy(packageJsonPath, backupPath);
  console.log(chalk.green(`Backup created at ${backupPath}`));

  const packageJson = await fs.readJSON(packageJsonPath);
  const dependencies: Record<string, string | semver.Range> = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };
  const updatedDeps: Record<string, string> = {};

  for (const [dep, version] of Object.entries(dependencies)) {
    const installedPath = path.resolve(
      process.cwd(),
      "node_modules",
      dep,
      "package.json"
    );
    if (fs.existsSync(installedPath)) {
      const installedVersion = (await fs.readJSON(installedPath)).version;
      if (!semver.satisfies(installedVersion, version)) {
        const latestVersion = semver.maxSatisfying(
          [installedVersion, version],
          ">=0.0.0"
        );
        updatedDeps[dep] = latestVersion || version;
      }
    }
  }

  packageJson.dependencies = { ...packageJson.dependencies, ...updatedDeps };
  await fs.writeJSON(packageJsonPath, packageJson, { spaces: 2 });

  console.log(chalk.green("Conflicts resolved! Updated package.json."));
}
