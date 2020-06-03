function bindActionCreator(actionCreator, dispatch) {
    return function (...args) {
        return dispatch(actionCreator(...args));
    };
}

// 生成action函数
export default function bindActionCreators(actionCreators = {}, dispatch) {
    if (typeof actionCreators === 'function') {
        return bindActionCreator(actionCreators, dispatch);
    }

    if (typeof actionCreators !== 'object' || actionCreators === null) {
        throw new Error('Expect actionCreators to be a function or a object');
    }

    const bindActionCreators = {};

    for (const key in actionCreators) {
        if (typeof actionCreators[key] === 'function') {
            bindActionCreators[key] = bindActionCreator(actionCreators[key], dispatch);
        }
    }
    return bindActionCreators;
}
