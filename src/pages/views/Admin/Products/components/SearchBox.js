import React from 'react';
import PropTypes from 'prop-types'
import { BsDownload, BsWrench, BsTrashFill } from "react-icons/bs";
import { Button, Spinner, Table, Badge } from 'reactstrap';

const SearchBox = props => {

  const { onResetSearch, onSubmitSearch, handleSearchInput } = props

  return (
    <form onSubmit={onSubmitSearch}>
      <div className="input-group">
        <input
          type="search"
          name="query"
          onChange={handleSearchInput}
          className="form-control"
          placeholder="search box..."
          required
        />
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" type="submit"><i className="fas fa-search fa-sm" /></button>
          <button className="btn btn-outline-info" type="button" onClick={onResetSearch}><i className="fas fa-recycle" /></button>
        </div>
      </div>
    </form>
  )
}


SearchBox.propTypes = {
  onResetSearch: PropTypes.func.isRequired,
  handleSearchInput: PropTypes.func.isRequired,
  onSubmitSearch: PropTypes.func.isRequired,
}

SearchBox.defaultProps = {
  onResetSearch: () => { },
  handleSearchInput: () => { },
  onSubmitSearch: () => { },
}

export default SearchBox
