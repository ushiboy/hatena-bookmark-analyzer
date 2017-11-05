/* @flow */

export type RawImportData = {
  total: number,
  current: number,
  logs: string[]
}

export default class ImportData {

  _repository: ImportDataRepository

  total: number

  current: number

  logs: string[]

  constructor(repository: ImportDataRepository) {
    this._repository = repository;
  }

  onProgress(fn: (s: RawImportData) => void): void {
    this._repository.onProgress(fn);
  }

  async import(file: File): Promise<void> {
    const { total, current, logs } = await this._repository.import(file);
    this.total = total;
    this.current = current;
    this.logs = logs;
  }

}

export interface ImportDataRepository {

  import(file: File): Promise<RawImportData>,

  onProgress(fn: (s: RawImportData) => void): void

}
