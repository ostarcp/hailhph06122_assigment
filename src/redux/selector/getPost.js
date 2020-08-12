import { useSelector } from 'react-redux';

export default () => {
  const postList = useSelector(state => state.postReducer.postList);
  return postList;
};