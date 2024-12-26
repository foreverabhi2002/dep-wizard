import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import ora from "ora";

interface DependencyTree {
  [key: string]: DependencyTree;
}

export async function visualizeTree(): Promise<void> {
  const spinner = ora("Building dependency tree...").start();

  try {
    const tree: DependencyTree = {};
    const nodeModulesPath = path.resolve(process.cwd(), "node_modules");

    // Helper function to traverse node_modules
    const traverse = async (
      dir: string,
      parent: DependencyTree
    ): Promise<void> => {
      const dirs = await fs.readdir(dir);

      for (const subDir of dirs) {
        // Skip special directories
        if (subDir === ".bin") {
          continue;
        }

        const subPath = path.join(dir, subDir);
        if ((await fs.stat(subPath)).isDirectory()) {
          // Initialize the dependency subtree
          parent[subDir] = {};

          const nestedNodeModules = path.join(subPath, "node_modules");
          // Traverse the nested node_modules only if it exists
          if (await fs.pathExists(nestedNodeModules)) {
            await traverse(nestedNodeModules, parent[subDir]);
          }
        }
      }
    };

    // Start traversing the root node_modules
    await traverse(nodeModulesPath, tree);

    spinner.succeed("Dependency tree built!");
    console.dir(tree, { depth: null, colors: true });
  } catch (err) {
    spinner.fail("Failed to build dependency tree.");
    console.error(err);
  }
}
