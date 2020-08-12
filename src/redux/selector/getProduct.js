import { useSelector } from 'react-redux';

export default () => {
  const productsList = useSelector(state => state.productReducer.productsList);
  return productsList;
};