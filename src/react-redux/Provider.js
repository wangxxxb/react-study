import React from 'react';
import ReactReduxContext from './Context';

export default function Provider(props) {
    return <ReactReduxContext.Provider value={{ store: props.value.store }}>{props.children}</ReactReduxContext.Provider>;
}
