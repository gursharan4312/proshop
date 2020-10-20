import React from "react";
import {
  Row,
  Col,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
} from "react-bootstrap";
import Skeleton from "react-loading-skeleton";

function ProductDetailsSkleton() {
  return (
    <>
      <Row>
        <Col md={6}>
          <Skeleton height={540} width={"100%"} />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h2>
                <Skeleton />
              </h2>
            </ListGroupItem>
            <ListGroupItem>
              <Skeleton />
            </ListGroupItem>
            <ListGroupItem>
              <Skeleton />
            </ListGroupItem>
            <ListGroupItem>
              <Skeleton height={100} />
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <Row>
                  <Col>Price</Col>
                  <Col>
                    <Skeleton />
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Status</Col>
                  <Col>
                    <Skeleton />
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>QTY</Col>
                  <Col>
                    <Skeleton />
                  </Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Button className="btn-block">
                  <Skeleton />
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <h2>Reviews</h2>
          <ListGroup variant="flush">
            <ListGroupItem>
              <strong>
                <Skeleton />
              </strong>
              <Skeleton />
              <p>
                <Skeleton />
              </p>
              <p>
                <Skeleton />
              </p>
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
}

export default ProductDetailsSkleton;
