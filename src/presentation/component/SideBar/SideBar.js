/* @flow */
import React from 'react';
import { Link } from 'tridoron';
import type { AppState, AppContext } from '../../../type.js';

type Props = {
  state: AppState,
  context: AppContext
};

export default class SideBar extends React.Component<Props> {

  render() {
    const { href } = this.props.state;
    let bookmarksActive = false;
    let importActive = false;
    let reportActive = false;
    if (href.match(/^\/bookmarks/)) {
      bookmarksActive = true;
    } else if (href.match(/^\/import/)) {
      importActive = true;
    } else if (href.match(/^\/report/)) {
      reportActive = true;
    }
    return (
      <ul className="nav nav-sidebar">
        <li className={bookmarksActive ? 'active': ''}><Link href="/bookmarks">Bookmarks</Link></li>
        <li className={reportActive ? 'active': ''}><Link href="/report">Report</Link></li>
        <li className={importActive ? 'active': ''}><Link href="/import">Import</Link></li>
      </ul>
    );
  }

}
