"use strict";

describe("pow", function() {

    describe("возводит x в степень n", function() {

        for (let x = 1; x <= 5; x++) {
            makeTest(x);
        }

        function makeTest(x){
            const expected = x * x * x;
            it(`при возведении ${x} в степень 3 результат: ${expected}`, function() {
                assert.equal(pow(x, 3), expected);
            });
        }

    });

    describe("расширение спецификации", function() {
        
        /*
            все вызовы assert позволяют дополнительным последним аргументом 
            указать строку с описанием ошибки, которое выводится 
            если assert не проходит
        */
        it("при возведении в отрицательную степень результат NaN", function() {
            assert(isNaN(pow(2, -1)), "pow(2, -1) не NaN");
        });

        it("при возведении в дробную степень результат NaN", function() {
            assert(isNaN(pow(2, 1.5)), "pow(2, 1.5) не NaN");
        });

    });

    describe("задача №2", function() {

        describe("любое число кроме 0 в 0 степени равно 1", function() {

            for (let i = 0; i <= 10; i++) {
                let random_number = getRandomNonZeroNumber();
                it(`число ${random_number} в 0 степени равно 1`, function() {
                    assert.equal(pow(random_number, 0), 1);
                });
            }

            function getRandomNonZeroNumber() {
                while (true) {
                    let result = Math.random();
                    if (result !== 0) {
                        return result;
                    }
                }
            }

        });

        it("0 в 0 степени дает NaN", function() {
            assert.isNaN(pow(0, 0));
        });

    });

});

describe("before/after; beforeEach/afterEach", function() {

    before(function() {console.log("Start of tests");});
    after(function() {console.log("End of tests");});

    beforeEach(function() {console.log("before each test");});
    afterEach(function() {console.log("after each test");});

    it("test 1", function() {console.log("test 1");});
    it("test 2", function() {console.log("test 2");});
});

describe("другие методы assert:", function() {

    it("assert(value), 1 is true", function() {
        assert(1, "1 есть true");
    });

    it("assert.equal(value1, value2), '1' == 1", function() {
        assert.equal("1", 1);
    });

    it("assert.strictEqual(value1, value2), 1 === 1", function() {
        assert.strictEqual(1, 1);
    });

    it("assert.notEqual 10 != 20", function() {
        assert.notEqual(10, 20);
    });

    it("assert.notStrictEqual '10' !== 10", function() {
        assert.notStrictEqual("10", 10);
    });

    it("assert.isTrue(value) true is true", function() {
        assert.isTrue(true);
    });

    it("assert.isFalse(value) false is false", function() {
        assert.isFalse(false);
    });

});
