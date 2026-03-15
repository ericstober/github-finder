/**
 * App Component
 * -------------
 * Root component of the GitHub Finder application.
 * Renders the main layout and the UserSearch component.
 */

// Components
import UserSearch from "./components/UserSearch";

// Main application component
const App = () => {
  return (
    // Main application container
    <div className='container'>
      {/* Application title */}
      <h1>GitHub Finder</h1>

      {/* GitHub user search interface */}
      <UserSearch />
    </div>
  );
};

export default App;
