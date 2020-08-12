import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const Paginate = ({ itemsPerPage, totalItem, paginate }) => {

  const pageNumbs = [];

  for (let i = 1; i <= Math.ceil(totalItem / itemsPerPage); i++) {
    pageNumbs.push(i);
  }

  return (
    <Pagination aria-label="Page navigation example">
      {pageNumbs.map(number => (
        <PaginationItem key={number}>
          <PaginationLink onClick={()=> paginate(number)} >
            {number}
          </PaginationLink>
        </PaginationItem>
      ))}

    </Pagination>
  )
}

Paginate.defaultProps = {
  itemsPerPage: 4,
  totalItem: 10,
  paginate: () => {}
}

export default Paginate
