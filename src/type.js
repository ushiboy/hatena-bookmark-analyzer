/* @flow */
import type { Store } from '@ushiboy/observable-store';
import type { Bookmark, BookmarksRepository } from './domain/Bookmarks.js';
import type { ReportData, ReportRepository } from './domain/Report.js';
import type { ImportDataRepository } from './domain/ImportData.js';

export type AppState = {
  bookmarks: {
    pageItems: Bookmark[],
    page: number,
    perPage: number,
    total: number
  },
  import: {
    total: number,
    current: number,
    logs: string[]
  },
  report: {
    ranks: ReportData[]
  },
  href: string
};

export type AppStore = Store<AppState>;

export type UseCase = (store: AppStore, locator: Locator) => void;

export type AppContext = {
  usecase: {
    execute(usecase: UseCase): void;
  }
};

export type Locator = {
  getBookmarksRepository: () => BookmarksRepository,
  getReportRepository: () => ReportRepository,
  getImportDataRepository: () => ImportDataRepository
};
