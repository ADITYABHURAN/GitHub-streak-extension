#!/usr/bin/env node
import { config } from "dotenv";
import { Command } from "commander";
import { createOctokit, fetchUserRepos, fetchLastCommit } from "./github.js";
import { filterColdRepos, sortByRevivePotential, buildColdRepo } from "./analyze.js";
import { printHeader, printColdRepo, printNoReposFound, printError, printLoading } from "./output.js";

config();

const program = new Command();

program
  .name("repo-revive")
  .description("Analyze your GitHub repos and find abandoned projects to revive")
  .version("1.0.0")
  .option("-d, --days <number>", "Inactivity threshold in days", "30")
  .option("-l, --limit <number>", "Maximum repos to show", "5")
  .action(async (options) => {
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      printError("GITHUB_TOKEN not found. Create a .env file with your token.");
      process.exit(1);
    }

    const thresholdDays = parseInt(options.days, 10);
    const limit = parseInt(options.limit, 10);

    try {
      const octokit = createOctokit(token);

      printLoading("Fetching your repositories");
      const allRepos = await fetchUserRepos(octokit);

      printLoading("Analyzing repository activity");
      const coldRepos = filterColdRepos(allRepos, thresholdDays);

      if (coldRepos.length === 0) {
        printNoReposFound(thresholdDays);
        return;
      }

      printLoading("Generating re-entry briefs");
      const analyzedRepos = [];

      for (const repo of coldRepos.slice(0, limit * 2)) {
        const [owner, repoName] = repo.fullName.split("/");
        const commit = await fetchLastCommit(octokit, owner, repoName, repo.defaultBranch);
        analyzedRepos.push(buildColdRepo(repo, commit));
      }

      const sorted = sortByRevivePotential(analyzedRepos).slice(0, limit);

      printHeader(coldRepos.length, thresholdDays);
      sorted.forEach(printColdRepo);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      printError(message);
      process.exit(1);
    }
  });

program.parse();
