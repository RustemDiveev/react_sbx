function ComponentFunction(props) {
    return <h1>LazyComponentFunction</h1>;
}

const LazyComponentFunction = () => {
    return <ComponentFunction />;
}

export default LazyComponentFunction;