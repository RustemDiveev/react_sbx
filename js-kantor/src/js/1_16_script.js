"use strict";

// Подсчет суммы через цикл 
function sum_loop(n) {
    let sum = 0;
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

function sum() {

    let n = +document.getElementById("SUM_INPUT").value;
    if (isNaN(n) || !Number.isInteger(n) || !n) {
        throw "Input value should be an integer."
    }

    let start_time, end_time, result;

    start_time = performance.now()
    result = sum_loop(n);
    end_time = performance.now();
    document.getElementById("SUM_LOOP_RESULT").innerText = `Результат: ${result}`;
    document.getElementById("SUM_LOOP_ELAPSED_TIME").innerText = `Затраченное время в милисекундах: ${end_time - start_time}`;

    start_time = performance.now()
    result = sum_recursion(n);
    end_time = performance.now();
    document.getElementById("SUM_RECURSION_RESULT").innerText = `Результат: ${result}`;
    document.getElementById("SUM_RECURSION_ELAPSED_TIME").innerText = `Затраченное время в милисекундах: ${end_time - start_time}`;

    start_time = performance.now()
    result = sum_formula(n);
    end_time = performance.now();
    document.getElementById("SUM_FORMULA_RESULT").innerText = `Результат: ${result}`;
    document.getElementById("SUM_FORMULA_ELAPSED_TIME").innerText = `Затраченное время в милисекундах: ${end_time - start_time}`;
}

function factorial_recursive(n) {
    if (n != 1) {
        return n * factorial_recursive(n - 1);
    } else {
        return n;
    }
}

function factorial() {
    let n = +document.getElementById("FACTORIAL_INPUT").value;
    if (isNaN(n) || !Number.isInteger(n) || !n) {
        throw "Input value should be an integer."
    }
    let result = factorial_recursive(n);
    document.getElementById("FACTORIAL_RESULT").innerText = `Результат: ${result}`;
}

function fibonnaci_recursive(n) {
    if (n === 1) {
        return 1;
    } else if (n === 2) {
        return fibonnaci_recursive(1) + fibonnaci_recursive(1);
    } else {
        return fibonnaci_recursive(n - 1) + fibonnaci_recursive(n - 2)
    }
}

function fibonnaci() {
    let n = +document.getElementById("FIBONNACI_INPUT").value;
    if (isNaN(n) || !Number.isInteger(n) || !n) {
        throw "Input value should be an integer."
    }

    let result = fibonnaci_recursive(n);
    document.getElementById("FIBONNACI_RESULT").innerText = `Результат: ${result}`;
}