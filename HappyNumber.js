'use strict';

const arrayInt = (number) => {
    let arr = [];
    for (let num = number; num > 0; num /= 10, num = Math.floor(num)) {
        arr.unshift(num % 10);
    }
    return arr;
};

const checkTheNumber = (number, iteration) => {
    if (iteration !== 0) {
        let arr = arrayInt(number);
        number = arr.reduce(
            (sum, n) => sum + n * n, 0
        );
        if (number === 1) {
            return true;
        } else {
           return checkTheNumber(number, iteration - 1);
    }
    } else {
        return false;
    }
};

const isHappyNumber = (number) => {
    return checkTheNumber(number, 100);
};

let number = 19;

if (isHappyNumber(number)) {
    console.log(`The ${number} is a HappyNumber`);
} else {
    console.log(`The ${number} is not a HappyNumber`);
}