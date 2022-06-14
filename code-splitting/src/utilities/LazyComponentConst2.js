import { Suspense } from "react";

// Для динамического импорта - необходимо оборачивать в Promise
const LazyComponentConst2 = () => {
    return (
        <Suspense fallback={<div>Lazy loading...</div>}>
            <h1>LazyComponentConst2</h1>
        </Suspense>
    );
};

export default LazyComponentConst2;