/*
    Контекст выполнения 
*/
/*
    https://github.com/tylermcginnis/javascriptvisualizer
    Инструмент для визуализации выполнения js - 
    отдельный вебсайт не нашел
*/

/*
    Каждый контекст выполнения имеет 2 фазы:
        1. Фаза создания 
        2. Фаза выполнения 

    Глобальный контекст - контекст, создающийся при выполнении javascript в браузере. Создается даже если нет написанного кода.

    Контекст выполнения функции - контекст, (ну мля логично) создающийся при выполнении функции.

    1. Фаза создания: 
        1.1 Сохраняет значения всех функций в переменные
        1.2 Всем переменным-не функциям присваивает undefined 
        1.3 Для глобального контекста - устанавливает this в window, задает window: global object 
        1.4 Для контекста выполнения функции - устанавливает arguments, и переданные значения переменных
    2. Фаза выполнения 
        2.1 Использует данные из фазы создания 
        2.2 Если не обнаруживает значение какой-либо переменной - ищет значение в родительском контексте.
*/

/*
    Далее будут примеры - их надо осознать и при необходимости запустить - но строго по отдельности.
    Что будет после фазы создания?
    Что будет после фазы выполнения?
*/

/***********------------1--------------*************/

// Фаза создания
console.log('name: ', name);
console.log('handle: ', handle);
console.log('getUser: ', getUser);

var name = "Dorzhik";
var handle = "@lexus777";

function getUser() {
    return {
        name: name,
        handle: handle
    };
}

// Фаза выполнения
console.log('name: ', name);
console.log('handle: ', handle);
console.log('getUser: ', getUser);

/***********------------2--------------*************/

function fn() {
    console.log('arguments: ', arguments);
}

fn()
fn(4, 3);

/***********------------3--------------*************/
/*
    Здесь важно понять, что после выполнения вызова функции, соответствующий контекст закрывается
*/

function a() {
    console.log('In fn a');

    function b() {
        console.log('In fn b');

        function c() {
            console.log('In fn c');
        }

        c();
    }

    b();
}

a();

/***********------------4--------------*************/

var name = 'Bazyrka';
var handle = '@habibi';

function getURL(handle) {
    var twitterURL = 'https://twitter.com';
    return twitterURL + handle;
}

// На фазе создания, здесь будут инициализированы в нужные значения - arguments и handle 
// twitterURL будет undefined 
getURL(handle);

/***********------------5--------------*************/
// интересный пример 

function foo() {
    var bar = 'declared in foo';
}

foo();

console.log(bar);

/***********------------6--------------*************/

function first() { 
    var name = 'Jordyn';

    console.log(name);
}

function second() {
    var name = 'Jake';

    console.log(name);
}

console.log(name);
var name = 'Tyler';
first();
second();
console.log(name);

/***********------------7--------------*************/
var name = 'Bazyr';

function logName() {
    // Смотрит в родительский контекст выполнения 
    console.log(name);
}

logName();

/***********------------8--------------*************/
// Вынос мозга 

var count = 0;

function makeAdder(x) {
    // Closure scope 
    return function inner(y) {
        return x + y;
    };
}

var add5 = makeAdder(5);
count += add5(2);