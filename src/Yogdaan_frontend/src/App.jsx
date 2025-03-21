// src/App.jsx
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './routes.jsx';

// Import global styles if needed


function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;