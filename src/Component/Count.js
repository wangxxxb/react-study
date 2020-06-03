import React from 'react';
import { connect } from '../react-redux';

function Count({ number }) {
    return <h1>{number}</h1>;
}

const mapStateToProps = (state) => {
    return {
        number: state.reducer1.number,
    };
};

export default connect(mapStateToProps)(Count);
