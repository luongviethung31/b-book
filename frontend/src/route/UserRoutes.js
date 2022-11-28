import BookDetail from 'pages/BookDetail';
import CartDetail from 'pages/CartDetail';
import ListProductsPage from 'pages/ListProductsPage';
import RegisterPage from 'pages/RegisterPage';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import userLayout from '../HOCS/userLayout';
import HomePage from '../pages/HomePage'
import { ROUTE_BOOK_DETAIL, ROUTE_CART_PAGE, ROUTE_HOME, ROUTE_LIST_PRODUCTS, ROUTE_REGISTER} from './Types';

const UserRoutes = () => {
    return (
        <Routes>
            <Route
                path={ROUTE_HOME}
                exact
                element = {userLayout({
                    Component: HomePage
                })}
            />
            <Route
                path={ROUTE_REGISTER}
                exact
                element = {userLayout({
                    Component: RegisterPage
                })}
            />
            <Route
                path={ROUTE_LIST_PRODUCTS}
                exact
                element = {userLayout({
                    Component: ListProductsPage
                })}
            />
            <Route
                path={ROUTE_BOOK_DETAIL}
                exact
                element = {userLayout({
                    Component: BookDetail
                })}
            />
            <Route
                path={ROUTE_CART_PAGE}
                exact
                element = {userLayout({
                    Component: CartDetail
                })}
            />
        </Routes>
    );
};

export default UserRoutes;