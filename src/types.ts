/**
 * GitHubUser Type
 * ----------------
 * Represents a GitHub user object as returned by the GitHub API.
 * Used throughout the application for typing user data.
 */
export type GitHubUser = {
  login: string; // GitHub username / login handle
  name: string; // Full name of the user (may be empty)
  avatar_url: string; // URL to the user's avatar image
  html_url: string; // URL to the user's GitHub profile
  bio: string; // Short biography or description (may be empty)
};
