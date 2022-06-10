import React from 'react';
import ReactDOM from 'react-dom/client';

import { AdditionElementFunction, AdditionElementClass } from './app.js';
import { add } from './utilities/math.js';


const root = ReactDOM.createRoot(document.getElementById('root'));

class App extends React.Component {
    render() {
        return (
            <div>
                <p>Using imported js-function: result is {add(5, 10)}</p>
                <AdditionElementFunction a={5} b={10} />
                <AdditionElementClass a={30} b={20} />
            </div>
        )
    }
}

root.render(
    <App />
);

