import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Banner from '../../../../components/Main/Banner/Banner';
import Menu from '../../../../components/Main/Menu/Menu';
import Amazing from '../../../../components/Main/Amazing/Amazing';

const Home = (props) => {
  const dispatch = useDispatch();
  return (
    <div>
        <Banner />
        <Menu />
        <Amazing />
    </div>
  )
}
export default Home;