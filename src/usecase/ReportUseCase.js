/* @flow */
import type { AppStore, UseCase, Locator } from '../type.js';
import Report from '../domain/Report.js';

const ReportUseCase = {

  loadRankData(): UseCase {

    return (store: AppStore, locator: Locator) => {
      const report = new Report(locator.getReportRepository());
      report.countTheNumberOfRegistrationsPerDomain().then(() => {
        store.assign({
          report: {
            ranks: report.data
          }
        });
      });
    };

  }

};

export default ReportUseCase;
