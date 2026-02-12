import type { RepoData, CommitData } from "./github.js";

export interface ColdRepo {
  name: string;
  fullName: string;
  description: string | null;
  language: string | null;
  daysSinceCommit: number;
  lastCommitMessage: string;
  reentryActions: string[];
}

export function daysSince(dateString: string): number {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

export function filterColdRepos(repos: RepoData[], thresholdDays: number): RepoData[] {
  return repos.filter((repo) => {
    if (repo.isFork || repo.isArchived) return false;
    const days = daysSince(repo.pushedAt);
    return days >= thresholdDays;
  });
}

export function sortByRevivePotential(repos: ColdRepo[]): ColdRepo[] {
  return repos.sort((a, b) => a.daysSinceCommit - b.daysSinceCommit);
}

export function generateReentryActions(
  description: string | null,
  lastCommitMessage: string
): string[] {
  const actions: string[] = [];
  const msg = lastCommitMessage.toLowerCase();
  const desc = (description || "").toLowerCase();

  if (msg.includes("wip") || msg.includes("work in progress")) {
    actions.push("Continue the work-in-progress from the last session");
  } else if (msg.includes("fix") || msg.includes("bug")) {
    actions.push("Verify the bug fix is complete and test edge cases");
  } else if (msg.includes("add") || msg.includes("feat") || msg.includes("implement")) {
    actions.push("Review the newly added feature and consider enhancements");
  } else if (msg.includes("refactor") || msg.includes("clean")) {
    actions.push("Continue refactoring or clean up remaining tech debt");
  } else if (msg.includes("init") || msg.includes("initial")) {
    actions.push("Set up the basic project structure and core functionality");
  } else if (msg.includes("readme") || msg.includes("docs")) {
    actions.push("Update documentation and add usage examples");
  } else {
    actions.push("Review the last commit and identify next logical step");
  }

  if (desc.includes("api") || desc.includes("backend")) {
    actions.push("Add or improve API endpoints and error handling");
  } else if (desc.includes("cli") || desc.includes("command")) {
    actions.push("Add new command options or improve help output");
  } else if (desc.includes("web") || desc.includes("frontend") || desc.includes("ui")) {
    actions.push("Improve UI/UX and add responsive design");
  } else {
    actions.push("Write or improve the README with clear setup instructions");
  }

  actions.push("Check if dependencies are outdated and update them");

  return actions.slice(0, 3);
}

export function buildColdRepo(
  repo: RepoData,
  commit: CommitData | null
): ColdRepo {
  const daysSinceCommit = commit ? daysSince(commit.date) : daysSince(repo.pushedAt);
  const lastCommitMessage = commit?.message || "No commit message available";

  return {
    name: repo.name,
    fullName: repo.fullName,
    description: repo.description,
    language: repo.language,
    daysSinceCommit,
    lastCommitMessage,
    reentryActions: generateReentryActions(repo.description, lastCommitMessage),
  };
}
