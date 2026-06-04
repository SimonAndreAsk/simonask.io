export function isGithubProjectUrl(url: string): boolean {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    return host === "github.com" || host.endsWith(".github.io");
  } catch {
    return false;
  }
}

/** Homepage label for a project URL (repo, live site, or write-up). */
export function projectLinkLabel(url: string): string {
  try {
    const { hostname } = new URL(url);
    const host = hostname.replace(/^www\./, "");

    if (host === "github.com") return "View on GitHub";
    if (host.endsWith(".github.io")) return "View on GitHub Pages";

    if (host === "gitlab.com") return "View on GitLab";
    if (host === "bitbucket.org") return "View on Bitbucket";

    if (host === "simonask.io" || host.endsWith(".simonask.io")) {
      return "View site";
    }

    if (host === "vercel.app" || host.endsWith(".vercel.app")) {
      return "View deployment";
    }

    if (host === "notion.so" || host.endsWith(".notion.site")) {
      return "Read case study";
    }

    if (host === "medium.com" || host.endsWith(".medium.com")) {
      return "Read article";
    }

    if (host === "linkedin.com" || host.endsWith(".linkedin.com")) {
      return "View on LinkedIn";
    }

    return "View project";
  } catch {
    return "View project";
  }
}
