/* @flow */
import db from './DB.js';
import type { ReportRepository } from '../domain/Report.js';
import type { Bookmark } from '../domain/Bookmarks.js';

export default class LocalReportRepository implements ReportRepository {

  getAll(): Promise<Bookmark[]> {
    return db.getAll();
  }
}
