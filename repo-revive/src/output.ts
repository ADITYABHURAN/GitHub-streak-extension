import chalk from "chalk";
import type { ColdRepo } from "./analyze.js";

export function printHeader(count: number, threshold: number): void {
  console.log();
  console.log(chalk.bold.cyan("🔍 Repo Revive Report"));
  console.log(chalk.gray(`Found ${count} cold repos (no activity in ${threshold}+ days)`));
  console.log(chalk.gray("─".repeat(50)));
  console.log();
}

export function printColdRepo(repo: ColdRepo): void {
  const ageColor = repo.daysSinceCommit > 365 ? chalk.red : 
                   repo.daysSinceCommit > 90 ? chalk.yellow : chalk.green;

  console.log(chalk.bold.white(`📦 ${repo.name}`));
  console.log(
    chalk.gray("   Last commit: ") +
    ageColor(`${repo.daysSinceCommit} days ago`) +
    chalk.gray(" — ") +
    chalk.italic(`"${truncate(repo.lastCommitMessage, 50)}"`)
  );
  console.log(
    chalk.gray("   Language: ") +
    chalk.cyan(repo.language || "Unknown")
  );

  if (repo.description) {
    console.log(chalk.gray(`   Description: ${truncate(repo.description, 60)}`));
  }

  console.log(chalk.gray("   Re-entry actions:"));
  repo.reentryActions.forEach((action, i) => {
    console.log(chalk.yellow(`     ${i + 1}. `) + chalk.white(action));
  });

  console.log();
}

export function printNoReposFound(threshold: number): void {
  console.log();
  console.log(chalk.green("✨ Great job! No cold repos found."));
  console.log(chalk.gray(`All your repos have activity within the last ${threshold} days.`));
  console.log();
}

export function printError(message: string): void {
  console.log();
  console.log(chalk.red("❌ Error: ") + message);
  console.log();
}

export function printLoading(message: string): void {
  console.log(chalk.gray(`⏳ ${message}...`));
}

function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length - 3) + "...";
}
