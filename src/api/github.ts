/**
 * GitHub API functions
 * --------------------
 * Contains helper functions for fetching data from the GitHub API.
 * These functions are used throughout the application to retrieve
 * GitHub user information and search for users.
 */

// Fetch a single GitHub user by username
export const fetchGithubUser = async (username: string) => {
  // Request user data from the GitHub API using the configured base URL
  const res = await fetch(`${import.meta.env.VITE_GITHUB_API_URL}/users/${username}`);

  // Throw an error if the request fails (e.g., user does not exist)
  if (!res.ok) throw new Error("User not found");

  // Parse the response JSON
  const data = await res.json();

  // Return the user data
  return data;
};

// Search GitHub users by query string
export const searchGithubUser = async (query: string) => {
  // Request search results from the GitHub API
  const res = await fetch(`${import.meta.env.VITE_GITHUB_API_URL}/search/users?q=${query}`);

  // Throw an error if the request fails
  if (!res.ok) throw new Error("User not found");

  // Parse the response JSON
  const data = await res.json();

  // The search API returns results inside an `items` array
  return data.items;
};
