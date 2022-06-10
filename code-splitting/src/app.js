import React from 'react';

import {add} from './utilities/math.js';

export function AdditionElementFunction(props) {
    return (
        <p>
            Result is {add(props.a, props.b)} for exported function!
        </p>
    );
}

export class AdditionElementClass extends React.Component {
    constructor(props) {
        super(props);
        this.props = {a: 0, b: 0};
    }

    render() {
        return (
            <p>
                Result is {add(this.props.a, this.props.b)} for exported class!
            </p>
        )
    }
}