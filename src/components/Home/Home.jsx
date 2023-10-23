import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { filterByPrice } from "../../features/products/productsSlice";

import Poster from "../Poster/Poster";
import Products from "../Products/Products";
import Categories from "../Categories/Categories";
import Banner from "../Banner/Banner";

const Home = () => {
  const {
    products: { list, filtered },
    categories,
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!list.length) return;

    dispatch(filterByPrice(100));
  }, [dispatch, list.length]);
  return (
    <>
      <Poster />
      <Products
        products={list}
        amount={5}
        title="Trending"
      />
      <Categories
        products={categories.list}
        amount={5}
        title="Worth seeing"
      />
      <Banner />
      <Products
        products={filtered}
        amount={5}
        title="Less then 100$"
      />
    </>
  );
};

export default Home;
