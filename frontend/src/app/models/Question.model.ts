import { Answer } from './Answer.model';

export abstract class Question {
    constructor(question: string, answer: Answer[]) {
        this.question = question;
        this.answer = answer;
    }

    id: string;
    question: string;
    answer: Answer[];
}

export class NumericalQuestion extends Question {
}

export class OpenQuestion extends Question {
}

export class ChooseQuestion extends Question {
}