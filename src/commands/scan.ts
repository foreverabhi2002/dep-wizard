import fs from "fs-extra";
import chalk from "chalk";
import path from "path";
import semver from "semver";

interface DependencyConflict {
  dep: string;
  required: string;
  installed: string;
}

export async function scanDependencies(): Promise<void> {
  const packageJsonPath = path.resolve(process.cwd(), "package.json");

  if (!fs.existsSync(packageJsonPath)) {
    console.log(chalk.red("No package.json found in the current directory."));
    return;
  }

  const packageJson = await fs.readJSON(packageJsonPath);
  const dependencies: Record<string, string> = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };

  console.log(chalk.blue("Scanning dependencies for conflicts..."));

  const conflicts: DependencyConflict[] = [];

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
        conflicts.push({ dep, required: version, installed: installedVersion });
      }
    }
  }

  if (conflicts.length > 0) {
    console.log(chalk.yellow("Conflicts detected:"));
    conflicts.forEach(({ dep, required, installed }) => {
      console.log(
        `- ${chalk.bold(dep)}: Required ${chalk.green(
          required
        )}, Installed ${chalk.red(installed)}`
      );
    });
  } else {
    console.log(chalk.green("No conflicts detected."));
  }
}
