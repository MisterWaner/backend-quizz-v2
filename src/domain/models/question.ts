export class Question {
    constructor(
        public id: string,
        public label: string,
        public correctAnswer: string | number,
    ) {
        this.id = id;
        this.label = label;
        this.correctAnswer = correctAnswer;
    }

    isCorrect(answer: string): boolean {
        return this.correctAnswer === answer;
    }
}

export class QCMQuestion extends Question {

    constructor(
        id: string,
        label: string,
        public options: string[],
        correctAnswer: number,
    ) {
        super(id, label, options[correctAnswer]);
        this.options = options;
        this.correctAnswer = correctAnswer;
    }
    isCorrect(answer: string): boolean {
        return this.options[Number(this.correctAnswer)] === answer;
    }
}