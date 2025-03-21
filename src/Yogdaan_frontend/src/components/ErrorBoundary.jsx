// src/components/ErrorBoundary.jsx
import React from 'react';
import { useRouteError, Link } from 'react-router-dom';

export default function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-violet-900/20 to-slate-900 text-white flex items-center justify-center">
      <div className="max-w-md w-full px-6 py-12 bg-slate-800/80 backdrop-blur-md rounded-2xl border border-purple-500/30 text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
          {error.status === 404 ? "Page Not Found" : "Unexpected Error"}
        </h1>
        
        <div className="mb-6">
          {error.status === 404 ? (
            <p className="text-gray-300">
              Sorry, the page you're looking for doesn't exist or has been moved.
            </p>
          ) : (
            <p className="text-gray-300">
              An unexpected error has occurred. Our team has been notified.
            </p>
          )}
          
          <div className="mt-4 p-4 bg-slate-700/50 rounded-lg border border-red-500/20 text-left">
            <p className="text-red-400 font-mono text-sm">
              {error.statusText || error.message || "Unknown error"}
            </p>
          </div>
        </div>
        
        <div className="flex flex-col gap-3">
          <Link 
            to="/" 
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3 rounded-xl font-medium transition-all duration-300"
          >
            Return to Home
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="border border-purple-500/50 text-purple-400 hover:bg-purple-500/10 py-3 rounded-xl font-medium transition-all duration-300"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}