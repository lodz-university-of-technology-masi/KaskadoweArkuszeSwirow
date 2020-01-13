import { Question } from './Question.model';

export class Test {
    constructor(title: string, questions: Question[]) {
        this.title = title;
        this.questions = questions;
    }

    id: string; 
    title: string;
    questions: Question[];
}

export class DisplayTest extends Test {
    constructor(title: string, questions: Question[], selected: boolean){
        super(title, questions); 
        this.selected = selected; 
    }

    selected: boolean;
}
