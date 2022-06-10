import React from 'react';
import ReactDOM from 'react-dom/client';

import { AdditionElementFunction, AdditionElementClass } from './app.js';
import { add } from './utilities/math.js';


const root = ReactDOM.createRoot(document.getElementById('root'));

class TestImport extends React.Component {
    render() {
        return <h1>Hello, kitty, konichiwa!</h1>;
    }
}

class App extends React.Component {
    render() {
        return (
            <div>
                <p>Using imported js-function: result is {add(5, 10)}</p>
                <AdditionElementFunction a={5} b={10} />
                <AdditionElementClass a={30} b={20} />
                <TestImport />
            </div>
        )
    }
}

root.render(
    <App />
);

