import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Row,
  Col,
  Table,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listMyOrders } from "../actions/orderActions";
import { LinkContainer } from "react-router-bootstrap";

function ProfileScreen({ location, history }) {
  const [editProfile, setEditProfile] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success, error: errorProfileUpdate } = userUpdateProfile;

  const orderMyList = useSelector((state) => state.orderMyList);
  const { loding: loadingOrders, orders, error: errorOrders } = orderMyList;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [history, dispatch, userInfo, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) setMessage("Password do not match");
    else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name,
          email,
          currentPassword,
          password,
        })
      );
    }
  };
  const submitPasswordHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) setMessage("Password do not match");
    if (!password || !currentPassword || !confirmPassword)
      setMessage("Enter all feilds");
    else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name,
          email,
          currentPassword,
          password,
        })
      );
    }
  };

  return (
    <Row>
      <Col md={3}>
        <div className="d-flex justify-content-around align-items-center">
          <h2>User Profile </h2>
          <button
            onClick={() => setEditProfile(!editProfile)}
            className="btn btn-sm btn-outline-primary"
          >
            {editProfile ? "cancel" : "edit profile"}
          </button>
        </div>
        {error && <Message variant="danger">{error}</Message>}
        {message && <Message variant="danger">{message}</Message>}
        {success && <Message variant="success">Profile Updated</Message>}
        {loading && <Loader />}
        {editProfile ? (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        ) : (
          <>
            <ListGroup variant="flush">
              <ListGroupItem>Name: {name}</ListGroupItem>
              <ListGroupItem>Email: {email}</ListGroupItem>
            </ListGroup>
            <Button
              onClick={() => setEditPassword(!editPassword)}
              variant="outline-secondary"
              className="my-2"
            >
              {editPassword ? "Cancel" : "Update Password"}
            </Button>
            {editPassword && (
              <>
                {errorProfileUpdate && (
                  <Message variant="danger">{errorProfileUpdate}</Message>
                )}
                <Form onSubmit={submitPasswordHandler}>
                  <Form.Group controlId="currentpassword">
                    <Form.Label>Current Password</Form.Label>
                    <Form.Control
                      placeholder="Current password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="newpassword">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      placeholder="New password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm new Password</Form.Label>
                    <Form.Control
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Button type="submit" variant="primary">
                    Update
                  </Button>
                </Form>
              </>
            )}
          </>
        )}
      </Col>
      <Col md={9}>
        <h2>Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                // console.log(orders)
                orders &&
                  orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>{order.totalPrice}</td>
                      <td>
                        {order.isPaid ? (
                          order.paidAt.substring(0, 10)
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}
                          />
                        )}
                      </td>
                      <td>
                        {order.isDelivered ? (
                          order.deliveredAt.substring(0, 10)
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}
                          />
                        )}
                      </td>
                      <td>
                        <LinkContainer to={`/order/${order._id}`}>
                          <Button className="btn-sm" variant="light">
                            Details
                          </Button>
                        </LinkContainer>
                      </td>
                    </tr>
                  ))
              }
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
}

export default ProfileScreen;
