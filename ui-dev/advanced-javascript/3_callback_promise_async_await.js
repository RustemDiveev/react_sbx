// 1 
// Концепт функций 

// Функция - это физическая машина 
// Это - машина добавления 
function add(x, y) {
    return x + y;
}

add(3, 5);

// Можно создавать ссылки на функцию 
const me = add;
me(4, 5);

const you = add;
you(1, 2);

// Их можно создавать сколько угодно 

// Функция высшего порядка
// а addReference - это callback-функция
function addFive(x, addReference) {
    return addReference(5, x);
}

addFive(10, add);

// 2 
// Самые распространненые функции высшего порядка 

[1, 2, 3].map((i) => i + 5);

[1, 2, 3, 4].filter((i) => i % 2 === 0);

// Не самый удачный пример
// $("#btn").on("click", () => console.log("Callbacks are everywhere"));

setTimeout(
    () => console.log("Hello, kitty!"),
    2000
);

// 3 

/*
    Здесь песочница для работы с REST API 
    Через консоль браузера гарантированно выполняется это:
    https://jsonplaceholder.typicode.com

    Не смог обратиться через консоль как к api github-а, 
    так и к api с покемонами 

    Примеры выполнять здесь:
    https://codesandbox.io/
*/

// В курсе какой-то кривой синтаксис $.getJSON
// https://api.jquery.com/jquery.getjson/
/*
    $.getJSON({
        url: "https://jsonplaceholder.typicode.com/users?username=Bret",
        success: updateUI,
        error: showError
    });
*/

// У меня получились следующие рабочие примеры 

$.getJSON(
    "https://jsonplaceholder.typicode.com/users?username=Bret",
    (response) => console.log(response)
);
  
$.ajax({
    url: "https://jsonplaceholder.typicode.com/users?username=Bret",
    success: (response) => console.log(response)
});
  
// 4 
// Задача - на код курса можно не ориентироваться 
/*
    Обратиться к пользователю и посчитать его количество постов и комментариев на его постах
    Написать на коллбэках аякса
    Выполнять тут - здесь есть jquery: https://codesandbox.io/
*/

// Эти блоки не трогать - они рабочие
$.getJSON("https://jsonplaceholder.typicode.com/users?username=Bret")
    .done(data => console.log(data))
    .fail(() => console.log("Error in fetching user data"));


$.getJSON("https://jsonplaceholder.typicode.com/users?username=Bret")
    .done(data => $.getJSON(`https://jsonplaceholder.typicode.com/posts?username=${data[0].id}`)
        .done(data => console.log(data))
        .fail(() => console.log("Error in fetching user posts"))
    )
    .fail(() => console.log("Error in fetching user data"));

$.getJSON("https://jsonplaceholder.typicode.com/users?username=Bret")
    .done(data => $.getJSON(`https://jsonplaceholder.typicode.com/posts?username=${data[0].id}`)
        .done(
            data => data.map(
                (elem) => $.getJSON(`https://jsonplaceholder.typicode.com/comments?postId=${elem.id}`)
                    .done((data) => console.log(data))
                    .fail(() => console.log("Error in fetching comments to user posts"))
            )
        )
        .fail(() => console.log("Error in fetching user posts"))
    )
    .fail(() => console.log("Error in fetching user data"));

/*
    Здесь делаем следующее: 
    На HTML есть три элемента: USER, POSTS_CNT, COMMENT_SCNT
    В первом выводим - идентификатор и имя пользователя 
    Во втором выводим количество постов 
    В третьем выводим количество комментариев 
*/
