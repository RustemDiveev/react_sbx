/*
    Что такое this? - позволяет переиспользовать функции с различным контекстом 
    1. Неявное связывание
    2. Явное связывание 
    3. Связывание через new 
    4. Связывание через window 
*/

// Чтобы определить this, необходимо ответить на вопрос: 
// Где ВЫЗЫВАЕТСЯ функция, а не где она ОПРЕДЕЛЕНА?

/***********------------1--------------*************/

var sayName = function(name) {
    console.log("Hello, ", name);
}

// Мы не знаем, что такое this, пока не будет вызвана функция 
sayName("BAZYR");

/***********------------2--------------*************/

// Неявное связывание - this - это то, что слева при вызове функции.

var me = {
    name: "Farida",
    age: 90,
    sayName: function() {
        console.log(this.name);
    }
};

// this - это me 
me.sayName();

// Другой пример - интересная техника - если передать объект, то примесь добавит новый атрибут-свойство
var sayNameMixin = function(obj) {
    obj.sayName = function() {
        console.log(this.name);
    }
}

var you = {
    name: "Dilshot",
    age: 5
}

var they = {
    name: "Ms Murkul",
    age: 40
}

sayNameMixin(you);
sayNameMixin(they);

// this - это you и they соответственно
you.sayName();
they.sayName();

// другой пример 

var Person = function(name, age) {
    return {
        name: name,
        age: age,
        sayName: function() {
            console.log(this.name);
        },
        mother: {
            name: "Stacey",
            sayName: function() {
                console.log(this.name);
            }
        }
    };
};

var jim = Person("Jim", 42);
jim.sayName();
jim.mother.sayName();

// Осознать - примеров хватит, чтобы вспомнить и осознать, что такое this 

/***********------------3--------------*************/
// Явное связывание при помощи call, apply, bind 

var stacey = {
    name: "Stacey",
    age: 34,
    sayName: function() {
        console.log("My name is " + this.name);
    }
}

stacey.sayName();

var sayNameOuter = function() {
    console.log("My name is " + this.name);
}

// Привязывает контекст к выполнению функции, this это stacey 
sayNameOuter.call(stacey);

var languages = ["C", "C++"];

var sayNameOuterWithParams = function(lang1, lang2) {
    console.log(`My name is ${this.name} and i'm noob in ${lang1} and ${lang2}.`);
}

sayNameOuterWithParams.call(stacey, languages[0], languages[1]);

// Отличие в том, что параметры можно передать массивом, как будто передаешь arguments 
sayNameOuterWithParams.apply(stacey, languages);

// Отличие в том, что возвращает функцию, которую можно вызвать позже
var newFunction = sayNameOuterWithParams.bind(stacey, languages[0], languages[1]);
newFunction();

/***********------------4--------------*************/
// Связывание через new 

var Animal = function(color, name, type) {
    this.color = color;
    this.name = name;
    this.type = type;
};

// Если создавать через new, то создается пустой объект this 
var zebra = new Animal("black and white", "Dorzhik", "Zebra");

/***********------------5--------------*************/
// Связывание через window 

var sayAge = function() { 
    console.log(this.age);
};

var me = {
    age: 25
};

// this - это window 
sayAge();

window.age = 33;
sayAge();

var sayAgeStrict = function() { 
    "use strict";
    console.log(this.age);
};

// use strict ругается на отсутствии свойства у this 
sayAgeStrict();