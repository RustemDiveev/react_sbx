"use strict";

// Подсчет суммы через цикл 
function sum_loop(n) {
    sum = 0;
    for (let i = 1; i < n + 1; i++) {
        sum += i;
    }
    return sum;
}

// Подсчет суммы через рекурсию
function sum_recursion(n) {
    if (n != 0) {
        return n + sum_recursion(n - 1)
    } else {
        return n;
    }
}

// Подсчет суммы через формулу арифметической прогрессии
function sum_formula(n) {
    return n * (1 + n) / 2
}