import React, { useEffect, useState, useContext, memo, forwardRef } from 'react';
import bindActionCreators from '../redux/bindActionCreators';
import ReactReduxContext from './Context';
import shallowEqual from './utils/shallowEqual';

// 这里只使用bindActionCreators来创建action函数，未考虑mapDispatchToProps为一个形参为dispatch的函数
// 具体可以参考react-redux https://github.com/reduxjs/react-redux/blob/master/src/connect/mapDispatchToProps.js
function mapDispatchToPropsEnhancer(mapDispatchToProps, dispatch) {
    return bindActionCreators(mapDispatchToProps, dispatch);
}

// 判断是否为函数,判断函数返回值是否为对象
function mapStateToPropsEnhancer(mapStateToProps, getState) {
    if (typeof mapStateToProps === 'function') {
        const newState = mapStateToProps(getState());
        if (Object.prototype.toString.call(newState) === '[object Object]') return newState;
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
