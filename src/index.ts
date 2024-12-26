import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { scanDependencies } from "./commands/scan.js";
import { resolveConflicts } from "./commands/resolve.js";
import { visualizeTree } from "./commands/visualize.js";

yargs(hideBin(process.argv)) // Initialize yargs with CLI arguments
  .command(
    "scan",
    "Scan for dependency conflicts",
    () => {},
    async () => {
      await scanDependencies();
    }
  )
  .command(
    "resolve",
    "Resolve dependency conflicts",
    () => {},
    async () => {
      await resolveConflicts();
    }
  )
  .command(
    "visualize",
    "Visualize dependency tree",
    () => {},
    async () => {
      await visualizeTree();
    }
  )
  .demandCommand(1, "You need to specify at least one command.")
  .help().argv; // Ensure the `.argv` call to execute the yargs chain

export * from "./commands/scan";
export * from "./commands/resolve";
export * from "./commands/visualize";
