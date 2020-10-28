import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import { Container } from "react-bootstrap";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import AdminDashboard from "./screens/AdminDashboard";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />

          {/* ADMIN Routes */}
          <Route path="/admin" exact component={AdminDashboard} />
          <Route path="/admin/:option" exact component={AdminDashboard} />
          {/* <Route path="/admin/order/:id" exact component={AdminDashboard} /> */}
          <Route
            path="/admin/:option/:pageNumber"
            exact
            component={AdminDashboard}
          />
          <Route
            path="/admin/:option/:id/edit"
            exact
            component={AdminDashboard}
          />
          {/* Home Screen Routes */}
          <Route path="/search/:keyword" exact component={HomeScreen} />
          <Route path="/page/:pageNumber" exact component={HomeScreen} />
          <Route
            path="/search/:keyword/page/:pageNumber"
            exact
            component={HomeScreen}
          />
          <Route path="/" exact component={HomeScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
