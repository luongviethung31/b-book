import React from 'react';
import { Route, Routes } from 'react-router-dom';
import userLayout from '../HOCS/userLayout';
import HomePage from '../pages/HomePage'
import { ROUTE_HOME} from './Types';

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
        </Routes>
    );
};

export default UserRoutes;