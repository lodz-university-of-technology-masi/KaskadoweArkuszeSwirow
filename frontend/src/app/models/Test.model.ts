import { Question } from './Question.model';

export abstract class Test {
    constructor(title: string, questions: Question[]) {
        this.title = title;
        this.questions = questions;
    }

    id: string;
    title: string;
    questions: Question[];
}