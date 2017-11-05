/* @flow */
import React from 'react';
import type { AppState, AppContext } from '../../../type.js';

type Props = {
  state: AppState,
  context: AppContext
}

export default class Home extends React.Component<Props> {

  render() {
    return (
      <div className="home">
        <h4 className="app-outline-title">非公式はてなブックマークアナライザ</h4>
        <p>エクスポートXMLからブックマークデータを読み込み、一覧表示します。</p>
        <p>ブックマークしたページの多いWebサイト順にグラフ表示します。</p>
      </div>
    );
  }

}
