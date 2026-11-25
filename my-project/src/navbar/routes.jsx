import React from "react";
import Home from "../allcomponent/home/home";
import About from "../allcomponent/about/about";
import Watch from "../allcomponent/watch/watch";
import Contact from "../allcomponent/contact/contact";
import Register from "../dashboard/register";
import Login from "../dashboard/login";
import Footer from "../allcomponent/footer/footer";
import UserDetails from "../allcomponent/userdetails/userdetails";
import Product from "../allcomponent/product/product";
import Category from "../allcomponent/catagory/category";
import Dashboard from "../dashboard/dashboard";
import WatchDetails from "../allcomponent/watch/watchdetails";
import Shoopingcart from "../allcomponent/shoopingcart/shoopingcart";
import Orderbooking from "../allcomponent/orderbooking/orderbooking";
import AllOrders from "../allcomponent/allorders/allorder";








const ROUTES = {

    Home: {
        path: "/",
        element: <Home />,
    },
    About: {
        path: "/about",
        element: <About />,
    },
    Watch: {
        path: "/watch",
        element: <Watch />,
    },
    Contact: {
        path: "/contact",
        element: <Contact />,
    },
    WatchDetails: {
        path: "/watchdetails/:id",
        element: <WatchDetails />,
    },
    Shoopingcart: {
        path: "/shoopingcart",
        element: <Shoopingcart />,
    },
    Orderbooking: {
        path: "/orderbooking",
        element: <Orderbooking />,
    },
    Register: {
        path: "/register",
        element: <Register />,
    },
    Login: {
        path: "/login",
        element: <Login />,
    },
    Footer: {
        path: "/footer",
        element: <Footer />,
    },
    Product: {
        path: "/product",
        element: <Product />,
    },
    Category: {
        path: "/category",
        element: <Category />,
    },
    AllOrders: {
        path: "/all-orders",
        element: <AllOrders />,
    },
    UserDetails: {
        path: "/userdetails",
        element: <UserDetails />,
    },
    Dashboard: {
        path: "/dashboard",
        element: <Dashboard />,
    },
}

export default ROUTES;