import React from 'react';
import Counter1 from './Component/Counter1';
import Counter2 from './Component/Counter2';
import Count from './Component/Count';

export default function App() {
    const counter1Ref = React.useRef(null);
    React.useEffect(() => {
        console.log('获取被connect包裹的组件的ref', counter1Ref);
    }, []);
    return (
        <div>
            <Count />
            <Counter1 ref={counter1Ref} name="counter1" />
            <Counter2 name="counter2" />
        </div>
    );
}
