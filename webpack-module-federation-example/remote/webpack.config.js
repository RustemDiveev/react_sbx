// Подключение модуля path для работы c путями в файловой системе 
const path = require("path");
const webpack = require("webpack");

// Плагины webpack-а 

// Сам добавляет нужные скрипты в html 
// https://webpack.js.org/plugins/html-webpack-plugin/
const HtmlWebpackPlugin = require("html-webpack-plugin");

// Позволяет не писать импорт одних и тех же модулей в каждом файле 
// https://webpack.js.org/plugins/provide-plugin/



// module.exports - говорит, что будет экспортировано в модуле 
/*
    Описание объекта: 
    entry - путь к главному файлу с исходным кодом проекта 
    mode - тип окружения для компиляции (например, окружение разработки - development)
    output - ?
    devServer - настройки сервера разработки 
        port - порт, который будет прослушивать сервер 

*/
module.exports = {
    entry: "./src/index.js",
    mode: "development",
    output: {
        filename: "./main.js"
    },
    devServer: {
        static: path.join(__dirname, "dist"),
        compress: true,
        port: 3011,
        client: {
            progress: true
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|mjs|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ["file-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Приложение Remote",
            filename: "index.html",
            div: "root",
            template: "src/index.html"
        }),
        new webpack.ProvidePlugin({
            "React": "react"
        })
    ]
};
