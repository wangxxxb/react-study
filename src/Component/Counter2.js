import React from 'react';
import { connect } from '../react-redux';
import actions from '../store/actions/counter';
import { pickActions } from '../store';

function Counter2(props) {
    return (
        <div>
            <p className="title">{props.name}</p>
            <button onClick={props.minus}>minus</button>
        </div>
    );
}

const mapDispatchToProps = pickActions(['minus'], actions);

export default connect(undefined, mapDispatchToProps)(Counter2);
