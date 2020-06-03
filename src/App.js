import React from 'react';
import Counter1 from './Componnet/Counter1';
import Counter2 from './Componnet/Counter2';
import Count from './Componnet/Count';

export default function App() {
    const counter1Ref = React.useRef(null);
    React.useEffect(() => {
        console.log(counter1Ref);
    }, []);
    return (
        <div>
            <Count />
            <Counter1 ref={counter1Ref} name="counter1" />
            <Counter2 name="counter2" />
        </div>
    );
}
