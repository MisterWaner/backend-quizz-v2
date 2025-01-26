import { QCMQuestion } from '../types';
import { shuffleArray } from '../../lib/helpers';
import {
    europeanCountries,
    Country,
    africanCountries,
    americanCountries,
    oceanicCountries,
    asianCountries,
} from '../../application/geographyData';

function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomCountry(array: Country[]): Country {
    const randomIndex = getRandomInt(0, array.length - 1);
    const selectedCountry = array[randomIndex];
    return selectedCountry;
}

export const generateEuropeanCapitalsQuestion = (): QCMQuestion => {
    const id = Math.floor(Math.random() * 1000);
    // select a random coutry from the list
    const selectedCountry = getRandomCountry(europeanCountries);

    // generate 3 wrong answers
    const wrongAnswers = new Set<string>();
    while (wrongAnswers.size < 3) {
        const randomIndex = getRandomInt(0, europeanCountries.length - 1);
        const randomCapital = europeanCountries[randomIndex].capital;
        if (randomCapital !== selectedCountry.capital) {
            wrongAnswers.add(randomCapital);
        }
    }

    //Mixes options (good + wrong) of the question
    const options = Array.from(wrongAnswers);
    options.push(selectedCountry.capital);
    shuffleArray(options);

    return {
        id,
        label: `Quelle est la capitale de ${selectedCountry.name} ?`,
        options,
        correctAnswer: selectedCountry.capital,
    };
};

export const generateAfricanCapitalsQuestion = (): QCMQuestion => {
    const id = Math.floor(Math.random() * 1000);
    // select a random coutry from the list
    const selectedCountry = getRandomCountry(africanCountries);

    // generate 3 wrong answers
    const wrongAnswers = new Set<string>();
    while (wrongAnswers.size < 3) {
        const randomIndex = getRandomInt(0, africanCountries.length - 1);
        const randomCapital = africanCountries[randomIndex].capital;
        if (randomCapital !== selectedCountry.capital) {
            wrongAnswers.add(randomCapital);
        }
    }

    //Mixes options (good + wrong) of the question
    const options = Array.from(wrongAnswers);
    options.push(selectedCountry.capital);
    shuffleArray(options);

    return {
        id,
        label: `Quelle est la capitale de ${selectedCountry.name} ?`,
        options,
        correctAnswer: selectedCountry.capital,
    };
};

export const generateAmericanCapitalsQuestion = (): QCMQuestion => {
    const id = Math.floor(Math.random() * 1000);
    // select a random coutry from the list
    const selectedCountry = getRandomCountry(americanCountries);

    // generate 3 wrong answers
    const wrongAnswers = new Set<string>();
    while (wrongAnswers.size < 3) {
        const randomIndex = getRandomInt(0, americanCountries.length - 1);
        const randomCapital = americanCountries[randomIndex].capital;
        if (randomCapital !== selectedCountry.capital) {
            wrongAnswers.add(randomCapital);
        }
    }

    //Mixes options (good + wrong) of the question
    const options = Array.from(wrongAnswers);
    options.push(selectedCountry.capital);
    shuffleArray(options);

    return {
        id,
        label: `Quelle est la capitale de ${selectedCountry.name} ?`,
        options,
        correctAnswer: selectedCountry.capital,
    };
};

export const generateOceanicCapitalsQuestion = (): QCMQuestion => {
    const id = Math.floor(Math.random() * 1000);
    // select a random coutry from the list
    const selectedCountry = getRandomCountry(oceanicCountries);

    // generate 3 wrong answers
    const wrongAnswers = new Set<string>();
    while (wrongAnswers.size < 3) {
        const randomIndex = getRandomInt(0, oceanicCountries.length - 1);
        const randomCapital = oceanicCountries[randomIndex].capital;
        if (randomCapital !== selectedCountry.capital) {
            wrongAnswers.add(randomCapital);
        }
    }

    //Mixes options (good + wrong) of the question
    const options = Array.from(wrongAnswers);
    options.push(selectedCountry.capital);
    shuffleArray(options);

    return {
        id,
        label: `Quelle est la capitale de ${selectedCountry.name} ?`,
        options,
        correctAnswer: selectedCountry.capital,
    };
};

export const generateAsianCapitalsQuestion = (): QCMQuestion => {
    const id = Math.floor(Math.random() * 1000);
    // select a random coutry from the list
    const selectedCountry = getRandomCountry(asianCountries);

    // generate 3 wrong answers
    const wrongAnswers = new Set<string>();
    while (wrongAnswers.size < 3) {
        const randomIndex = getRandomInt(0, asianCountries.length - 1);
        const randomCapital = asianCountries[randomIndex].capital;
        if (randomCapital !== selectedCountry.capital) {
            wrongAnswers.add(randomCapital);
        }
    }

    //Mixes options (good + wrong) of the question
    const options = Array.from(wrongAnswers);
    options.push(selectedCountry.capital);
    shuffleArray(options);

    return {
        id,
        label: `Quelle est la capitale de ${selectedCountry.name} ?`,
        options,
        correctAnswer: selectedCountry.capital,
    };
};

export const generateRandomCapitalsQuestion = (): QCMQuestion => {
    const id = Math.floor(Math.random() * 1000);
    const allCountries = [
        ...europeanCountries,
        ...africanCountries,
        ...americanCountries,
        ...oceanicCountries,
        ...asianCountries,
    ];
    
    // select a random coutry from the list
    const selectedCountry = getRandomCountry(allCountries);

    // generate 3 wrong answers
    const wrongAnswers = new Set<string>();
    while (wrongAnswers.size < 3) {
        const randomIndex = getRandomInt(0, allCountries.length - 1);
        const randomCapital = allCountries[randomIndex].capital;
        if (randomCapital !== selectedCountry.capital) {
            wrongAnswers.add(randomCapital);
        }
    }

    //Mixes options (good + wrong) of the question
    const options = Array.from(wrongAnswers);
    options.push(selectedCountry.capital);
    shuffleArray(options);

    return {
        id,
        label: `Quelle est la capitale de ${selectedCountry.name} ?`,
        options,
        correctAnswer: selectedCountry.capital,
    };
};
