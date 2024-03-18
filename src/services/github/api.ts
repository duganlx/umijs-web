import { Octokit } from "octokit";

export interface pullFromGithubRequest {
  owner: string;
  repo: string;
  path: string;
}

export async function pullFromGithub(req: pullFromGithubRequest) {
  const { owner, repo, path } = req;
  const octokit = new Octokit({});

  const reply = await octokit.request(
    "GET /repos/{owner}/{repo}/contents/{path}",
    {
      owner,
      repo,
      path,
    }
  );

  if (reply.status !== 200) {
    return "";
  }

  const { data } = reply;

  const base64_str = (data as { content: string | undefined }).content || "";
  const decoded_content = Buffer.from(base64_str, "base64").toString();
  return decoded_content;
}
