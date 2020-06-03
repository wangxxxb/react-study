import React from 'react';
import { connect } from '../react-redux';
import { pickActions } from '../store';
import actions from '../store/actions/counter';

const Counter1 = React.forwardRef(function (props, ref) {
    return (
        <div ref={ref}>
            <p className="title">{props.name}</p>
            <button onClick={props.add}>add</button>
        </div>
    );
});

const mapDispatchToProps = pickActions(['add'], actions);

export default connect(undefined, mapDispatchToProps)(Counter1);
