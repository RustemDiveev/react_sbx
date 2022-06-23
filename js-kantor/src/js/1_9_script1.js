function task2() {
    const result = prompt("Кто мы?");
    const div = document.getElementById("TASK2");
    div.innerText = (result == "Вкусовые сосочки") ? "Хотим чистую линию!" : "Ты в пиве!";
}

function task3() {
    const result = prompt("Введи чиселку, браток!");
    (result > 0) ? alert(1) : 
        (result < 0) ? alert(-1) :
        (result == 0) ? alert(0) : alert("Ты ввел какую-то дичь!");
}

function task4() {
    function ask_password() {
        const result = prompt("Your password, sir?");
        (result === "Black Lord") ? alert("Welcome") : 
            (result === null) ? alert("Auth was cancelled") : alert("No entry!");
    }

    const result = prompt("Your login, sir?", );
    (result === "Admin") ? ask_password() : 
        (result === null) ? alert("Auth was cancelled") : alert("Who are you?");
}