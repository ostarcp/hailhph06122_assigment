import React from 'react'
import PropTypes from 'prop-types'
import { BsDownload, BsWrench, BsTrashFill } from "react-icons/bs";
import { Button, Spinner, Table, Badge } from 'reactstrap';

const Product = props => {

  const { product, onEdit, onDelete, getCategoryName } = props;
  const { id, name, image, price, quanity,status } = product;

  function currencyFormat(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' vnđ'
  }

  return (
    <tr key={id}>
      <td>{id + 0}</td>
      <td>{name}</td>
      { getCategoryName(product)}
      <td><img width="80px" src={image} alt="oops...." /></td>
      <td>{currencyFormat(price)}</td>
      <td>{quanity}</td>
      <td>{status}</td>
      <td>
        <Button color="success" onClick={() => onEdit(product)}><BsWrench /></Button>{' '}
        <Button color="danger" onClick={() => onDelete(product)}><BsTrashFill /></Button>
      </td>
    </tr>
  )
}

Product.propTypes = {
  product: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

Product.defaultProps = {
  product: {},
  onEdit: () => { },
  onDelete: () => { },
  getCategoryName: () => { }
}

export default Product
