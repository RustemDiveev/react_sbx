import ReactDOM from 'react-dom/client';
import React from 'react';


/******************************JSX********************************* */

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

root.render(getGreeting(
    {firstName: "Sleeping", lastName: "Joe"}
));

// Можно использовать кавычки, чтобы указать строковые литералы как атрибуты 
const element_4 = <a href="https://www.reactjs.org"> link </a>;
root.render(element_4);

// Можно использовать фигурные кавычки, чтобы встроить javascript-выражение в атрибут 
// НО В АТРИБУТЕ МОЖНО ИСПОЛЬЗОВАТЬ ИЛИ ЛИТЕРАЛ ИЛИ ВЫРАЖЕНИЕ, НО НЕ ОБА СРАЗУ 
const user_5 = {
    avatarUrl: "https://klike.net/uploads/posts/2018-10/1539074833_1.jpg"
};
const element_5 = <img src={user_5.avatarUrl}></img>;
root.render(element_5);


// Если тег пустой, то его можно сразу же закрыть с /> как в XML 
const user_6 = {
    avatarUrl: "https://www.1zoom.ru/big2/58/185694-Sepik.jpg"
};
const element_6 = <img src={user_6.avatarUrl} />;
root.render(element_6);

// JSX теги могут содержать детей 
const element_7 = (
    <div>
        <h1>Hello!</h1>
        <h2>Good to see you here.</h2>
    </div>
);
root.render(element_7);

/*
    JSX предотвращает инъекции (XSS)

    const title = response.potentiallyMaliciousInput;
    // Это безопасно 
    const element = <h1>{title}</h1>;

    По умолчанию, React DOM экранирует любые значения, встроенные в JSX перед их отрисовкой. 
    Никогда нельзя выполнить инъекцию, только если это было не написано явно в приложении 
*/

// JSX представляет собой объекты - Babel компилирует jsx до вызовов React.createElement()

const element_8 = (
    <h1 className="greeting">
        Hello, world!
    </h1>
);

const element_9 = React.createElement(
    "h1",
    {className: "greeting"},
    "Hello, world!"
);

// root.render(element_8);
// root.render(element_8);
// console.log(element_8 == element_9); // false
// console.log(element_8 === element_9); // false

/*
    React.createElement() выполняет проверки, чтобы помочь написать код без багов 
    и примерно создает структуру следующего вида 

    const element = {
        type: "h1",
        props: {
            className: "greeting",
            children: "Hello, world!"
        }
    };

    Элементы React - про них можно думать как описание того, что хочется видеть в браузере 
*/

/*************************** Отрисовка элементов **************************** */

// Элемент описывает то, что хочется видеть на экране 
// В отличеие от элементов DOM, элементы React - простые и их дешевле создавать 
// Компоненты состоят из элементов 

/*
    Предположим, что в html-шаблоне есть такой <div>
    <div id="root"></div>
    Узел корня 

    Как правило, приложения, разработанные с помощью React - имеют только такой элемент
*/

// Отрисовка элемента 
const root_2_1 = ReactDOM.createRoot(
    document.getElementById("root")
);

const element_2_1 = <h1>Sample text</h1>;
root.render(element_2_1);

// Элементы React - не мутабельные 
// При создании элемента нельзя изменить его детей или атрибуты 
// Элемент можно считать как кадр в фильме - представляет собой UI в определенный момент времени 
// Единственный, пока известный способ, обновить UI элемент - создать новый элемент 
// и передать его в root.render() 

const root_2_2 = ReactDOM.createRoot(
    document.getElementById("root")
);

function tick_2() {
    const element = (
        <div>
            <h1>Sample text</h1>
            <h2>It is {new Date().toLocaleTimeString()}.</h2>
        </div>
    );
    root.render(element);
}

// Вызов roor.render() каждую секунду из коллбэк-функции setInterval()
// zakommentirovala poka 
// setInterval(tick_2, 1000);

// На практике, большинство приложений React вызывают root.render() один раз 

// React обновляет только то, что необходимо 
// React DOM сравнивает элемент и его потомков, с предыдущим элементом и применяет только то, что обновилось 
// Определять то, как должен выглядеть UI в любой момент, вместо того чтобы задумываться о том, как менять его во времени
// Такой подход - убирает кучу багов 

/************************** Компоненты и свойства ***************************** */

// Компоненты позволяют разделить UI на независисые, переиспользуемые куски - и думать о каждом куске изолировано 
// Концептуально, компоненты как функции JS. Принимают произвольные входные данные (пропсы) и возвращают элементы React, 
// описывающие, как они должнеы выглядеть на экране 

// Простейший способ определить компонент 
// Эта функция - валидный компонент React - тк принимает props 
// Компонент-функция
function Welcome_3(props) {
    return <h1>Hello, {props.name}</h1>;
}

// Также можно использовать класс - оба компоненты эквивалентны 
class Welcome_3_1 extends React.Component{
    render() {
        return <h1>Hello, {this.props.name}</h1>;
    }
}

// Элементы могут представлять из себя пользовательские компоненты 
const element_3_1 = <Welcome_3_1 name="Ilshat" />;
root.render(element_3_1);

// Когда React видит элемент, представляющий собой пользовательский компонент - то передает атрибуты JSX и детей в этот компонент 
// в виде одного объекта (называется props)

// ВСЕГДА НЕОБХОДИМО НАЧИНАТЬ КОМПОНЕНТЫ REACT С ЗАГЛАВНОЙ БУКВЫ

// Компоненты могут обращаться к другим компонентам в своих выходных данных 
// Что позволяет использовать абстракцию компонентов любого уровня детализации - кнопка, форма, диалоговое окно, экран итп

// Пример вложенности 

function App_3_1() {
    return (
        <div>
            <Welcome_3_1 name="Dorgik" />
            <Welcome_3_1 name="Djamshoot" />
            <Welcome_3_1 name="Bazyrka" />
        </div>
    );
}
root.render(App_3_1());

// Обычно в React есть одиночный компонент App в самой верхушке
// Если React интегрируется в существующее приложение - то начинается выстроение иерархии с самого мелкого компонента (Button)

// Пример рефакторинга 
function formatDate_3(date) {
    return date.toLocaleTimeString();
}

function Comment_3(props) {
    return (
        <div className="Comment">
            <div className="UserInfo">
                <img className="Avatar"
                    src={props.author.avatarUrl}
                    alt={props.author.name}
                />
                <div className="UserInfo-name">
                    {props.author.name}
                </div>
            </div>
            <div className="Comment-text">
                {props.text}
            </div>
            <div className="Comment-date">
                {formatDate_3(props.date)}
            </div>
        </div>
    );
}

const comment_3 = {
    date: new Date(),
    text: 'I hope you enjoy learning React!',
    author: {
      name: 'Hello Kitty',
      avatarUrl: 'http://placekitten.com/g/64/64'
    }
};

root.render(
    <Comment_3 
        date={comment_3.date}
        text={comment_3.text}
        author={comment_3.author} />
);

/*
    Разбиваем компонент на несколько частей
    1. Выделяем отдельно аватар
    2. Выделяем отдельно информацию о пользователе 
*/

// Ему не нужно знать, что рендерится внутри комментария - поэтому задаем более обобщенное имя - пользователь, вместо автора 
// Рекомендуется называть пропсы по смыслу компонента, а не по контексту, в котором он используется 
function Avatar_3(props) {
    return (
        <img className="Avatar"
            src={props.user.avatarUrl}
            alt={props.user.name}
        />
    );
}

function UserInfo_3(props) {
    return (
        <div className="UserInfo">
            <Avatar_3 user={props.user} />
            <div className="UserInfo-name">
                {props.user.name}
            </div>
        </div>
    );
}


function Comment_3_1(props) {
    return (
        <div className="Comment">
            <UserInfo_3 user={props.author} />
            <div className="Comment-text">
                {props.text}
            </div>
            <div className="Comment-date">
                {formatDate_3(props.date)}
            </div>
        </div>
    );
}

root.render(
    <Comment_3_1 
        date={comment_3.date}
        text={comment_3.text}
        author={comment_3.author} />
);

// Кандидат на отделяемый компонент - если часть UI используется несколько раз, или сама по себе сложная

// Пропсы - только на чтение 
// Когда объявляется компонент как функция или класс - никогда не должны изменяться 
// Чистые функции - всегда возвращают один и тот же результат, для тех же входных данных, и не изменяют свои входные параметры 

/*
    Примеры чистой и грязной функций:

    function sum(a, b) {
        return a + b;
    }

    function withdraw(account, amount) {
        account.total -= amount;
    }

*/

// ВСЕ КОМПОНЕНТЫ REACT ДОЛЖНЫ ВЕСТИ СЕБЯ КАК ЧИСТЫЕ ФУНКЦИИ ПО ОТНОШЕНИЮ К СВОИМ ПРОПСАМ 

/************************** Состояние и жизненный цикл ******************************/
// Старый пример
function tick_4_1() {
    const element_4_1 = (
        <div>
            <h1>Sample text</h1>
            <h2>It is {new Date().toLocaleTimeString()}.</h2>
        </div>
    );
    root.render(element_4_1);
}

setInterval(tick_4_1, 1000);

// Сделаем компонент Clock переиспользуемым и инкапсулированным 
function Clock_4_2(props) {
    return (
        <div>
            <h1>Sample text 222</h1>
            <h2>It is {new Date().toLocaleTimeString()}.</h2>
        </div>
    );
}

function tick_4_2() {
    root.render(<Clock_4_2 date={new Date()} />)
}

setInterval(tick_4_2, 1000);

// Но пока тоже не то - мы хотим написать так и не париться: root.render(<Clock />);

// Преобразование функции в класс 
class Clock_4_3 extends React.Component {
    render() {
        return (
            <div>
                <h1>Sample text class</h1>
                <h2>It is {this.props.date.toLocaleTimeString()}.</h2> 
            </div>
        );
    }
}