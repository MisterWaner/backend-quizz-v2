import { QCMQuestion } from '../types';
import { shuffleArray } from '../../lib/helpers';
import { europeanCountries, Country } from '../../application/geographyData';

function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomCountry(array: Country[]): Country {
    const randomIndex = getRandomInt(0, array.length - 1);
    const selectedCountry = array[randomIndex];
    return selectedCountry
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
    const options = Array.from(wrongAnswers)
    options.push(selectedCountry.capital);
    shuffleArray(options);

    return {
        id,
        label: `Quelle est la capitale de ${selectedCountry.name} ?`,
        options,
        correctAnswer: selectedCountry.capital,
    };
}