/* @flow */
import db from './DB.js';
import type { ImportDataRepository, RawImportData } from '../domain/ImportData.js';

export type RawBookmark = {
  title: string,
  link: string,
  description: string,
  creator: string,
  date: Date
};

export default class LocalImportDataRepository implements ImportDataRepository {

  _onProgress: (s: RawImportData) => void

  import(file: File): Promise<RawImportData> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => {
        const status = {
          total: 0,
          current: 0,
          logs: []
        };

        const tasks = this.parseXml(e.target.result).map((b, i) => {
          return db.add(b).then(b => {
            status.current = i + 1;
            this._onProgress(status);
            return b;
          }).catch(e => {
            console.log(e.target.error);
            status.current = i + 1;
            status.logs.push('[重複検出]\n' + b.link +'\n(登録スキップされました)');
            this._onProgress(status);
          });
        });

        status.total = tasks.length;

        Promise.all(tasks).then(b => {
          resolve(status);
        }).catch(e => {
          console.log(e);
        });

      };
      reader.readAsText(file);
    });
  }

  onProgress(fn: (s: RawImportData) => void): void {
    this._onProgress = fn;
  }

  parseXml(xml: string): RawBookmark[] {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, 'application/xml');
    return Array.from(doc.getElementsByTagName('item')).map(i => ({
      title: i.getElementsByTagName('title')[0].textContent,
      link: i.getElementsByTagName('link')[0].textContent,
      description:  i.getElementsByTagName('description')[0].textContent,
      creator:  i.getElementsByTagName('dc:creator')[0].textContent,
      date:  new Date(Date.parse(i.getElementsByTagName('dc:date')[0].textContent))
    }));
  }

}
