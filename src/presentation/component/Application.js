/* @flow */
import React from 'react';
import { Router } from 'tridoron';
import type { AppStore, AppState, AppContext } from '../../type.js';
import NavBar from '../component/NavBar/NavBar.js';
import SideBar from '../component/SideBar/SideBar.js';

type Props = {
  router: Router,
  store: AppStore,
  context: AppContext
};

export default class Application extends React.Component<Props, AppState> {

  constructor(props: Props) {
    super();
    const { store } = props;
    this.state = store.state;
    store.observe(state => {
      this.setState(state);
    });
  }

  render() {
    const { context, router } = this.props;

    return (
      <div className="application">
        <router.provider>
          <NavBar state={this.state} context={context} />
        </router.provider>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-3 col-md-2 sidebar">
              <router.provider>
                <SideBar state={this.state} context={context} />
              </router.provider>
            </div>
            <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
              <router.content state={this.state} context={context} />
            </div>
          </div>
        </div>
      </div>
    );
  }

}
