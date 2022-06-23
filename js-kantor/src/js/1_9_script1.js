function task2() {
    let result = prompt("Кто мы?");
    let div = document.getElementById("TASK2");
    div.innerText = (result == "Вкусовые сосочки") ? "Хотим чистую линию!" : "Ты в пиве!";
}

function task3() {
    let result = prompt("Введи чиселку, браток!");
    (result > 0) ? alert(1) : 
        (result < 0) ? alert(-1) :
        (result == 0) ? alert(0) : alert("Ты ввел какую-то дичь!");
}