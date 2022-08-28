describe("Property - str.length", function() {

    it("у строки есть свойство length, содержащее длину", function() {
        assert.equal("Itadakimas".length, 10);
    });

    it("можно записать строку в переменную и запросить её свойство", function() {
        const str="Ramen";
        assert.equal(str.length, 5);
    });

});

describe("Method - str.toUpperCase()", function() {

    const str="Something!";

    it("возвращает строку в верхнем регистре", function() {
        assert.equal(str.toUpperCase(), "SOMETHING!");
    });

    it("необходимо обращаться к методу через скобки", function() {
        assert.equal(
            typeof(str.toUpperCase), 
            "function"
        );
        assert.equal(
            typeof(str.toUpperCase()), 
            "string"
        );
    });

});

describe("Method - num.toFixed(n) - округляет число num до n знаков после запятой, " + 
    "при необходимости добавляет нули до данной длины и возвращает в виде строки", function() {
    
    const n = 12.345;

    it("округление до двух знаков после запятой", function() {
        assert.equal(n.toFixed(2), "12.35");
    });

    it("округление до нуля знаков после запятой", function() {
        assert.equal(n.toFixed(0), "12");
    });

    it("округление до пяти знаков после запятой", function() {
        assert.equal(n.toFixed(5), "12.34500");
    });

    it("к методу числа можно обратиться напрямую", function() {
        assert.equal(12.34.toFixed(1), "12.3");
    });

    it("но если число целое - то будет проблема, нужно указать дополнительную точку", function() {
        assert.equal(12..toFixed(4), "12.0000");
    });

});