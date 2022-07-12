"use strict";

function _min(a, b) {
    return (a < b) ? a : b;
}

function min() {
    let a = document.getElementById("A_INPUT").value;
    let b = document.getElementById("B_INPUT").value;

    if (isNaN(+a) || isNaN(+b)) {
        throw "Bad parameters: should be numeric!";
    }

    let min = _min(a, b);

    document.getElementById("MIN_SOLUTION").innerText = min;
}

function _pow(x, n) {
    let result = 1;

    for (let i = 0; i < n; i++) {
        result *= x;
    }

    return result;
}

function pow() {
    let x = document.getElementById("X_INPUT").value;
    let n = document.getElementById("N_INPUT").value;

    if (isNaN(+x) || isNaN(+n)) {
        throw "Bad parameters: should be numeric!";
    }

    let pow = _pow(x, n);

    document.getElementById("POW_SOLUTION").innerText = pow;
}