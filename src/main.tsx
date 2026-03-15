/**
 * Entry Point
 * -----------
 * Sets up the React application, wraps it with React Query provider,
 * and renders it into the root DOM element.
 */

// React core
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Global styles
import "./index.css";

// Main App component
import App from "./App.tsx";

// React Query for data fetching and caching
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Create a React Query client instance
const queryClient = new QueryClient();

// Render the application into the root DOM element
createRoot(document.getElementById("root")!).render(
  // Provide React Query client to the entire app
  <QueryClientProvider client={queryClient}>
    {/* StrictMode helps identify potential problems in the app */}
    <StrictMode>
      {/* Main application component */}
      <App />

      {/* React Query DevTools for debugging query state */}
      <ReactQueryDevtools initialIsOpen={false} position='bottom' />
    </StrictMode>
  </QueryClientProvider>,
);
