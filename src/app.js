/* @flow */
import 'babel-polyfill';
import createObservableStore from '@ushiboy/observable-store';
import React from 'react';
import { render }  from 'react-dom';
import Application from './presentation/component/Application.js';
import { Router, Hash, route } from 'tridoron';
import Context from './Context.js';
import Home from './presentation/page/Home/Home.js';
import BookmarkList from './presentation/page/BookmarkList/BookmarkList.js';
import ImportForm from './presentation/page/ImportForm/ImportForm.js';
import ReportChart from './presentation/page/ReportChart/ReportChart.js';
import Locator from './Locator.js';
import BookmarkUseCase from './usecase/BookmarkUseCase.js';
import ReportUseCase from './usecase/ReportUseCase.js';
import LocalBookmarksRepository from './infrastructure/LocalBookmarksRepository.js';
import LocalReportRepository from './infrastructure/LocalReportRepository.js';
import LocalImportDataRepository from './infrastructure/LocalImportDataRepository.js';

const store = createObservableStore({
  bookmarks: {
    pageItems:[],
    perPage: 15,
    total: 0,
    page: 1
  },
  import: {
    total: 0,
    current: 0,
    logs: []
  },
  report: {
    ranks: []
  },
  href: location.hash && location.hash.slice(1) || '/'
});

const locator = Locator();
locator.provideBookmarksRepository(new LocalBookmarksRepository());
locator.provideImportDataRepository(new LocalImportDataRepository());
locator.provideReportRepository(new LocalReportRepository());
const context = Context(store, locator);

const routes = [
  route('/', Home),
  route('/import', ImportForm),
  route('/bookmarks', BookmarkList, (query, env) => {
    context.usecase.execute(BookmarkUseCase.loadPage(Number(query.page || '1')));
  }),
  route('/report', ReportChart, () => {
    context.usecase.execute(ReportUseCase.loadRankData());
  }),
];

const router = new Router(Hash, routes);
router.start();
router.listen(href => {
  store.assign({
    href
  });
});

const appEl = document.querySelector('#app');

if (appEl) {
  render(
    <Application store={store} context={context} router={router} />,
    appEl
  );
}
