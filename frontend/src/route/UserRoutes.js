import { getUser } from 'hooks/localAuth';
import BookDetail from 'pages/BookDetail';
import CartDetail from 'pages/CartDetail';
import ListProductsPage from 'pages/ListProductsPage';
import RegisterPage from 'pages/RegisterPage';
import GenrePage from 'pages/GenrePage';
import OrderPage from 'pages/OrderPage';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { setAccountInfo } from 'redux/reducers/auth/action';
import { setLoadingAI } from 'redux/reducers/product/action';
import userLayout from '../HOCS/userLayout';
import adminLayout from '../HOCS/adminLayout';
import HomePage from '../pages/HomePage'
import { ROUTE_BOOK_DETAIL, ROUTE_CART_PAGE, ROUTE_CONTROL_GENRE, ROUTE_HOME, ROUTE_LIST_PRODUCTS, ROUTE_REGISTER, ROUTE_PRODUCT_BOOK, ROUTE_USER_ORDER, ROUTE_ORDER_PAGE } from './Types';
import ProductBookPage from 'pages/ProductBook';
import UserOrder from 'pages/UserOrder';
import { getAllBookId } from 'redux/reducers/product/action';
import bookAPI from 'api/bookAPI';

const UserRoutes = () => {
    const dispatch = useDispatch()
    const { loading, listComment, ratingStatistics, listBookId, listBookReccomend } = useSelector(store => store.product)
    const { userInfo } = useSelector(store => store.auth)
    useEffect(() => {
        let account = getUser();
        if (account) dispatch(setAccountInfo(account, () => {
            //   if(account.role === 'admin') navigate('/')
        }))
        // else navigate('/')
    }, [])

    return (
        <Routes>
            <Route
                path={ROUTE_HOME}
                exact
                element={userLayout({
                    Component: HomePage
                })}
            />
            <Route
                path={ROUTE_REGISTER}
                exact
                element={userLayout({
                    Component: RegisterPage
                })}
            />
            <Route
                path={ROUTE_LIST_PRODUCTS}
                exact
                element={userLayout({
                    Component: ListProductsPage
                })}
            />
            <Route
                path={ROUTE_BOOK_DETAIL}
                exact
                element={userLayout({
                    Component: BookDetail
                })}
            />
            <Route
                path={ROUTE_CART_PAGE}
                exact
                element={userLayout({
                    Component: CartDetail
                })}
            />
            <Route
                path={ROUTE_USER_ORDER}
                exact
                element={userLayout({
                    Component: UserOrder
                })}
            />
            <Route
                path={ROUTE_CONTROL_GENRE}
                exact
                element={adminLayout({
                    Component: GenrePage
                })}
            />
            <Route
                path={ROUTE_PRODUCT_BOOK}
                exact
                element={adminLayout({
                    Component: ProductBookPage,
                    route: ROUTE_PRODUCT_BOOK
                })}
            />
            <Route
                path={ROUTE_ORDER_PAGE}
                exact
                element={adminLayout({
                    Component: OrderPage,
                    route: ROUTE_ORDER_PAGE
                })}
            />
        </Routes>
    );
};

export default UserRoutes;