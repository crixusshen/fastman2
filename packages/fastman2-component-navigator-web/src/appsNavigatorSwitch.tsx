/*
 * @Author: shenzhiwei
 * @Date: 2018-07-10 15:23:56
 * @LastEditors: shenzhiwei
 * @LastEditTime: 2018-07-11 08:15:51
 * @Description: AppNavigatorSwitch使用React-Router-Dom来实现，该类主要用于暴露出React-navigation相同的API
 */
import React, {Component,} from "react"
import {Route, Switch, withRouter,} from "react-router-dom"
// import {View, Text} from "react-native"
import {CSSTransition, TransitionGroup} from "react-transition-group";

import "./screenTransition.css"

class AppsNavigatorSwitch extends Component<{
    location: any,
    history: any,
    routes: any,
}, {}> {
    _navigate(history: any, path: string, params: { [key: string]: any }) {
        history.push({ pathname: path, state: params })
    }

    _goback(history: any) {
        history.goBack()
    }

    /**
     * 转化react-router-dom API为react-navigation API
     * @param history react-router开发者封装过的基于浏览器的history全局对象
     */
    transformNavigationProps(history: any) {
        const ROUTES = this.props.routes
        return {
            /**
             * 转场至另外一个目标视图
             * @param path 路由名称，在开发者自己定义的路由规则表中定义
             * @param params 进入目标视图后的传参
             */
            navigate: (path: string, params: { [key: string]: any }) => {
                if (ROUTES[path]) {
                    this._navigate(history, ROUTES[path].path, params)
                }
            },
            /**
             * 关闭当前视图，返回到上一个视图
             */
            goBack: () => {
                this._goback(history)
            },
            /**
             * 当前路由的状态变量
             */
            state: {
                params: this.props.location.state,
            }
        };
    }

    /**
     * 生成多路由标签
     * @param history react-router开发者封装过的基于浏览器的history全局对象
     */
    generateRoutes(history: any) {
        const ROUTES = this.props.routes
        return Object.keys(ROUTES).map((routeName, idx) => {
            const { screen: Screen, path } = ROUTES[routeName]
            // 给路由视图组件通过props属性来追加API
            const screenProps = {
                navigation: this.transformNavigationProps(history)
            };
            const currentComponent = () => <Screen {...screenProps} />
            const routeProps = {
                path,
                component: currentComponent,
                key: idx,
                exact: true,
            };
            return <Route {...routeProps} />;
        });
    }

    getTransitionType() {
        console.log(this.props.history.action);
        switch (this.props.history.action) {
            case "POP":
                return "slide-right";
            case "PUSH":
            default :
                return "slide-left";
        }
    }

    render() {
        const {history, location} = this.props;
        console.log(this.getTransitionType());
        return (
            <div style={styles.fill}>
                <TransitionGroup>
                    <CSSTransition key={location.key} classNames={this.getTransitionType()} timeout={400}>
                        {/*Switch互斥标签，如果有一个path规则命中，则使用它，如果都没有命中则使用404 Not Found*/}
                        <Switch location={location}>
                            {this.generateRoutes(history)}
                            <Route
                                component={() => (
                                    <div>
                                        <span>{"404 Not Found"} </span>
                                    </div>
                                )}
                            />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
            </div>
        )
    }
}

const styles: any = {};

styles.fill = {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    overflow:"scroll"
};



export default withRouter(AppsNavigatorSwitch as any)