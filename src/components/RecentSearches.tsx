/**
 * RecentSearches Component
 * Displays a list of recently searched GitHub usernames.
 * Hovering over a username prefetches the user's data,
 * and clicking a username triggers a search.
 */

// External libraries
import { FaClock, FaUser } from "react-icons/fa";
import { useQueryClient } from "@tanstack/react-query";

// API
import { fetchGithubUser } from "../api/github";

// Props for the RecentSearches component
type RecentSearchesProps = {
  users: string[]; // List of previously searched GitHub usernames
  onSelect: (username: string) => void; // Callback when a username is selected
};

// Displays a list of recently searched GitHub usernames
const RecentSearches = ({ users, onSelect }: RecentSearchesProps) => {
  // React Query client used for caching and prefetching data
  const queryClient = useQueryClient();

  return (
    // Container for recent searches
    <div className='recent-searches'>
      {/* Header showing the section title */}
      <div className='recent-header'>
        <FaClock />
        <h3>Recent Searches</h3>
      </div>

      {/* List of previously searched usernames */}
      <ul>
        {users.map((user) => (
          <li key={user}>
            {/* Button allows selecting a previous search */}
            <button
              onClick={() => onSelect(user)}
              onMouseEnter={() => {
                // Prefetch the user's data on hover so results load faster when clicked
                queryClient.prefetchQuery({
                  queryKey: ["users", user],
                  queryFn: () => fetchGithubUser(user),
                });
              }}
            >
              {/* Icon representing a GitHub user */}
              <FaUser className='user-icon' />

              {/* GitHub username */}
              {user}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentSearches;
