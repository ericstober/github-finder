/**
 * SuggestionDropdown Component
 * Displays a dropdown list of GitHub user suggestions while searching.
 */

// Types
import type { GitHubUser } from "../types";

// Props for the SuggestionDropdown component
type SuggestionDropdownProps = {
  suggestions: GitHubUser[]; // List of GitHub users returned from the search
  show: boolean; // Controls whether the dropdown should be visible
  onSelect: (username: string) => void; // Callback when a username is selected
};

// Displays a dropdown list of selectable GitHub usernames
const SuggestionDropdown = ({ suggestions, show, onSelect }: SuggestionDropdownProps) => {
  // Do not render the dropdown if it should be hidden or if there are no suggestions
  if (!show || suggestions.length === 0) return null;

  return (
    // Container for the suggestion list
    <ul className='suggestions'>
      {/* Display up to 5 suggested GitHub users */}
      {suggestions.slice(0, 5).map((user: GitHubUser) => (
        // Each list item represents a selectable GitHub user
        <li key={user.login} onClick={() => onSelect(user.login)}>
          {/* Small avatar for the suggested user */}
          <img src={user.avatar_url} alt={user.login} className='avatar-xs' />

          {/* GitHub username */}
          {user.login}
        </li>
      ))}
    </ul>
  );
};

export default SuggestionDropdown;
