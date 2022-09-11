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

/*
<div>
  <label>Введите имя пользователя</label>
  <input type="text" id="USERNAME">
  <button onclick="getUserInfo()">Получить информацию</button>
</div>

<div id="USER"></div>
<div id="POSTS_CNT"></div>
<div id="COMMENTS_CNT"></div>
*/


function getUserInfo() {
  
    const username = $("#USERNAME").val();
    
    if (username === "") { 
      alert("Пользователь не указан");
      return;
    }
    
    $.getJSON(
      `https://jsonplaceholder.typicode.com/users?username=${username}`
    ).done(
      data => {
        
        if (data.length == 0) {
          $("#USER").text(`Пользователь с именем ${username} не найден.`);
        }
        
        if (data.length > 1) {
          $("#USER").text(`Найдено более одного пользователя с ${username}. Типа неправильные данные.`)
        }
        
        const userId = data[0].id;
        const name = data[0].name;
        
        $("#USER").text(`Пользователь имеет идентификатор ${userId} и его зовут ${name}`);
        
        $.getJSON(
          `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
        ).done(
          data => {
            
            $("#POSTS_CNT").text(`У пользователя ${data.length} постов.`);
            const postIds = data.map(post => post.id);
            
            let commentsCount = 0;
            
            postIds.map(
              postId => {
                $.getJSON(
                  `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
                ).done(
                  data => {
                    commentsCount += data.length;
                    $("#COMMENTS_CNT").text(`У постов пользователя ${commentsCount} комментариев.`); 
                  }
                );
              }
            );
            
          }
        ).fail(
          () => console.log("Error while fetching user posts")
        ); 
         
      }
    ).fail(
      () => console.log("Error while fetching user information")
    );
    
  }


// Part 2 
// Разбили на функции - воспринимать немного проще, хоть разбивка неидеальная 

prepareHTML();

function getUserInfo() {
    const username = $("#USERNAME").val();
    
    if (username === "") { 
      alert("Пользователь не указан");
      return;
    }

    getUserId(username, onUserSuccess);
}

function getUserId(username, onSuccess) {
    const URL = `https://jsonplaceholder.typicode.com/users?username=${username}`;
    $.getJSON(URL)
      .done(data => onSuccess(data, username))
      .fail(() => console.log("Error while fetching user data"));
}

function onUserSuccess(data, username) {
    if (data.length === 0) {
        $("#USER").text(`Пользователь с именем ${username} не найден.`);
    }
    
    if (data.length > 1) {
        $("#USER").text(`Найдено более одного пользователя с ${username}. Типа неправильные данные.`)
    }
    
    if (data.length === 1) {
        const userId = data[0].id;
        const name = data[0].name;
        $("#USER").text(`Пользователь имеет идентификатор ${userId} и его зовут ${name}`);
        getUserPostCnt(userId, onPostSuccess);
    }
}

function getUserPostCnt(userId, onSuccess) {
  $.getJSON(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
  ).done(onSuccess).fail(() => console.log("Error while fetching user comments"));
}

function onPostSuccess(data) {
  $("#POSTS_CNT").text(`У пользователя ${data.length} постов`);
  
  let comment_cnt = 0;
  
  data.map(post => {
    $.getJSON(
      `https://jsonplaceholder.typicode.com/comments?postId=${post.id}`
    ).done(
      data => {
        comment_cnt += data.length;
        $("#COMMENTS_CNT").text(`У всех постов пользователя ${comment_cnt} комментариев`)
      }
    ).fail(
      () => console.log("Error while fetching comments")
    )
  });
}

function prepareHTML() {
    let div = document.createElement("div");
    div.innerHTML = 
    `
    <div>
    <label>Введите имя пользователя</label>
    <input type="text" id="USERNAME">
    <button onclick="getUserInfo()">Получить информацию</button>
    </div>

    <div id="USER"></div>
    <div id="POSTS_CNT"></div>
    <div id="COMMENTS_CNT"></div>
    `;

    document.body.appendChild(div);
}; 

// 5 
/*
  Одна из проблем callback-функций - инверсия контроля 
  Еще есть ад из коллбэков - который заставляет думать непоследовательно
*/

function criticalFunction () {};

// У нас теряется контроль при использовании сторонних библиотек 
// Мы не можем гарантировать, что функция вызовется с правильными аргументами 
thirdPartyLibrary(criticalFunction);

// 6 
/*
  Промисы - можно сравнить с ресторанными пейджерами 
  Отсутствует инверсия контроля 
  Есть три состояния: 
    1. pending    - по умолчанию, начальное состояние, запрос не обработан 
    2. fulfilled  - запрос обработан 
    3. rejected   - ошибка 
*/

/*
  1. Как создается promise?
  2. Как изменить статус promise?
  3. Как отслеживать изменение статуса promise?
*/

const promise = new Promise((resolve, reject) => {
  /*
  resolve(); // fulfillled 
  reject(); // rejected 
  */
});

console.log(promise);

function onSuccess() {
  console.log("Success");
}

function onError() {
  console.log("Error");
}

let promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve()
  }, 2000);
});

promise2.then(onSuccess);

promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject()
  }, 2000);
});

promise2.catch(onError);

// 7 - переписать на промисы 

function getUserInfo() {
  
  const username = $("#USERNAME").val();
  
  const userPromise = getUser(username);
  
  userPromise.then(
    (user) => {
      if (user.length === 1) {
        $("#USER").text(`Пользователя зовут ${user[0].name} и его идентификатор ${user[0].id}`);
        
        const postPromise = getPostCnt(user[0].id);
        
        postPromise.then(
          (posts) => {
            $("#POSTS_CNT").text(`У пользователя ${posts.length} постов`);
            let comment_count = 0;
            
            posts.map(post => {
              const commentPromise = getComments(post.id);
              
              commentPromise.then(
                (comments) => {
                  comment_count += comments.length;
                  $("#COMMENTS_CNT").text(`У постов пользователя ${comment_count} комментариев`);
                }
              );
              
              commentPromise.catch(
                () => console.log("Error while fetching comments")
              );
              
            });
          }
        );
        
        postPromise.catch(() => console.log("Error while fetching posts"));  
        
      } else {
        $("#USER").text(`Пользователь ${username} не найден`);
      }
    }
  ); 
  
  userPromise.catch(() => console.log("Error while fetching user info")); 
  
}

function getUser(name) {  
  return new Promise((resolve, reject) => { 
    $.getJSON(
      `https://jsonplaceholder.typicode.com/users?username=${name}`
    ).done(resolve).fail(reject);  
  }); 
}

function getPostCnt(userId) {
  return new Promise((resolve, reject) => {
    $.getJSON(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    ).done(resolve).fail(reject);
  });
}

function getComments(postId) {
  return new Promise((resolve, reject) => {
    $.getJSON(
      `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    ).done(resolve).fail(reject);
  });
}

prepareHTML();

function prepareHTML() {
  let div = document.createElement("div");
  div.innerHTML = 
  `
  <div>
  <label>Введите имя пользователя</label>
  <input type="text" id="USERNAME">
  <button onclick="getUserInfo()">Получить информацию</button>
  </div>

  <div id="USER"></div>
  <div id="POSTS_CNT"></div>
  <div id="COMMENTS_CNT"></div>
  `;

  document.body.appendChild(div);
}; 

// 8 
// Убеждение в том, что промисы лучше коллбэков 

function getPromise() {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
}

function logA() {
  console.log("A");
}

function logB() {
  console.log("B");
}

function logCAndThrow() {
  console.log("C");

  throw new Error();
}

function catchError() {
  console.log("Error!");
}

// можно чейнить
getPromise()
  .then(logA)
  .then(logB)
  .then(logCAndThrow)
  .catch(catchError);

// 9 
// пример использования с fetch 
fetch("https://jsonplaceholder.typicode.com/users")
  .then(response => response.json())
  .then(
    users => {
      users.map(user => console.log(user));
    }
  );


// 10 
// переписать использование промисов на цепочки 

prepareHTML();

function getUserInfo() {
  const username = $("#USERNAME").val();
  
  getUser(username)
    .then(
      (users) => {
        if (users.length === 1) {
          $("#USER").text(`Пользователь имеет идентификатор ${users[0].id} и его зовут ${users[0].name}`);
        } else {
          $("#USER").text(`Пользователь ${username} не найден`);
        }

        return users[0].id;
      }
    ).then(
      (userId) => {
        return getPostCnt(userId);
      }
    ).then(
      (posts) => {
        $("#POSTS_CNT").text(`У пользователя ${posts.length} постов`);
        const postIds = posts.map(post => post.id);
        return postIds;
      }
    ).then(
      (postIds) => {
        return Promise.all(postIds.map(postId => getComments(postId)));
      }
    ).then(
      (comments) => {
        const comment_count = comments
          .map(comments => comments.length)
          .reduce((prevValue, currentValue) => prevValue + currentValue);
        $("#COMMENTS_CNT").text(`У пользователя ${comment_count} комментариев под постами`);
      }
    );
  
}

function prepareHTML() {
  let div = document.createElement("div");
  div.innerHTML = 
  `
  <div>
  <label>Введите имя пользователя</label>
  <input type="text" id="USERNAME">
  <button onclick="getUserInfo()">Получить информацию</button>
  </div>

  <div id="USER"></div>
  <div id="POSTS_CNT"></div>
  <div id="COMMENTS_CNT"></div>
  `;

  document.body.appendChild(div);
}; 

function getUser(name) {  
  return new Promise((resolve, reject) => { 
    $.getJSON(`https://jsonplaceholder.typicode.com/users?username=${name}`)
      .done(resolve)
      .fail(reject);   
  }); 
}

function getPostCnt(userId) {
  return new Promise((resolve, reject) => {
    $.getJSON(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    ).done(resolve).fail(reject);
  });
}

function getComments(postId) {
  return new Promise((resolve, reject) => {
    $.getJSON(
      `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    ).done(resolve).fail(reject);
  });
}

// 11
// async / await 

async function getPromise() {}

// Функция async всегда возвращает promise
const another_promise = getPromise();

async function add (x, y) {
  return x + y;
}

add(2, 3).then(result => console.log(result));

// 12 
// Переписать на async / await 


prepareHTML();

async function getUserInfo() {
  const username = $("#USERNAME").val();
  const user = await getUser(username);
  
  if (user.length === 1)  {
    const userId = user[0].id;
    const name = user[0].name;
    
    $("#USER").text(`У пользователя идентификатор ${userId} и его зовут ${name}`);
    
    const posts = await getPosts(userId);
    const postIds = posts.map(post => post.id);
    
    $("#POSTS_CNT").text(`У пользователя ${posts.length} постов`);
    
    let comments_count = 0;
    for (let i = 0; i < postIds.length; i++) {
      let comments = await getComments(postIds[i]);
      comments_count += comments.length;
    }
    
    $("#COMMENTS_CNT").text(`У постов пользователя ${comments_count} комментариев`);

  } else {
    $("#USER").text(`Пользователь ${username} не найден`); 
  }
  
}

function getUser(username) {
  return new Promise((resolve, reject) => {
    $.getJSON(
      `https://jsonplaceholder.typicode.com/users?username=${username}`
    ).done(resolve).fail(reject);
  });
}

function getPosts(userId) {
  return new Promise((resolve, reject) => {
     $.getJSON(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
     ).done(resolve).fail(reject);
  });
}

function getComments(postId) {
  return new Promise((resolve, reject) => {
     $.getJSON(
      `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
     ).done(resolve).fail(reject);
  });
}

function prepareHTML() {
  let div = document.createElement("div");
  div.innerHTML = 
  `
  <div>
  <label>Введите имя пользователя</label>
  <input type="text" id="USERNAME">
  <button onclick="getUserInfo()">Получить информацию</button>
  </div>

  <div id="USER"></div>
  <div id="POSTS_CNT"></div>
  <div id="COMMENTS_CNT"></div>
  `;

  document.body.appendChild(div);
}; 


