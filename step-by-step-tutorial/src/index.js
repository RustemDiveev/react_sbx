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

// zakommentirovala poka
//setInterval(tick_4_1, 1000);

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

// zakommentirovala poka
// setInterval(tick_4_2, 1000);

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

// Далее - добавляем локальное состояние в класс 
class Clock_4_4 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    // Специальные методы жизненного цикла компонента 
    // Вызывается после того, как выходные данные компонента отрисовались в DOM 
    // Здесь можно объявить таймер 
    componentDidMount() {
        // Можно добавлять доп атрибуты, не участвующие в потоке данных
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        return (
            <div>
                <h1>Sample local state</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }
}

root.render(<Clock_4_4 />);

// Важно настроить таймер один раз при первой отрисовке в DOM - называется "монтирование"
// Также необходимо убрать данный таймер - когда часы будут убраны - называется "демонтирование"

/*
    Правильное использование state:

    1. НЕ ИЗМЕНЯТЬ state НАПРЯМУЮ:
    this.state.comment = 'Hello'; // НЕПРАВИЛЬНО - не отрисует компонент 
    this.setState({comment: 'Hello'}); // ПРАВИЛЬНО 

    Единственное место, где можно назначать this.state - конструктор 

    2. ОБНОВЛЕНИЕ state МОЖЕТ БЫТЬ АСИНХРОННЫМ 
    React может объединять несколько вызовов setState() в единое обновление для производительности 
    Тк this.props и this.state могут обновляться асинхронно, не стоит рассчитывать на их значения при вычислении следующего состояния 

    НЕПРАВИЛЬНО:
    this.setState({
        counter: this.state.counter + this.props.increment,
    });

    Следует использовать другую форму setState(), принимающую функцию, а не объект 
    Функция получит предыдущий state в качестве первого аргумента, 
    а props в момент, когда применено обновление, в качестве второго аргумента 
    ПРАВИЛЬНО: 
    this.setState((state, props) => ({
        counter: state.counter + props.increment
    }));

    или не через стрелочную функцию:
    this.setState(function(state, props) {
        return {
            counter: state.counter + props.increment
        }
    });

    3. ОБНОВЛЕНИЯ state ОБЪЕДИНЯЮТСЯ 

    Например, state может содержать несколько независимых переменных 
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            comments: []
        };
    }

    Затем происходит их независимое обновление при помощи различных вызовов setState():
    componentDidMount() {

        fetchPosts().then(response => {
            this.setState({
                posts: response.posts
            });
        });

        fetchComments().then(response => {
            this.setState({
                comments: response.comments
            });
        });

    }

    Объединение неглубокое, 
    поэтому this.setState({comments}) оставляет this.state.posts таким же,
    но полностью заменяет this.state.comments 
*/

/*
    Локальное или независимое состояние компонента 

    Ни родительские, ни дочерние компоненты не могут знать о том, содержит ли какой-либо компонент состояние или нет, 
    и их не должно волновать определен он в качестве функции или класса. 
    Поэтому состояние часто называют локальным или инкапсулированным. 
    Оно недоступно для любого компонента, кроме того, что владеет и выставляет его.

    В компоненте может передаваться его состояние - как свойство в дочерние компоненты: 
    <FormattedDate date={this.state.date} />

    Компонент FormattedDate получит date в качестве свойств, и не будет знать: 
    прнишло ли это из состояния Clock, свойств Clock или было напечатано ручками 
    function FormattedDate(props) {
        return <h2>It is {props.date.toLocaleTimeSteing()}.</h2>;
    }
*/


/************************** Обработка событий ******************************/

/*
    Похоже на обработку событий элементов DOM, но есть различия в синтаксисе:
    - События React называются в camelCase, а не в нижнем регистре 
    - При помощи JSX можно передать функцию в качестве обработчика событий, а не строку 

    Например в HTML:
    <button onclick="activateLasers()">
        Activate lasers 
    </button>

    А в React: 
    <button onClick={activateLasers}>
        Activate lasers 
    </button>
*/

/*
    Другое отличие - нельзя возвращать false, чтобы предотвратить поведение по умолчанию в React 
    Необходимо вызвать preventDefault явно, например, если для простого HTML необходимо предотвратить 
    поведение формы по умолчанию при submit, делается так: 

    <form onsubmit="console.log('You clicked submit.'); return false">
        <button type="submit">Submit</button>
    </form>

    В React это будет выглядеть так: 
    function Form() {

        // Здесь e - синтетическое событие 
        // Не работают так, как нативные события - смотреть SyntheticEvent для подробностей 
        function handleSubmit(e) {
            a.preventDefault();
            console.log("You clicked submit.");
        }

        return (
            <form onSubmit={handleSubmit}>
                <button type="submit">Submit</button>
            </form>
        );
    }
*/

/*
    При использовании React не нужно вызывать addEventListener для добавления 
    слушателей к элементу DOM после того, как он создан. 
    Вместо этого, необходимо предоставить слушателя, когда элемент сразу же отрисован. 

    При определении компонента через класс ES6 - общий паттерн: 
    Обработчик событий должен быть методом класса, пример ниже 
*/
class Toogle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isToogleOn: true};

        // Такая привязка обязательна, чтобы переменная this работала при обратном вызове 
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(prevState => ({
            isToogleOn: !prevState.isToogleOn
        }));
    }

    render() {
        return (
            <button onClick={this.handleClick}>
                {this.state.isToogleOn ? 'ON' : 'OFF'}
            </button>
        );
    }
}

root.render(<Toogle />);

/*
    Следует быть осторожным по отношению к значению this в обратных вызовах JSX
    Методы класса не привязаны по умолчанию.
    Если забыть привязать this.handleClick и передать его в onClick - то this будет undefined, 
    когда функция действительно вызвана. 

    Так работают функции в js - в общих словах, если обращаться к методу без скобок, например: 
    onClick = {this.handleClick} - необходимо привязать этот метод 
*/

// Если вызов bind раздражает, то есть два способа обойти это: 

// 1. Использование экспериментального синтаксиса для публичных полей класса 
class LoggingButton extends React.Component {
    // Этот синтаксис гарантирует, что this будет привязано внутри handleClick 
    // Но синтаксис - экспериментальный 

    handleClick = () => {
        console.log("This is", this);
    }

    render() {
        return (
            <button onClick={this.handleClick}>
                Click me 
            </button>
        );
    }
}

root.render(<LoggingButton />);

/*
    Основная проблема с этим синтаксисом: 
    Создается различный колбэк каждый раз при отрисовке компонента 

    Если этот коллбэк передан в качестве свойства в нижние компоненты - 
    то этим компонентам может потребоваться дополнительная перерисовка 

    Рекомендуется выполнять привязку или в конструкторе, или использую синтаксис полей класса, 
    для того, чтобы избежать проблем с производительностью.
*/
class LoggingButtonArrowFunctionBind extends React.Component {
    handleClick() {
        console.log("this is:", this);
    }

    render() {
        // Этот синтаксис гарантирует, что this привязано внутри handleClick 
        return (
            <button onClick={() => this.handleClick()}>
                Click me plz!
            </button>
        );
    }
}

root.render(<LoggingButtonArrowFunctionBind />);

/*
    Передача параметров в обработчики событий 

    Общая потребность - передать внутри цикла дополнительный параметр в обработчик события. 
    Например, если id - идентификатор строки, то следующее будет работать: 

    <button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
    или 
    <button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>

    В обоих случаях e - аргумент, представляющий из себя событие React, которое будет передано в качестве второго аргумента
    после идентификатора.
*/

/************************** Условная отрисовка ******************************/

function UserGreeting(props) {
    return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
    return <h1>Please sign up.</h1>;
}

function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;

    if (isLoggedIn) {
        return <UserGreeting />;
    }
    return <GuestGreeting />;
}

root.render(<Greeting isLoggedIn={false} />);

// Можно использовать переменные для хранения элементов 
function LoginButton(props) {
    return (
        <button onClick={props.onClick}>
            Login
        </button>
    );
}

function LogoutButton(props) {
    return (
        <button onClick={props.onClick}>
            Logout
        </button>
    );
}

class LoginControl extends React.Component {
    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = {isLoggedIn: false};
    }

    handleLoginClick() {
        this.setState({isLoggedIn: true});
    }

    handleLogoutClick() {
        this.setState({isLoggedIn: false});
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;
        let button;
        if (isLoggedIn) {
            button = <LogoutButton onClick={this.handleLogoutClick} />;
        } else {
            button = <LoginButton onClick={this.handleLoginClick} />;
        }

        return (
            <div>
                <Greeting isLoggedIn={isLoggedIn} />
                {button}
            </div>
        );
    }
}

root.render(<LoginControl />);

// Можно использовать выражения покороче внутри jsx при помощи логического оператора соединения - &&
function Mailbox(props) {
    const unreadMessages = props.unreadMessages;
    return (
        <div>
            <h1>Hello!</h1>
            {unreadMessages.length > 0 &&
                <h2>
                    You have {unreadMessages.length} unread messages.
                </h2>
            }
        </div>
    );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];
root.render(<Mailbox unreadMessages={messages} />);

// Использование тернарного выражения 
// Пример 1 
class TernarOne extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isLoggedIn: false};
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;
        return (
            <div>
                The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
            </div>
        );
    }
}

root.render(<TernarOne />);

// Пример 2 
class TernarTwo extends React.Component {

    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = {isLoggedIn: false};
    }

    handleLoginClick() {
        this.setState({isLoggedIn: true});
    }

    handleLogoutClick() {
        this.setState({isLoggedIn: false});
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;
        return (
            <div>
                {isLoggedIn
                    ? <LogoutButton onClick={this.handleLogoutClick} />
                    : <LoginButton onClick={this.handleLoginClick} />
                }
            </div>
        );
    }

}

root.render(<TernarTwo />);

/*
    Предотвращение отрисовки компонента 

    В редких случаях может быть необходимость спрятать компонент, даже если он был отрисован другим компонентом.
    Для этого необходимо вернуть null в выходных данных отрисовки 
*/

function WarningBanner(props) {
    if (!props.warn) {
        return null;
    }

    return (
        <div className="warning">
            Warning!
        </div>
    );
}

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showWarning: true};
        this.handleToogleClick = this.handleToogleClick.bind(this);
    }

    handleToogleClick() {
        this.setState(state => ({
            showWarning: !state.showWarning
        }));
    }

    render() {
        return (
            <div>
                <WarningBanner warn={this.state.showWarning} />
                <button onClick={this.handleToogleClick}>
                    {this.state.showWarning ? 'Hide' : 'Show'}
                </button>
            </div>
        );
    }
}

root.render(<Page />);

// Но возврат null из метода компонента render() не предотвращает запуск методов жизненного цикла компонента 
// Например, componentDidUpdate будет вызван все равно

/************************** Списки и ключи ******************************/

/*
    Пример преобразования списков в js 

    const numbers = [1, 2, 3, 4, 5];
    const doubled = numbers.map((number) => number * 2);
    console.log(doubled);
*/

// Отрисовка множества компонентов 
// Можно собирать коллекции элементы и включать их в JSX при помощи фигурных скобок 
const numbers_8 = [1, 2, 3, 4, 5];
const listItems_8 = numbers_8.map((number) => 
    <li>{number}</li>
);

//zakommentirovala poka
//root.render(<ul>{listItems_8}</ul>);

// Простой списочный компонент 
function NumberList(props) {
    const numbers = props.numbers;
    // ключ позволяет React-у понять, какие элементы изменились, добавились и удалились
    // их необходимо раздавать элементам внутри массива (коллекции), чтобы дать стабильную идентификацию
    const listItems = numbers.map((number) =>
        <li key={number.toString()}>
            {number}
        </li>
    );
    return (
        <ul>{listItems}</ul>
    );
}

const numbers_8_1 = [10, 20, 30, 40, 50];
root.render(<NumberList numbers={numbers_8_1} />);

/*
    Лучший способ выбрать ключ - использовать строку, уникально идентифицирующую элемент из списка среди остальных 
    Чаще всего используются ID из данных в качестве ключей 

    const todoItems = todos.map((todo) =>
        <li key={todo.id}>
            {todo.text}
        </li>
    );

    Когда нет стабильного идентификатора для отрисованных элементов можно использовать индекс элемента - но это стоит делать в самом крайнем случае:
    const todoItems = todos.map((todo, index)
        // Выполнять только тогда, когда у элементов нет стабильных идентификаторов 
        <li key={index}>
            {todo.text}
        </li>
    );
*/

/*
Выбор компонентов для добавления ключей 
Основной посыл - ключи имеют смысл только в контексте окружающего их массива
Правило: Элементы внутри вызова map() нуждаются в ключах

1. Пример неправильного использования 

function ListItem_Wrong(props) {
    const value = props.value;
    return (
        // НЕПРАВИЛЬНО. Нет нужды указывать ключ здесь 
        <li key={value.toString()}>
            {value}
        </li>
    );
}

function NumberList_Wrong(props) {
    const number = props.numbers;
    const listItems = numbers.map((number) => 
        // Нужно было указать ключ здесь 
        <ListItem value={number} />
    );
    return (
        <ul>
            {listItems}
        </ul>
    );
}

function ListItem_Correct(props) {
    // Правильно, здесь не надо указывать ключ 
    return <li>{props.value}</li>;
}

function NumberList_Correct(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) =>
        // Правильно, ключ необходимо указывать внутри массива 
        <ListItem key={number.toString()} value={number} />
    );
    return (
        <ul>
            {listItems}
        </ul>
    );
}

*/

/*
    Ключи должны быть уникальны только среди элементов массива, а не глобально
    Например, использование тех же самых ключей допустимо для двух разных массивов:
*/
function Blog(props) {
    const sidebar = (
        <ul>
            {props.posts.map((post) => 
                <li key={post.id}>
                    {post.title}
                </li>
            )}
        </ul>
    );

    const content = props.posts.map((post) => 
        <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
        </div>
    );

    return (
        <div>
            {sidebar}
            <hr />
            {content}
        </div>
    );
}

const posts = [
    {id: 1, title: "Hello Man", constant: "Welcome to learning React!"},
    {id: 2, title: "Installation", constant: "You can install react from npm"},
]

root.render(<Blog posts={posts} />);

// Ключи служат подсказкой для React, но не передаются в компоненты 
// Если эти значения нужны, то необходимо передать их явно в качестве свойства с другим именем 
// В пример ниже, компонент Post может читать props.id, но не может читать props.key 
/*
    const content = posts.map((post) => 
        <Post
            key={post.id}
            id={post.id}
            title={post.title} />
    );
*/

// Реализация map() в JSX 

function ListItem_Correct(props) {
    // Правильно, здесь не надо указывать ключ 
    return <li>{props.value}</li>;
}

function NumberList_8_1(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) => 
        <ListItem_Correct key={number.toString()}
            value={number} />
    );
    return (
        <ul>
            {listItems}
        </ul>
    )
}

// JSX позволяет встроить любое выражение в фигурных скобках, поэтому можно сразу же сгенерировать результат map()
function NumberList_8_2(props) {
    const numbers = props.numbers;
    return (
        <ul>
            {numbers.map((number) => 
                <ListItem_Correct key={number.toString()}
                    value={number} />
            )}
        </ul>
    );
}

root.render(<NumberList_8_2 numbers={[11,22,33,44,55]} />);

/************************** Формы ******************************/

/*
    Принцип работы форм HTML отличается от других DOM элементов в React, 
    т.к элементы формы обычно сохраняют внутреннее состояние.
    Например, эта форма на простом HTML принимает одно имя:

    У формы стандартное поведение - переход на новую страницу, когда пользователь сабмиттит форму.
    В React - это стандартное поведение, но в большинстве случаев есть потребность иметь js-функцию,
    которая обрабатывает отправку формы и имеет доступ к данным, который пользователь ввел в форму. 

    Стандартный способ реализовать это - техника "контролируемых компонентов"

    <form>
        <label>
            Name:
            <input type="text" name="name" />
        </label>
        <input type="submit" value="Submit" />
    </form>
*/

/*
    В HTML такие элементы форм, как <input>, <textarea> и <select> обычно поддерживают состояние внутри себя,
    и обновляют его исходя из введенных пользователем значений 

    В React изменяемое состояние хранится в state и обновляется через setState()
*/

class NumberForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''}

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

root.render(<NumberForm />);

/*
    Пример с <textarea>

    В HTML элемент <textarea> определяет свой текст при помощи своих детей 

    <textarea>
        Sample text 
    </textarea>

    Но в React <textarea> использует атрибута <value>
*/

class EssayForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'Please write an essay about your favorite DOM element.'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('An essay was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Essay:
                    <textarea value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

root.render(<EssayForm />);

/*
    Тэг <select> создает выпадающий список 
    Например, этот HTML создает выпадающий список из вкусов

    <select>
        <option value="grapefruit">Grapefruit</option>
        <option value="lime">Lime</option>
        <option selected value="coconut">Coconut</option>
        <option value="mango">Mango</option>
    </select>

    Но в React вместо атрибута selected - используется атрибут value корневого тега select 
    Более удобно, тк в контролируемом компоненте требуется обновить только в одном месте 
*/

class FlavorForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: 'coconut'};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('Your favorite flavor is: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Pick your favorite flavor:
                    <select value={this.state.value} onChange={this.handleChange}>
                        <option value="grapefruit">Grapefruit</option>
                        <option value="lime">Lime</option>
                        <option selected value="coconut">Coconut</option>
                        <option value="mango">Mango</option>
                    </select>
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}
    
root.render(<FlavorForm />);

/*
    Примечание: 
    Можно передать массив в атрибут value, чтобы пометить, что выбрано несколько опций в теге <select>:

    <select multiple={true} value={['B', 'C']}>
*/

/*
    Тег <input type="file"> позволяет пользователю выбрать один или более файлов с устройства 
    для загрузки на сервер или манипуляции через JS при помощи File API 

    Из-за того, что значение этого тега только на чтение, он является неконтролируемым в react 
*/

/*
    Обработка нескольких input-ов 
    Для этого можно добавить атрибут name к каждому элементу, и рещать, что делать на базе значений event.target.name 
*/

class Reservation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isGoing: true,
            numberOfGuests: 2
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        
        // Вычисляемое название свойства
        this.setState({
            [name]: value
        });

        /*
            Эквивалентно следующему коду ES5:
            var partialState = {};
            partialState[name] = value;
            this.setState(partialState);
        */
    }

    render() {
        return (
            <form>
                <label>
                    Is going:
                    <input
                        name="isGoing"
                        type="checkbox"
                        checked={this.state.isGoing}
                        onChange={this.handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Number of guests:
                    <input 
                        name="numberOfGuests"
                        type="number"
                        value={this.state.numberOfGuests}
                        onChange={this.handleInputChange}
                    />
                </label>
            </form>
        );
    }
}

root.render(<Reservation />);

/*
    Контроль редактирования Input при помощи значения null 

    Указание свойства value у контролируемого компонента предотвращает пользователя от изменения input, пока этого не захочет разработчик.
    Если value указано, но input редактируемый, то можно случайно выставить value в undefined или null 
*/

// zakommentirovala poka
/*
root.render(<input value="hi" />);

setTimeout(function() {
    root.render(<input value={null} />);
}, 5000);
*/

/************************** Продвижение состояния наверх ******************************/

/*
    Часто, нескольким компонентам необходимо отображать те же самые изменяющиеся данные.
    Рекомендуется выносить совместное состояние наверх до ближайшего общего родителя 
*/

function BoilingVerdict_10_1(props) {
    if (props.celsius >= 100) {
        return <p>The water would boil.</p>;
    }
    return <p>The water would not boil.</p>;
}

class Calculator_10_1 extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {temperature: ''};
    }

    handleChange(e) {
        this.setState({temperature: e.target.value});
    }

    render() {
        const temperature = this.state.temperature;
        return (
            <fieldset>
                <legend>Enter temperature in Celsius</legend>
                <input 
                    value={temperature}  
                    onChange={this.handleChange}
                />
                <BoilingVerdict_10_1
                    celsius={parseFloat(temperature)} />
            </fieldset>
        );
    }
}

root.render(<Calculator_10_1 />);

// Добавление второй формы ввода 
/*
    Вынесение TemperatureInput из Calculator 
    Чтобы обе формы обновлялись, при обновлении каждой из них - 
    необходимо вынести состояние компонентов на уровень их общего родителя 
    В нашем случае - это Calculator 
*/

const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
};

// Функции конвертации из C в F и наоборот 
function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

// Универсальная функция преобразования 
function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return '';
    }
    // Прикольно - convert - это функция 
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}

class TemperatureInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        //this.state = {temperature: ''};
    }

    handleChange(e) {
        //this.setState({temperature: e.target.value});
        this.props.onTemperatureChange(e.target.value);
    }

    render() {
        //const temperature = this.state.temperature;
        const temperature = this.props.temperature;
        const scale = this.props.scale;
        return (
            <fieldset>
                <legend>Enter temperature in {scaleNames[scale]}</legend>
                <input value={temperature}
                    onChange={this.handleChange} />
            </fieldset>
        );
    }
}

class Calculator_10_2 extends React.Component {
    constructor(props) {
        super(props);
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
        this.state = {temperature: '', scale: 'c'};
    }

    handleCelsiusChange(temperature) {
        this.setState({scale: 'c', temperature});
    }

    handleFahrenheitChange(temperature) {
        this.setState({scale: 'f', temperature});
    }

    render() {
        const scale = this.state.scale;
        const temperature = this.state.temperature;
        const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
        const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

        return (
            <div>
                <TemperatureInput 
                    scale="c"
                    temperature={celsius}
                    onTemperatureChange={this.handleCelsiusChange} />
                <TemperatureInput 
                    scale="f"
                    temperature={fahrenheit}
                    onTemperatureChange={this.handleFahrenheitChange} />
                <BoilingVerdict_10_1 
                    celsius={parseFloat(celsius)} />
            </div>
        );
    }
}

root.render(<Calculator_10_2 />);

// Осознать почему в предыдущем примере обновляется оба инпута - на момент написания этого мне это удалось 

/************************** Композиция vs Наследование ******************************/

// В React мощная модель композиции, и рекомендуется использовать её вместо наследования, 
// чтобы переиспользовать существующий код между компонентами 

/*
    Заключение (или задержание или удерживание или сокрытие) - вообщем Containment 
    Некоторые компоненты не знают о своих детях, например Sidebar или Dialog - являющиеся универсальными коробками 
    Рекомендуется, чтобы такие компоненты использовали свойство children для передачи его напрямую: 
    Это позволяет другим компонентам передавать произвольных детей, путем их вложения в JSX:
*/

function FancyBorder(props) {
    return (
        <div className={'FancyBorder FancyBorder-' + props.color}>
            {props.children}
        </div>
    );
}

function WelcomeDialog() {
    return (
        <FancyBorder color="blue">
            <h1 className="Dialog-title">
                Welcome
            </h1>
            <p className="Dialog-message">
                Thank you for visiting our spacecraft!
            </p>
        </FancyBorder>
    );
}

root.render(<WelcomeDialog />);


/*
    Рассмотрим случай, когда необходимо много дырок в компоненте, тогда творчество и отходим от использования props.children 

    Элементы React можно также передавать как свойства.
*/

function Contacts() {
    return <h1>Контакты</h1>;
}

function Chat() {
    return <h1>Чат</h1>;
}

function SplitPane(props) {
    return (
        <div className="SplitPane">
            <div className="SplitPane-left">
                {props.left}
            </div>
            <div className="SplitPane-right">
                {props.right}
            </div>
        </div>
    );
}

function App() {
    return (
        <SplitPane
            left={
                <Contacts />
            }
            right={
                <Chat />
            } />
    );
}

root.render(<App />);

/*
    Иногда можно думать о компонентах - как о специальных случаях других компонентов 
    Например, WelcomeDialog является частным случаем Dialog 

    В React это достигается путем композиции, когда более специфичный компонент рендерит более универсальный, 
    и наполняет его специфичными для частного компонента свойствами
*/
function Dialog_10(props) {
    return (
        <FancyBorder color="blue">
            <h1 className="Dialog-title">
                {props.title}
            </h1>
            <p className="Dialog-message">
                {props.message}
            </p>
        </FancyBorder>
    );
}

function WelcomeDialog_10() {
    return (
        <Dialog_10
            title="Welcome"
            message="Thank you for visiting our spacecraft!"
        />
    );
}

root.render(<WelcomeDialog_10 />);

// Композиция работает одинаково хорошо для компонентов, которые определены как классы 
function Dialog_10_1(props) {
    return (
        <FancyBorder color="blue">
            <h1 className="Dialog-title">
                {props.title}
            </h1>
            <p className="Dialog-message">
                {props.message}
            </p>
            {props.children}
        </FancyBorder>
    );
}

class SignupDialog extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.state = {login: ''};
    }

    handleChange(e) {
        this.setState({login: e.target.value});
    }

    handleSignUp() {
        alert(`Welcome aboard, ${this.state.login}!`);
    }

    render() {
        return (
            <Dialog_10_1 title="Mars Exploration Program" message="How should we refer to you?">
                <input value={this.state.login} onChange={this.handleChange} />
                <button onClick={this.handleSignUp}>
                    Sign me up!
                </button>
            </Dialog_10_1>
        );
    }
}

root.render(<SignupDialog />);