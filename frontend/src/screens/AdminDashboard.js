import React, { useState, useEffect } from "react";
import { Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import { Route } from "react-router-dom";
import ProductListScreen from "./ProductListScreen";
import UsersListScreen from "./UserListScreen";
import OrderListScreen from "./OrderListScreen";
import UserEditScreen from "./UserEditScreen";
import ProductEditScreen from "./ProductEditScreen";
import OrderScreen from "./OrderScreen";

function AdminDashboard({ match, history }) {
  const [option, setOption] = useState("dashboard");
  useEffect(() => {
    if (match.params.option) setOption(match.params.option.toLowerCase());

    // /admin/:option/:pageNumber is same route as /admin/order/:id
    // setting pageNumber as id of the order
    if (match.params.option === "order") {
      match.params.id = match.params.pageNumber;
    }
  }, [match]);

  const changeOption = (o) => {
    setOption(o);
    history.push("/admin");
  };
  return (
    <>
      <Row>
        <Col md={2}>
          <ListGroup>
            <ListGroupItem
              action
              active={option === "dashboard"}
              onClick={() => changeOption("dashboard")}
            >
              Dashboard
            </ListGroupItem>
            <ListGroupItem
              action
              active={option.substr(0, 4) === "user"}
              onClick={() => changeOption("userlist")}
            >
              Users
            </ListGroupItem>
            <ListGroupItem
              action
              active={option.substr(0, 7) === "product"}
              onClick={() => changeOption("productlist")}
            >
              Products
            </ListGroupItem>
            <ListGroupItem
              action
              active={option.substr(0, 5) === "order"}
              onClick={() => changeOption("orderlist")}
            >
              Orders
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={10}>
          {/* List Options */}
          {option === "dashboard" && <h1>Dashboard</h1>}
          {option === "userlist" && <UsersListScreen />}
          {option === "productlist" && (
            <Route
              render={({ history, match }) => (
                <ProductListScreen history={history} match={match} />
              )}
            />
          )}
          {option === "orderlist" && <OrderListScreen />}

          {/* Edit Options */}
          {option === "user" && match.path.split("/")[4] === "edit" && (
            <Route
              render={({ history, match }) => (
                <UserEditScreen history={history} match={match} />
              )}
            />
          )}
          {option === "product" && match.path.split("/")[4] === "edit" && (
            <Route
              render={({ history, match }) => (
                <ProductEditScreen history={history} match={match} />
              )}
            />
          )}
          {option === "order" && !!match.params.pageNumber && (
            <Route
              render={({ history, match }) => (
                <OrderScreen history={history} match={match} />
              )}
            />
          )}
        </Col>
      </Row>
    </>
  );
}

export default AdminDashboard;
