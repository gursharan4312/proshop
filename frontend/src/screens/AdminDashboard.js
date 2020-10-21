import React, { useState } from "react";
import { Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import { Route } from "react-router-dom";
import ProductListScreen from "./ProductListScreen";
import UsersListScreen from "./UserListScreen";
import OrderListScreen from "./OrderListScreen";

function AdminDashboard() {
  const [option, setOption] = useState("dashboard");
  return (
    <>
      <Row>
        <Col md={2}>
          <ListGroup variant="flush">
            <ListGroupItem onClick={() => setOption("dashboard")}>
              Dashboard
            </ListGroupItem>
            <ListGroupItem onClick={() => setOption("users")}>
              Users
            </ListGroupItem>
            <ListGroupItem onClick={() => setOption("products")}>
              Products
            </ListGroupItem>
            <ListGroupItem onClick={() => setOption("orders")}>
              Orders
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={10}>
          {option === "dashboard" && <h1>Dashboard</h1>}
          {option === "users" && <UsersListScreen />}
          {option === "products" && (
            <Route
              render={({ history, match }) => (
                <ProductListScreen history={history} match={match} />
              )}
            />
          )}
          {option === "orders" && <OrderListScreen />}
        </Col>
      </Row>
    </>
  );
}

export default AdminDashboard;
