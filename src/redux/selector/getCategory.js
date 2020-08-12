import { useSelector } from 'react-redux';

export default () => {
  const cateList = useSelector(state => state.categoryReducer.cateList);
  return cateList;
};