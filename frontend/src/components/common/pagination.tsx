'use client';

import ReactPaginate from 'react-paginate';
import '@/styles/pagination.css'; // tuỳ chỉnh CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons'; // <-- Add this import


type Props = {
  pageCount: number;
  onPageChange: (selected: number) => void;
  forcePage?: number;
};

export default function Pagination({ pageCount, onPageChange, forcePage }: Props) {
  return (
    <ReactPaginate
      pageCount={pageCount}
      pageRangeDisplayed={1}
      pageClassName	="page-item"
      marginPagesDisplayed={1}
      onPageChange={(event) => onPageChange(event.selected)}
      forcePage={forcePage}
      previousLabel={<FontAwesomeIcon icon={faAnglesLeft} />}
      nextLabel={<FontAwesomeIcon icon={faAnglesRight} />}
      containerClassName="pagination"
      activeClassName="active"
    />
  );
}