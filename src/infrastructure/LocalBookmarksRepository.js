/* @flow */
import type { BookmarksRepository, Pagination } from '../domain/Bookmarks.js';
import db from './DB.js';

export default class LocalBookmarksRepository implements BookmarksRepository {

  async paginate(page: number, perPage: number): Promise<Pagination> {
    const [items, total] = await Promise.all([
      db.paginate(page, perPage),
      db.count()
    ]);

    return {
      total,
      items
    };
  }

}
