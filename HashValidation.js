'use strict';

const person = {
    address: 'Grodno',
    firstName: 'Ivan',
    lastName: 'Ivanov',
    age: 30,
    weight: 50,
};

const PersonSchema = {
    address: 'string',
    firstName: 'string',
    lastName: 'string',
    age: 'number',
    weight: 'number',
};

const validateBySchema = (hash, schema) => {

    let schemaKey = Object.keys(schema),
        hashKey = Object.keys(hash);

    const validateData = {
        status: false,
        extraKeys: [],
        missingKeys: [],
        correctValues: [],
        wrongValues: [],
    };

    if (schemaKey.length !== hashKey.length) validateData.status = 'wrongQty';

    for (let key in schema) {
        if (!hashKey.includes(key)) validateData.missingKeys.push(key);
    }

    for (let key in hash) {
        if (schemaKey.includes(key))
            if (typeof hash[key] !== schema[key]) validateData.wrongValues.push(key);
            else validateData.correctValues.push(key);
        else validateData.extraKeys.push(key);
    }

    if (validateData.correctValues.length === hashKey.length && hashKey.length === schemaKey.length) validateData.status = true;

    return validateData;
};

const result = (validateData) => {

    let message = '';

    if (validateData.status === true) return message = 'All values are correct. Hash match.';
    else if (validateData.status === 'wrongQty') message = `Here even the number of fields does not match, but hash has:\n`;
    else message = 'This hash has:\n';

    for (let key in validateData) {
        if (validateData[key].length !== 0 && key !== 'status') {
            message = message + `  ${key}: ${validateData[key]}\n`;
        }
    }
    return message;
};

let validate = validateBySchema(person, PersonSchema);

console.log(result(validate));