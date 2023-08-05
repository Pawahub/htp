'use strict';

const person = {
    address: 'Grodno',
    firstName: 'Ivan',
    lastName: 'Ivanov',
    age: 30,
    weight: 100,
};

const PersonSchema = {
    address: 'string',
    firstName: 'string',
    lastName: 'string',
    age: 'number',
    weight: 'number',
};

let result = false;

const validateBySchema = (hash, schema) => {

    let schemaKeys = Object.keys(schema),
        hashKeys = Object.keys(hash),
        schemaItems = Object.values(schema),
        hashItems = Object.values(hash),
        typeOfItems = hashItems.map(item => typeof item);

    const validateData = {
        missingKeys: schemaKeys.filter(key => !(hashKeys.includes(key))),
        extraKeys: hashKeys.filter(key => !(schemaKeys.includes(key))),
        wrongItems: [],
    };

    const reducer = (accumulator, currentValue) => accumulator && currentValue;

    const zip = (a, b) => {
        let arr = [];
        for (let item in a) arr.push([a[item], b[item]]);
        return arr;
    };

    let values = zip(typeOfItems, schemaItems).map(item => item[0] === item[1]);

    let isMatch = values.reduce(reducer);

    if (schemaKeys.length === hashKeys.length) result = 'qty';

    if (result && isMatch) return result = true;
    else {
        validateData.wrongItems = zip(hashKeys, values).filter(item => {
            if (item[1] === false) return item.splice(1, 1);
        });
        return validateData;
    }
};

const validate = (validateData) => {

    let message = '';

    if (result === true) return message = 'All values are correct. Hash match the schema.';
    else if (result !== 'qty') message = `Here even the number of fields does not match, but hash has:\n`;
    else message = 'This hash has:\n';

    for (let key in validateData) {
        if (validateData[key].length !== 0) {
            message = message + `  ${key}: ${validateData[key]}\n`;
        }
    }
    message = message + `Other fields match the schema.`;
    return message ;
};

console.log(validate(validateBySchema(person, PersonSchema)));