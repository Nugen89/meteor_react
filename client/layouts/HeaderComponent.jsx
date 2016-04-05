import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import AccountsUI from '../AccountsUI.jsx';

export default class HeaderComponent extends Component {

  render() {
    return (
    <div>
      <div className="ui large top main menu header">
        <div className="ui container">
          <a className="active item" href="/">Speakr</a>
          <a className="item" href="/about">About</a>
          <a className="item" href="/videoChat">Chat</a>
          <div className="right menu">
            <div className="item">
              <AccountsUI />
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }

}