export class Answer {

    constructor(content: string, isCorrect: boolean, isSelected: boolean, candidateAnswer: String) {
        this.content = content;
        this.isCorrect = isCorrect;
        this.isSelected = isSelected;
        this.candidateAnswer = candidateAnswer;
    }
    content: string;
    isCorrect: boolean;
    isSelected: boolean;
    candidateAnswer: String;
}
