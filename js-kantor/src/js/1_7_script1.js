/*
    perform_bit_operation 
    Выполняет заданный битовый оператор, логируя все промежуточные результаты в консоль
    :param: a - первый операнд (number)
    :param: b - второй операнд (number)
    :param: operation - операция (string)
*/
function perform_bit_operation(a, b, operation) {
    "use strict";

    if (operation === "~") 
        console.log(`Выполняется операция: ~${a}`);
    else
        console.log(`Выполняется операция: ${a} ${operation} ${b}`);

    console.log(`Первый операнд в двоичном виде: ${a.toString(2)}`);
    if (operation !== "~" && b)
        console.log(`Второй операнд в двоичном виде: ${b.toString(2)}`);

    let result;
    switch (operation) {
        case "&":
            result = a & b;
            break;
        case "|":
            result = a | b;
            break;
        case "^":
            result = a ^ b;
            break;
        case "~":
            result = ~a;
            break;
        case "<<":
            result = a << b;
            break;
        case ">>":
            result = a >> b;
            break;
        case ">>>":
            result = a >>> b;
            break;
        default: 
            throw new Error(`Wrong operation: ${operation}`);
    }

    console.log(`Результат в двоичном виде: ${result.toString(2)}`);
    console.log(`Итоговый результат: ${result}`)

    return result;
}

/*
    Проверка на целое число
*/
function isInteger(num) {
    return num - (num ^ 0) === 0;
}