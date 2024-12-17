import { Question } from "./question";

export class Quiz {
    constructor(
        public id: string,
        public length: number,
        public subject: string,
        public questions: Question[],
    )
    {
        this.id = id;
        this.length = length;
        this.subject = subject;
        this.questions = questions;
    }
}