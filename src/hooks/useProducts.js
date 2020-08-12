import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import actions from '../redux/actions';

const { getAllProduct } = actions;

const useProducts = (props) => {

  const dispatch = useDispatch();
  //const productReducer = useSelector(state => state.productReducer);

  return useEffect(() => {
    dispatch(getAllProduct());
  }, [])
}
export default useProducts;