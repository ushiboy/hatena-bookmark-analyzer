/* @flow */
import React from 'react';
import { Link } from 'tridoron';

export default class NavBar extends React.Component<*> {

  render() {
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link className="navbar-brand" href="/">Hatena Bookmark Analyzer</Link>
          </div>
        </div>
      </nav>
    );
  }

}
