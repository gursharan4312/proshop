import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import Message from "./Message";
import { listTopProducts } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";

const ProductCarosel = () => {
  const disptach = useDispatch();

  const productTopRatedList = useSelector((state) => state.productTopRatedList);
  const { products, loading, error } = productTopRatedList;

  useEffect(() => {
    disptach(listTopProducts());
  }, [disptach]);

  return loading ? (
    <Carousel className="bg-dark">
      <Carousel.Item>
        <Skeleton className="mx-auto" circle={true} height={300} width={300} />
      </Carousel.Item>
    </Carousel>
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
          </Link>
          <Carousel.Caption className="carousel-caption">
            <h2>
              {product.name} (${product.price})
            </h2>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarosel;
