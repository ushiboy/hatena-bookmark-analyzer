/* @flow */
import type { BookmarksRepository } from './domain/Bookmarks.js';
import type { ImportDataRepository } from './domain/ImportData.js';
import type { ReportRepository } from './domain/Report.js';

export default function Locator() {
  const instances = {};
  return {
    provideBookmarksRepository(repository: BookmarksRepository): void {
      instances['BookmarksRepository'] = repository;
    },
    getBookmarksRepository(): BookmarksRepository {
      if(!instances['BookmarksRepository']) {
        throw new Error('BookmarksRepository not found');
      }
      return instances['BookmarksRepository'];
    },
    provideImportDataRepository(repository: ImportDataRepository): void {
      instances['ImportDataRepository'] = repository;
    },
    getImportDataRepository(): ImportDataRepository {
      if(!instances['ImportDataRepository']) {
        throw new Error('ImportDataRepository not found');
      }
      return instances['ImportDataRepository'];
    },
    provideReportRepository(repository: ReportRepository): void {
      instances['ReportRepository'] = repository;
    },
    getReportRepository(): ReportRepository {
      if(!instances['ReportRepository']) {
        throw new Error('ReportRepository not found');
      }
      return instances['ReportRepository'];
    }
  };
};
