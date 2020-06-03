import React from 'react';
import { connect } from '../react-redux';

function Counter2(props) {
    return (
        <div>
            <p className="title">{props.name}</p>
            <button onClick={props.minus}>minus</button>
        </div>
    );
}

const mapDispatchToProps = {
    minus() {
        return {
            type: 'MINUS',
            payload: 1,
        };
    },
};

export default connect(undefined, mapDispatchToProps)(Counter2);
