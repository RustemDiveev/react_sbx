"use strict";

function for_loop_even_numbers(a, b) {
    // вывод четных чисел от a до b 
    let result = [];

    for (let i = a; i <= b; i++) {
        if (!(i % 2)) {
            result.push(i);
        }
    }

    let div = document.getElementById("FOR_LOOP_EVEN_NUMBERS");
    div.textContent = result.join(", ");
}

function loop_until_prompt_is_correct() {
    // просит prompt пока не введешь число больше 100 или не уйдешь 
    let result;
    while(true) {
        result = prompt("Enter number greater than 100, boyz!");
        if ((result > 100) || (result === null)) break;
    }
}

function print_prime_numbers(a, b) {
    debugger;

    function is_prime(x) {
        // Возвращает true если число простое, и наоборот 
        let divider = x;
        while (divider > 1) {

            if ((x % divider == 0) && (x != divider)) {
                return false
            } else {
                divider--;
            }

        }
        return true;
    }

    // вывести простые числа от a до b 
    // здесь побыдловски 
    let prime_numbers = [];
    for (let i = a; i <= b; i++) {
        if (is_prime(i))
            prime_numbers.push(i);
    }

    let div = document.getElementById("PRINT_PRIME_NUMBERS");
    div.textContent = prime_numbers.join(", ");
}
