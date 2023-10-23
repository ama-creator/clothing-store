import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductQuery } from "../../features/api/apiSlice";
import { ROUTES } from "../../utils/routes";
import Product from "./Product";
import Products from "./Products";
import { useDispatch, useSelector } from "react-redux";
import { getRelatedProduct } from "../../features/products/productsSlice";

const SingleProduct = () => {
  const { id } = useParams();
  const { data, isLoading, isFetching, isSuccess } = useGetProductQuery({ id });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { related, list } = useSelector(({ products }) => products);

  React.useEffect(() => {
    if (!isLoading && !isFetching && !isSuccess) {
      navigate(ROUTES.HOME);
    }
  }, [navigate, isLoading, isFetching, isSuccess]);

  React.useEffect(() => {
    if (!data || !list.length) return;

    dispatch(getRelatedProduct(data.category.id));
  }, [data, dispatch, list.length]);

  return !data ? (
    <section className="preloader">Loading...</section>
  ) : (
    <>
      <Product {...data} />
      <Products
        products={related}
        amount={5}
        title="Related products"
      />
    </>
  );
};

export default SingleProduct;
