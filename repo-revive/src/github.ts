import { Octokit } from "@octokit/rest";

export interface RepoData {
  name: string;
  fullName: string;
  description: string | null;
  language: string | null;
  pushedAt: string;
  isFork: boolean;
  isArchived: boolean;
  defaultBranch: string;
}

export interface CommitData {
  message: string;
  date: string;
}

export function createOctokit(token: string): Octokit {
  return new Octokit({ auth: token });
}

export async function fetchUserRepos(octokit: Octokit): Promise<RepoData[]> {
  const repos: RepoData[] = [];
  let page = 1;

  while (true) {
    const response = await octokit.repos.listForAuthenticatedUser({
      per_page: 100,
      page,
      sort: "pushed",
      direction: "desc",
    });

    if (response.data.length === 0) break;

    for (const repo of response.data) {
      repos.push({
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description,
        language: repo.language,
        pushedAt: repo.pushed_at || "",
        isFork: repo.fork,
        isArchived: repo.archived || false,
        defaultBranch: repo.default_branch,
      });
    }

    if (response.data.length < 100) break;
    page++;
  }

  return repos;
}

export async function fetchLastCommit(
  octokit: Octokit,
  owner: string,
  repo: string,
  branch: string
): Promise<CommitData | null> {
  try {
    const response = await octokit.repos.listCommits({
      owner,
      repo,
      sha: branch,
      per_page: 1,
    });

    if (response.data.length === 0) return null;

    const commit = response.data[0];
    return {
      message: commit.commit.message.split("\n")[0],
      date: commit.commit.committer?.date || commit.commit.author?.date || "",
    };
  } catch {
    return null;
  }
}
