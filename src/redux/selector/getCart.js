import { useSelector } from 'react-redux';

export default () => {
  const shoppingCart = useSelector(state => state.cartReducer.shoppingCart);
  return shoppingCart;
};