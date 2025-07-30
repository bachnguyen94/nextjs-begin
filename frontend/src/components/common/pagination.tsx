'use client';

import ReactPaginate from 'react-paginate';
import '@/styles/pagination.css'; // tuỳ chỉnh CSS

type Props = {
  pageCount: number;
  onPageChange: (selected: number) => void;
  forcePage?: number;
};

export default function Pagination({ pageCount, onPageChange, forcePage }: Props) {
  return (
    <ReactPaginate
      pageCount={pageCount}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      onPageChange={(event) => onPageChange(event.selected)}
      forcePage={forcePage}
      previousLabel="←"
      nextLabel="→"
      containerClassName="pagination"
      activeClassName="active"
    />
  );
}