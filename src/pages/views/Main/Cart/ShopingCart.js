import React from 'react';
import { BsArrowDown, BsArrowUp, BsTrashFill } from "react-icons/bs";
import { useDispatch } from 'react-redux';
import { Badge, Button, Col, Row, Table } from 'reactstrap';
import actions from 'redux/actions';
import getCart from 'redux/selector/getCart';
import { Link } from 'react-router-dom';

const { deleteTocart, deleteAllCart, upTocart, downTocart } = actions;

const ShopingCart = props => {
  const carts = getCart();
  const dispatch = useDispatch();

  const deleteItemCart = (values) => {
    dispatch(deleteTocart({ values }))
  }

  const upCart = (values) => {
    dispatch(upTocart({ values }))
  }

  const downCart = (values) => {
    dispatch(downTocart({ values }))
  }


  const clearCart = () => {
    dispatch(deleteAllCart());
  }


  const getTotalPrice = () => {
    let totalPrice = 0;
    carts.forEach(element => {
      totalPrice += element.price * element.count;
    });
    return totalPrice
  }

  function currencyFormat(num) {
    return num && num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' vnđ'
  }


  return (
    <div className="mt-5">
      <h1 className="text-center mb-4">Shopping Cart</h1>

      <Table borderless>
        <thead>
          <tr>
            <th>#</th>
            <th>Products</th>
            <th>Quanity</th>
            <th>Price</th>
            <th>Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {carts && carts.map((x, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{x.name}</td>
              <td>
                <Badge style={{ cursor: 'pointer', padding: '6px' }} color="primary" pill onClick={() => upCart(x)}><BsArrowUp /></Badge>
                <span style={{ margin: '0 10px' }} >{x.count}</span>
                <Badge style={{ cursor: 'pointer', padding: '6px' }} color="primary" pill onClick={() => downCart(x)}><BsArrowDown /></Badge>
              </td>
              <td>{currencyFormat(x.price)}</td>
              <td>{currencyFormat(x.price * x.count)}</td>
              <td><Button color="danger" onClick={() => deleteItemCart(x)}><BsTrashFill /></Button></td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Row>
        <Col md="6">
          <Link to="/shop"><Button color="info" type="submit">Continues shopping</Button></Link>   {' '}
          <Button color="danger" onClick={clearCart}>Clear Cart</Button>
        </Col>
        <Col md="6">
          <h3><Badge color="secondary">Tổng tiền:  {currencyFormat(getTotalPrice())}</Badge></h3>
        </Col>
      </Row>



      {/* {currencyFormat(getTotalPrice())} */}
    </div>
  )
}


export default ShopingCart
