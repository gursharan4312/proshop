import React, { useEffect } from "react";
import { Card, Carousel, Col, Row } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
      {error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {!loading > 0
              ? products.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))
              : Array.from(Array(8).keys()).map((key) => (
                  <Col sm={12} md={6} lg={4} xl={3} key={key}>
                    <Card className="my-3 p-3 rounded">
                      <Skeleton height={180} />
                      <Card.Body>
                        <h1>
                          <Skeleton />
                        </h1>
                        <p>
                          <Skeleton />
                        </p>
                        <p>
                          <Skeleton />
                        </p>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
