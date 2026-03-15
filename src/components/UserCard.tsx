/**
 * UserCard Component
 * Displays a GitHub user's avatar, name, bio, and profile link.
 */

// GitHub icon from react-icons
import { FaGithubAlt } from "react-icons/fa";

// Type defintion for the GitHub user object
import type { GitHubUser } from "../types";

// Displays a card with GitHub user information
const UserCard = ({ user }: { user: GitHubUser }) => {
  return (
    // Profile card container
    <div className='user-card'>
      {/* User avatar */}
      <img src={user.avatar_url} alt={user.name} className='avatar' />

      {/* Use name if available, otherwise fallback to username */}
      <h2>{user.name || user.login}</h2>

      {/* User biography */}
      <p className='bio'>{user.bio}</p>

      {/* External link to GitHub profile */}
      <a href={user.html_url} className='profile-btn' target='_blank' rel='noopener noreferrer'>
        <FaGithubAlt /> View GitHub Profile
      </a>
    </div>
  );
};

export default UserCard;
