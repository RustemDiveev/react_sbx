import ReactDOM from 'react-dom/client';

// Самый простой пример React
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<h1>Hello, world!</h1>);

// Это не html - а jsx (javascript xml) - генерирует элементы react 
const element = <h1>Hello, world!</h1>

// Можно имплементировать выражения в jsx 
const name = "Josh Perez";
const element_2 = <h1>Hello, {name}</h1>
// root.render перезаписывает содержимое  
root.render(element_2);

// Можно имплементировать и функции в jsx 
function formatName(user) {
    return user.firstName + ' ' + user.lastName;
}

const user = {
    firstName: 'Harper',
    lastName: 'Perez',
};

const element_3 = (
    <h1>
        Hello, {formatName(user)}!
    </h1>
);

root.render(element_3);

// Jsx также является и выражением 
// После компиляции jsx преобразуется в вызов js-функции и объекты js 
function getGreeting(user) {
    if (user) {
        return <h1>Hello, {formatName(user)}!</h1>;
    }
    return <h1>Hello, Stranger.</h1>;
}