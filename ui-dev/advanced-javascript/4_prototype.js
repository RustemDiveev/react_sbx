// Будет рассмотрено несколько паттернов создания объектов 

// 1 
// Самое простое

let animal = {};
animal.name = "Leo";
animal.energy = 10;

animal.eat = function(amount) {
    console.log(`${this.name} is eating`);
    this.energy += amount;
};

animal.sleep = function(length) {
    console.log(`${this.name} is sleeping`);
    this.energy += length;
};

animal.play = function(length) {
    console.log(`${this.name} is playing`);
    this.energy -= length;
};

// 2 
// Берем всю логику из п.1 и оборачиваем в функцию 
// Если хотим создавать много животных 

function Animal(name, energy) {
    let animal = {};
    animal.name = name;
    animal.energy = energy;
    
    // Эти методы пересоздаются в памяти каждый раз при создании нового животного
    // Они одинаковы для любого животного
    animal.eat = function(amount) {
        console.log(`${this.name} is eating`);
        this.energy += amount;
    };
    
    animal.sleep = function(length) {
        console.log(`${this.name} is sleeping`);
        this.energy += length;
    };
    
    animal.play = function(length) {
        console.log(`${this.name} is playing`);
        this.energy -= length;
    };    

    return animal;
}

var leo = Animal("Leo", 7);
const snoop = Animal("Snoop", 10);

// 3 
// Можно вынести общие для животных методы в отдельный объект 

var animalMethods = {
    eat (amount) {
        console.log(`${this.name} is eating`);
        this.energy += amount;
    },
    
    sleep (length) {
        console.log(`${this.name} is sleeping`);
        this.energy += length;
    },

    play (length) {
        console.log(`${this.name} is playing`);
        this.energy -= length;
    }    

    // Но если добавляется новый метод - его необходимо не забыть добавить в основную функцию
};

function Animal(name, energy) {
    let animal = {};
    animal.name = name;
    animal.energy = energy;

    animal.eat = animalMethods.eat;
    animal.sleep = animalMethods.sleep;
    animal.play = animalMethods.play;

    // Мы хотим чтобы Animal всегда ссылался на все методы в animalMethods

    return animal;
}

// 4 
// Справиться с проблемой выше - нам поможет Object.create()

const parent = {
    name: "Stacey",
    age: 35,
    heritage: "Irish"
};

// Хотмм, чтобы национальность наследовалась от родителя 
const child = Object.create(parent);
child.name = "Ryan";
child.age = 7;

console.log(child.name);
console.log(child.age);

console.log(child); // {name, age}
console.log(child.heritage); // сходи и посмотри в parent 

// 5 
// Решение 

var animalMethods = {
    eat (amount) {
        console.log(`${this.name} is eating`);
        this.energy += amount;
    },
    
    sleep (length) {
        console.log(`${this.name} is sleeping`);
        this.energy += length;
    },

    play (length) {
        console.log(`${this.name} is playing`);
        this.energy -= length;
    }    
};

function Animal(name, energy) {
    let animal = Object.create(animalMethods);
    animal.name = name;
    animal.energy = energy;

    return animal;
}

var leo = Animal("leo", 7);
leo.play(); // У объекта нет такого свойства, надо сходить в animalMethods

// 6 
// Так как паттерн из п.5 потенциально может применяться часто, то есть такая штука как Prototype 
// Прототип это свойство функции, указывающее на объект!

function imAFunction() {}
imAFunction.prototype


function Animal(name, energy) {
    let animal = Object.create(Animal.prototype);
    animal.name = name;
    animal.energy = energy;   

    return animal;
}

Animal.prototype.eat = function(amount) {
    console.log(`${this.name} is eating`);
    this.energy += amount;
};

Animal.prototype.sleep = function(length) {
    console.log(`${this.name} is sleeping`);
    this.energy += length;
};

Animal.prototype.play = function(length) {
    console.log(`${this.name} is playing`);
    this.energy -= length;
};

var leo = Animal("Leo", 7);
leo
leo.play(5)

// 7 
// Кажется, что должно быть более простое решение 

// В чем разница между 
var leo = Animal("Leo", 7);
var leo = new Animal("Leo", 7);

// Если использовать new, то Js неявно сделает следующее:
// let this = Object.create(<function_name>.prototype)
// return this;

function Animal(name, energy) {
    let animal = Object.create(Animal.prototype);
    animal.name = name;
    animal.energy = energy;   

    return animal;
}

Animal.prototype.eat = function(amount) {
    console.log(`${this.name} is eating`);
    this.energy += amount;
};

Animal.prototype.sleep = function(length) {
    console.log(`${this.name} is sleeping`);
    this.energy += length;
};

Animal.prototype.play = function(length) {
    console.log(`${this.name} is playing`);
    this.energy -= length;
};

// 
function AnimalWithNew(name, energy) {
    this.name = name;
    this.energy = energy;
}

AnimalWithNew.prototype.eat = function(amount) {
    console.log(`${this.name} is eating`);
    this.energy += amount;
};

AnimalWithNew.prototype.sleep = function(length) {
    console.log(`${this.name} is sleeping`);
    this.energy += length;
};

AnimalWithNew.prototype.play = function(length) {
    console.log(`${this.name} is playing`);
    this.energy -= length;
};

var vita = Animal("Vita", 12);
var vitaWithNew = new AnimalWithNew("Vita", 12);

// Разницы не будет 
vita 
vitaWithNew 
vita.play(2);
vitaWithNew.play(2);

// 8 
// AnimalWithNew - это типа класс, в EcmaScript6 появился синтаксический сахар над функциями - классы 
class Animal {
    constructor(name, energy) {
        this.name = name;
        this.energy = energy;
    }
    eat(amount) {
        console.log(`${this.name} is eating`);
        this.energy += amount;
    }
    sleep(length) {
        console.log(`${this.name} is sleeping`);
        this.energy += length;
    }
    play(length) {
        console.log(`${this.name} is playing`);
        this.energy -= length;
    }
}

var leo = new Animal("Leo", 7);

// 9 
// Фичи Prototype

var friends = [];
// Это синтаксический сахар над 
var friends = new Array();
// Все встроенные методы массива живут в прототипе 
Array.prototype 

// 10 
class Animal {
    constructor(name, energy) {
        this.name = name;
        this.energy = energy;
    }
    eat(amount) {
        console.log(`${this.name} is eating`);
        this.energy += amount;
    }
    sleep(length) {
        console.log(`${this.name} is sleeping`);
        this.energy += length;
    }
    play(length) {
        console.log(`${this.name} is playing`);
        this.energy -= length;
    }
}

var leo = new Animal("Leo", 7);
var prototype = Object.getPrototypeOf(leo);
prototype;

prototype === Animal.prototype;

// Пробежаться по всем ключам 
// Для класса выведет только то, что в конструкторе 
// Для функции (withNew) - выведет все 
for (let key in leo) {
    console.log(`Key: ${key}, Value: ${leo[key]}`);
}

// Проверка - прнадлежит ли свойство прототипу, или оно собственное 
leo.hasOwnProperty("name");
leo.hasOwnProperty("play");

// Этот метод есть в прототипе объекта 
Object.prototype 

// Является ли объект экземпляром класса 
function User() {};

leo instanceof Animal
leo instanceof User

// 11 
// У стрелочных функций нет своего this 
// Если попытаться вызвать с new - то выбросит ошибку 
const Animal = () => {};

const leo = new Animal(); // TypeError 

// Ну, и у них нет прототипа - прямое следствие 
Animal.prototype // undefined

