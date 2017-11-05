/* @flow */
import React from 'react';
import type { AppState, AppContext } from '../../../type.js';
import { Link } from 'tridoron';

type Props = {
  state: AppState,
  context: AppContext
}

export default class BookmarkList extends React.Component<Props> {

  render() {
    const { bookmarks } = this.props.state;
    const { pageItems, total, page, perPage } = bookmarks;

    const rows = pageItems.map(i => {
      return <tr key={i.id}><td><a target="_blank" href={i.link} dangerouslySetInnerHTML={{__html: i.title }}></a></td></tr>
    });

    return (
      <div className="bookmark-list">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
        <Pagination total={total} page={page} perPage={perPage} />
        <p>{total}件 Page. {page}</p>
      </div>
    );
  }

}

type Paginate = {
  total: number,
  page: number,
  perPage: number
};

export function Pagination(props: Paginate) {
  const { total, page, perPage } = props;
  const totalPages = Math.ceil(total / perPage);
  const pages = [];
  for (let i = 5; i > 0; i--) {
    if (page - i > 0) {
      pages.push(page - i);
    }
  }
  const len = pages.length;
  for (let i = 0; i < 10 - len; i++) {
    if (page + i > totalPages) break;
    pages.push(page + i);
  }
  const links = pages.map((num, index) => {
    return (
      <li className={num === page ? 'active': ''} key={index}>
        <Link href={`/bookmarks?page=${num}`}>{num}</Link>
      </li>
    );
  });

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        <li>
          <Link href={`/bookmarks?page=1`} aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </Link>
        </li>
        {links}
        <li>
          <Link href={`/bookmarks?page=${totalPages}`} aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
