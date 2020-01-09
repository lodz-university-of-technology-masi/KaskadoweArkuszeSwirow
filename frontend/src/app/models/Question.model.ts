import { Answer } from './Answer.model';

export abstract class Question {
    constructor(question: string, answer: Answer[], type: String) {
        this.question = question;
        this.answer = answer;
        this.type = type;
    }

    id: string;
    question: string;
    answer: Answer[];
    type: String;
}

export class NumericalQuestion extends Question {
}

export class OpenQuestion extends Question {
}

export class ChooseQuestion extends Question {
}

export class DisplayQuestion extends Question {
    constructor(question: string, answer: Answer[], type:String, selected: boolean){
        super(question, answer, type);
        this.selected = selected; 
    }

    selected: boolean;
}
