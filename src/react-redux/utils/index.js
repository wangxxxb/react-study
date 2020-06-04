import shallowEqual from './shallowEqual';

function isObj(x) {
    return Object.prototype.toString.call(x) === '[object Object]';
}

export { isObj, shallowEqual };
