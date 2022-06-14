import React, { lazy, Suspense } from 'react';
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
                <p><strong>=======================================</strong></p>
                <p>Start simple import examples</p>
                <p>Using imported js-function: result is {add(5, 10)}</p>
                <AdditionElementFunction a={5} b={10} />
                <AdditionElementClass a={30} b={20} />
                <TestImport />
                <ReactVersion />
                <p>End simple import examples</p>
            </div>
        )
    }
}

function ReactVersion(props) {
    return (
        <h1>Current React version is {React.version}</h1>
    );
}

// Пример динамического импорта через промис - как подвязать к существующему компоненту - мне пока непонятно 
import('./utilities/math.js').then(math => {
    console.log(math.add(16, 26));
});

// Пример ленивого импорта - необходимо выносить один компонент в отдельный файл и оборачивать его в callback и Suspense в файле источнике 
const LazyComponentConst = lazy(() => import('./utilities/LazyComponentConst'));
const LazyComponentFunction = lazy(() => import('./utilities/LazyComponentFunction'));
const LazyComponentConst2 = lazy(() => import('./utilities/LazyComponentConst2'));
const LazyComponentClass = lazy(() => import('./utilities/LazyComponentClass'));

const MyLazyComponentConst = () => (
    <Suspense fallback={<div>LOADING...</div>}>
        <LazyComponentConst />
    </Suspense>
);

const MyLazyComponentFunction = () => (
    <Suspense fallback={<div>LOADING...</div>}>
        <LazyComponentFunction />
    </Suspense>
);

class App2 extends React.Component {
    render() {
        return (
            <div>
                <p><strong>=======================================</strong></p>
                <p>Start lazy loading of modules example</p>
                <MyLazyComponentConst />
                <MyLazyComponentFunction />
                <LazyComponentConst2 />
                <LazyComponentClass name="Input parameter" />
                <p>End lazy loading of modules example</p>
            </div>
        );
    }
}

root.render(
    <div>
        <App />
        <App2 />
    </div>
);

