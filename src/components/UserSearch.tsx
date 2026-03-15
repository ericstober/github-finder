/**
 * UserSearch Component
 * --------------------
 * Handles searching for GitHub users, displaying search suggestions,
 * showing a selected user's profile, and maintaining a list of
 * recently searched usernames stored in localStorage.
 */

// React hooks
import { useState, useEffect } from "react";

// React Query for data fetching and caching
import { useQuery } from "@tanstack/react-query";

// GitHub API helper functions
import { fetchGithubUser, searchGithubUser } from "../api/github";

// Components
import UserCard from "./UserCard";
import RecentSearches from "./RecentSearches";
import SuggestionDropdown from "./SuggestionDropdown";

// Utility hook for debouncing user input
import { useDebounce } from "use-debounce";

// Main component responsible for searching GitHub users
const UserSearch = () => {
  // Current value inside the search input
  const [username, setUsername] = useState("");

  // Username that has been submitted for an API request
  const [submittedUsername, setSubmittedUsername] = useState("");

  // List of recently searched usernames stored in localStorage
  const [recentUsers, setRecentUsers] = useState<string[]>(() => {
    const stored = localStorage.getItem("recentUsers");
    return stored ? JSON.parse(stored) : [];
  });

  // Debounced version of the username used for search suggestions
  const [debouncedUsername] = useDebounce(username, 300);

  // Controls whether the suggestion dropdown should be visible
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Query to fetch a specific GitHub user
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["users", submittedUsername],
    queryFn: () => fetchGithubUser(submittedUsername),
    enabled: !!submittedUsername, // Only run query when a username is submitted
  });

  // Query to fetch GitHub user suggestions based on the search input
  const { data: suggestions } = useQuery({
    queryKey: ["github-user-suggestion", debouncedUsername],
    queryFn: () => searchGithubUser(debouncedUsername),
    enabled: debouncedUsername.length > 1, // Only fetch suggestions for meaningful input
  });

  // Handles the search form submission
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Remove whitespace from the input
    const trimmed = username.trim();

    // Do nothing if the input is empty
    if (!trimmed) return;

    // Set the username that will trigger the GitHub user query
    setSubmittedUsername(trimmed);

    // Clear the search input
    setUsername("");

    // Update the list of recent searches
    setRecentUsers((prev) => {
      // Add new search to the top and remove duplicates
      const updated = [trimmed, ...prev.filter((u) => u !== trimmed)];

      // Limit list to the 5 most recent searches
      return updated.slice(0, 5);
    });
  };

  // Persist recent searches in localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("recentUsers", JSON.stringify(recentUsers));
  }, [recentUsers]);

  return (
    <>
      {/* Search form */}
      <form onSubmit={handleSubmit} className='form'>
        <div className='dropdown-wrapper'>
          {/* GitHub username input */}
          <input
            type='text'
            placeholder='EnterGitHub Username...'
            value={username}
            onChange={(e) => {
              const value = e.target.value;

              // Update input value
              setUsername(value);

              // Show suggestions when the input has enough characters
              setShowSuggestions(value.trim().length > 1);
            }}
          />

          {/* Dropdown with GitHub user suggestions */}
          {showSuggestions && suggestions?.length > 0 && (
            <SuggestionDropdown
              suggestions={suggestions}
              show={showSuggestions}
              onSelect={(selected) => {
                // Populate the input with the selected username
                setUsername(selected);

                // Hide the suggestion dropdown
                setShowSuggestions(false);

                // Trigger a new user search
                if (submittedUsername !== selected) {
                  setSubmittedUsername(selected);
                } else {
                  // If the same username is selected again, manually refetch
                  refetch();
                }

                // Update recent searches
                setRecentUsers((prev) => {
                  const updated = [selected, ...prev.filter((u) => u !== selected)];
                  return updated.slice(0, 5);
                });
              }}
            />
          )}
        </div>

        {/* Submit button for the search */}
        <button type='submit'>Search</button>
      </form>

      {/* Loading state */}
      {isLoading && <p className='status'>Loading...</p>}

      {/* Error state */}
      {isError && <p className='status error'>{error.message}</p>}

      {/* Display the fetched GitHub user */}
      {data && <UserCard user={data} />}

      {/* Display list of recent searches */}
      {recentUsers.length > 0 && (
        <RecentSearches
          users={recentUsers}
          onSelect={(username) => {
            setUsername(username);
            setSubmittedUsername(username);
          }}
        />
      )}
    </>
  );
};

export default UserSearch;
