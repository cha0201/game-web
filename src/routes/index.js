/**
 * Created by 叶子 on 2017/8/13.
 */
import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import AllComponents from '../components';
import routesConfig from './config';

export default class CRouter extends Component {
    requireAuth = (permission, component) => {
        const { auth } = this.props;
        const { permissions } = auth.data;
        // const { auth } = store.getState().httpData;
        return component;
    };
    requireLogin = (component, permission) => {
        const { auth } = this.props;
        const user= localStorage.getItem("user")

        if (!user) { // 线上环境判断是否登录
            return <Redirect to={'/login'} />;
        }
        // return permission ? this.requireAuth(permission, component) : component;

        return component;
    };
    render() {
        return (
            <Switch>
                {
                    Object.keys(routesConfig).map(key => 
                        routesConfig[key].map(r => {
                            const route = r => {
                                const Component = AllComponents[r.component];
                                return (
                                    <Route
                                        key={r.route || r.key}
                                        exact
                                        path={r.route || r.key}
                                        render={props => r.login ? 
                                            <Component {...props} />
                                            : this.requireLogin(<Component {...props} />, r.auth)}
                                    />
                                )
                            }
                            return r.component ? route(r) : r.subs.map(r => route(r));
                        })
                    )
                }

                <Route render={() => <Redirect to="/404" />} />
            </Switch>
        )
    }
}