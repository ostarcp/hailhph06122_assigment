import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import actions from '../redux/actions';

const { getAllCategory } = actions;

const useCategory = (props) => {

  const dispatch = useDispatch();
  return useEffect(() => {
    dispatch(getAllCategory());
  }, [])

}
export default useCategory;
