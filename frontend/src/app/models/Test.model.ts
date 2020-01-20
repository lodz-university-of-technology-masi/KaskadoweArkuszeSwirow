import { Question } from './Question.model';

export class Test {
    constructor(title: string, questions: Question[], id: string) {
        this.title = title;
        this.id = id;
        this.questions = questions;
    }

    id: string; 
    title: string;
    // language: string = null;
    questions: Question[];
}

export class DisplayTest extends Test {
    constructor(title: string, questions: Question[], id: string, selected: boolean){
        super(title, questions, id); 
        this.selected = selected; 
    }

    selected: boolean;
}
