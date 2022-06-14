import React, { Suspense } from 'react';

class ComponentClass extends React.Component {

    render() {
        return (
            <Suspense fallback={<div>Loading class...</div>}>
                <h1>LazyComponentClass: {this.props.name}</h1>
            </Suspense>
        );
    }

}

const LazyComponentClass = ({name}) => {
    return <ComponentClass name={name}/>
};

export default LazyComponentClass;