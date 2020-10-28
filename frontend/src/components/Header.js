import React, { useState } from "react";
import { Route } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/userActions";
import SearchBox from "./SearchBox";
import { CSSTransition } from "react-transition-group";
import "./css/header.scss";

const Header = ({ history }) => {
  const [showSearchBtn, setShowSearchBtn] = useState(true);
  const [openSearch, setOpenSearch] = useState(false);
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/");
  };
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>ProShop</Navbar.Brand>
          </LinkContainer>
          <Nav.Link className="d-flex align-items-center py-0 flex-grow-1">
            {showSearchBtn && (
              <i
                className="fas fa-search"
                onClick={() => setOpenSearch(true)}
              />
            )}
            <CSSTransition
              in={openSearch}
              timeout={300}
              classNames="search-container"
              unmountOnExit
              onEnter={() => setShowSearchBtn(false)}
              onExited={() => setShowSearchBtn(true)}
            >
              <>
                <Route
                  render={({ history }) => <SearchBox history={history} />}
                />
                <Button
                  variant="outline-danger"
                  className="ml-2"
                  onClick={() => setOpenSearch(false)}
                >
                  Cancel
                </Button>
              </>
            </CSSTransition>
          </Nav.Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="flex-grow-0">
            <Nav className="ml-auto">
              <LinkContainer to="/cart" className="cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart" /> Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <i className="fas fa-user" /> Login
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link>
                      <i className="fas fa-sign-in" /> Sign up
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin">
                    <NavDropdown.Item>Dashboard</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
