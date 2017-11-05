/* @flow */
import type { Bookmark } from './Bookmarks.js';
import url from 'url';

export type ReportData = {
  category: string,
  count: number
}

export default class Report {

  _repository: ReportRepository

  data: Array<ReportData>

  constructor(repository: ReportRepository) {
    this._repository = repository;
    this.data = [];
  }

  async countTheNumberOfRegistrationsPerDomain(order: number = 5): Promise<void> {
    const bookmarks = await this._repository.getAll();
    const map = bookmarks.reduce((map, b) => {
      const { host } = url.parse(b.link);
      if (host) {
        const count = map.get(host) || 0;
        map.set(host, count + 1);
      }
      return map;
    }, new Map());
    const ranks = Array.from(map).sort((a, b) => -(a[1] - b[1]));
    this.data = ranks.slice(0, order).map(r => ({
      category: r[0],
      count: r[1]
    }));
    this.data.push({
      category: 'その他',
      count: ranks.slice(order).reduce((c, r) => {
        c += r[1];
        return c;
      }, 0)
    });
  }

}

export interface ReportRepository {

  getAll(): Promise<Bookmark[]>;

}
