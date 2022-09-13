Цель данной ветки - развернуть самостоятельно webpack и babel для того, чтобы работать на react 

В качестве основы берутся действия, взятые из этой статьи: 
https://habr.com/ru/company/ruvds/blog/436886/

Здесь же будет лог действий, для того, чтобы вспомнить как это делается: 

Для того чтобы настроить проект React-приложения, нам понадобятся следующие npm-модули.

react — библиотека React.
react-dom — библиотека, которая поможет нам использовать возможности React в браузере.
babel/core — транспиляция JSX в JS.
babel/preset-env — создание кода, подходящего для старых браузеров.
babel/preset-react — настройка транспилятора для работы с React-кодом.
babel-loader — настройка Webpack для работы с Babel.
css-loader — настройка Webpack для работы с CSS.
webpack — сборка модулей.
webpack-cli — работа с Webpack из командной строки.
style-loader — загрузка всего используемого CSS-кода в заголовке HTML-файла.
webpack-dev-server — настройка сервера разработки.

ну нафиг - не пользуйтесь
npm init 

npm install react 
npm install react-dom
npm install @babel/core
npm install @babel/preset-env
npm install @babel/preset-react
npm install babel-loader
npm install css-loader
npm install webpack
npm install webpack-cli
npm install style-loader
npm install webpack-dev-server

Накачало 45 мегов библиотек 
