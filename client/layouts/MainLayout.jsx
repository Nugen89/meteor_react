import React from 'react';
import AccountsUI from '../AccountsUI.jsx';
// import styles from '../../node_modules/material-design-lite/material.min.css';

export const MainLayout = ({content}) => (
  <div className="main-layout">
    <header>
      <h2>My Resolutions</h2>
      <nav>
        <a href="/">Resolutions</a>
        <a href="/about">About</a>
        <AccountsUI />
      </nav>
    </header>
    <main>
      {content}
    </main>

    <script src="../../node_modules/material-design-lite/material.min.js"></script>
    <link type="text/css" rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
  </div>
)