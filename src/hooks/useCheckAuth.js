import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../redux/actions';

const { getAuth } = actions;
export default () => {
  const authReducer = useSelector(state => state.authReducer);
  const dispatch = useDispatch();
  return useEffect(() => {
    if (!authReducer.isLogin) {
      dispatch(getAuth());
    }
  }, [dispatch, authReducer.isLogin]);
};