import React, { useEffect } from 'react'
import actions from 'redux/actions';
import { useDispatch } from 'react-redux';

export default () => {
  const { getAllPost } = actions;
  const dispatch = useDispatch();
  return useEffect(() => {
      dispatch(getAllPost());
  }, []);
}

