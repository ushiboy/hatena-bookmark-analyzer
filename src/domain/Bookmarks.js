/* @flow */

export type Bookmark = {
  id: number,
  title: string,
  link: string,
  description: string,
  creator: string,
  date: Date
};

export type Pagination = {
  total: number,
  items: Bookmark[]
};

export default class Bookmarks {

  _repository: BookmarksRepository

  total: number

  page: number

  items: Bookmark[]

  constructor(repository: BookmarksRepository) {
    this._repository = repository;
  }

  async paginate(page: number, perPage: number): Promise<void> {
    const pagination = await this._repository.paginate(page, perPage);
    this.page = page;
    this.total = pagination.total;
    this.items = pagination.items;
  }

}

export interface BookmarksRepository {

  paginate(page: number, perPage: number): Promise<Pagination>;

}
