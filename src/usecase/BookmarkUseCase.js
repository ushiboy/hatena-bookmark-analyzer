/* @flow */
import type { AppStore, UseCase, Locator } from '../type.js';
import Bookmarks from '../domain/Bookmarks.js';
import ImportData from '../domain/ImportData.js';

const BookmarkUseCase = {

  loadPage(page: number): UseCase {
    return (store: AppStore, locator: Locator) => {
      const { perPage } = store.state.bookmarks;
      const bookmarks = new Bookmarks(locator.getBookmarksRepository());
      bookmarks.paginate(page, perPage).then(() => {
        store.assign({
          bookmarks: {
            pageItems: bookmarks.items,
            total: bookmarks.total,
            page: bookmarks.page,
            perPage
          }
        });
      });
    };
  },

  importXmlFile(file: File): UseCase {
    return (store: AppStore, locator: Locator) => {
      const importData = new ImportData(locator.getImportDataRepository());
      importData.onProgress(s => {
        store.assign({
          import: {
            total: s.total,
            current: s.current,
            logs: s.logs
          }
        });
      });

      importData.import(file).then(() => {
        store.assign({
          import: {
            total: importData.total,
            current: importData.current,
            logs: importData.logs
          }
        });
      });
    };
  }

};

export default BookmarkUseCase;
