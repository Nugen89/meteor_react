import React from 'react';
import HeaderComponent from './HeaderComponent.jsx';
import FooterComponent from './FooterComponent.jsx';
import AccountsUI from '../AccountsUI.jsx';

export const MainLayout = ({content}) => (
  <div className="wrapper">
    <HeaderComponent />
    <main className="ui container">
      {content}
    </main>
    <FooterComponent />
  </div>
)