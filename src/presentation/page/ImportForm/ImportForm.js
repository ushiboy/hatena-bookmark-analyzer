/* @flow */
import React from 'react';
import type { AppState, AppContext } from '../../../type.js';
import BookmarkUseCase from '../../../usecase/BookmarkUseCase.js';
import Bootstrap from 'bootstrap.native';

type Props = {
  state: AppState,
  context: AppContext
}

export default class ImportForm extends React.Component<Props> {

  _modal: any

  render() {
    const { total, current, logs } = this.props.state.import;
    const progress = Math.ceil((current/total) * 100);
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="alert alert-info" role="alert">
            <h4>インポート方法</h4>
            <p><a href="http://b.hatena.ne.jp/-/my/config/data_management" target="_blank">はてなブックマークの[設定] &gt; [データ管理] &gt; </a>[エクスポート]
              の[RSS1.0形式]でファイルをダウンロードします。</p>
            <p>ダウンロードしたファイルを指定してインポートを行います。</p>
          </div>
          <div className="form-group">
            <label>File</label>
            <input type="file" ref="importFile" />
          </div>
          <button type="submit" className="btn btn-default">インポート</button>
        </form>
        <div className="modal fade" tabIndex="-1" role="dialog" ref="modal">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">インポート状況</h4>
              </div>
              <div className="modal-body">
                <div className="progress">
                  <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width: `${progress}%` }} />
                </div>
                <textarea className="form-control" readOnly="readonly" rows="10" value={logs.join('\n')}></textarea>
              </div>
              <div className="modal-footer" style={{display: (progress === 100) ? '': 'none' }}>
                <button type="button" className="btn btn-default" data-dismiss="modal">閉じる</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this._modal = new Bootstrap.Modal(this.refs.modal, {
      backdrop: 'static',
      keyboard: false
    });
  }

  componentWillUnmount() {
    this._modal.hide();
    delete this._modal;
  }

  handleSubmit(e: any) {
    e.preventDefault();
    this._modal.show();
    const file = this.refs.importFile.files[0];
    this.props.context.usecase.execute(BookmarkUseCase.importXmlFile(file));
  }

}
