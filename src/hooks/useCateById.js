import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import actions from '../redux/actions';

const { getCateDetail } = actions;

const useCateById = (id) => {
  const dispatch = useDispatch();
  return useEffect(() => {
    dispatch(getCateDetail({id}));
  }, [])
}
export default useCateById;