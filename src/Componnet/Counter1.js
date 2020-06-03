import React from 'react';
import { connect } from '../react-redux';

const Counter1 = React.forwardRef(function (props, ref) {
    return (
        <div>
            <p className="title" ref={ref}>
                {props.name}
            </p>
            <button onClick={props.add}>add</button>
        </div>
    );
});

const mapDispatchToProps = {
    add() {
        return function (dispatch) {
            dispatch({
                type: 'ADD',
                payload: 1,
            });
            const a = new Promise((resolve) => {
                setTimeout(() => {
                    resolve(10);
                }, 1000);
            });
            dispatch({
                type: 'ADD',
                payload: a,
            });
        };
    },
};

export default connect(undefined, mapDispatchToProps)(Counter1);
