export class Answer {
    constructor(content: string, isCorrect: boolean){
        this.content = content;
        this.isCorrect = isCorrect;
    } 

    content: string;
    isCorrect: boolean;
}