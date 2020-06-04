import React, { useEffect, useState, useContext, memo, forwardRef } from 'react';
import bindActionCreators from '../redux/bindActionCreators';
import ReactReduxContext from './Context';
import { shallowEqual, isObj } from './utils';

// 具体可以参考react-redux https://github.com/reduxjs/react-redux/blob/master/src/connect/mapDispatchToProps.js
// 这里没有写的跟官方那样严禁
function mapDispatchToPropsEnhancer(mapDispatchToProps, dispatch) {
    const fnProps = typeof mapDispatchToProps === 'function' ? mapDispatchToProps(dispatch) : bindActionCreators(mapDispatchToProps, dispatch);
    if (!isObj(fnProps)) throw new Error('Expect Object');
    return fnProps;
}

// 判断是否为函数,判断函数返回值是否为对象
function mapStateToPropsEnhancer(mapStateToProps, getState) {
    if (typeof mapStateToProps === 'function') {
        const newState = mapStateToProps(getState());
        if (isObj(newState)) return newState;
    }
    return {};
}

export default function (mapStateToProps, mapDispatchToProps) {
    return function (OldComponnet) {
        // 使用memo优化更新需求
        const Comp = memo(
            function (props) {
                const { reactReduxRef, ...restProps } = props;
                return <OldComponnet {...restProps} ref={reactReduxRef} />;
            },
            (x, y) => shallowEqual(x, y)
        );

        // 使用forwardRef转发ref
        return forwardRef(function (props, ref) {
            const { store } = useContext(ReactReduxContext);
            const [state, setState] = useState(() => mapStateToPropsEnhancer(mapStateToProps, store.getState));
            const [bundAction] = useState(() => mapDispatchToPropsEnhancer(mapDispatchToProps, store.dispatch));
            // eslint-disable-next-line
            useEffect(() => store.subscribe(() => setState(mapStateToPropsEnhancer(mapStateToProps, store.getState))), []);
            return <Comp {...state} {...bundAction} {...props} reactReduxRef={ref} />;
        });
    };
}
