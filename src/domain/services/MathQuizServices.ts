import { Question } from '../types';

export const generateRandomAddition = (): Question => {
    const id = Math.floor(Math.random() * 1000);
    const number1: number = Math.floor(Math.random() * 100);
    const number2: number = Math.floor(Math.random() * 100);
    const label: string = `Quelle est le résultat de ${number1} + ${number2} ?`;
    const answer: string = (number1 + number2).toString();

    return { id, label, correctAnswer: answer };
};

export const generateRandomSubstraction = (): Question => {
    const id = Math.floor(Math.random() * 1000);
    const number1: number = Math.floor(Math.random() * 100);
    const number2: number = Math.floor(Math.random() * 100);
    let label: string;
    let answer: string;

    if (number1 < number2) {
        label = `Quelle est le résultat de ${number2} - ${number1} ?`;
        answer = (number2 - number1).toString();
    } else {
        label = `Quelle est le résultat de ${number1} - ${number2} ?`;
        answer = (number1 - number2).toString();
    }

    return { id, label, correctAnswer: answer };
};

export const generateRandomMultiplication = (): Question => {
    const id = Math.floor(Math.random() * 1000);
    const number1: number = Math.floor(Math.random() * 10);
    const number2: number = Math.floor(Math.random() * 10);
    const label: string = `Quelle est le résultat de ${number1} x ${number2} ?`;
    const answer: string = (number1 * number2).toString();

    return { id, label, correctAnswer: answer };
};

export const generateRandomCalculation = (): Question => {
    const id = Math.floor(Math.random() * 1000);
    const type: number = Math.floor(Math.random() * 3);
    let question: Question;

    switch (type) {
        case 0:
            question = generateRandomAddition();
            break;
        case 1:
            question = generateRandomSubstraction();
            break;
        case 2:
            question = generateRandomMultiplication();
            break;
        default:
            question = generateRandomAddition();
            break;
    }

    return question;
};
