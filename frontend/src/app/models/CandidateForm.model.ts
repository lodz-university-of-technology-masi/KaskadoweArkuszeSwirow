import { Test } from './Test.model';

export class CandidateForm {
    constructor(candidateId: String, testStatus: String, testResult: String, testForm: Test) {
        this.candidateId = candidateId;
        this.testStatus = testStatus;
        this.testResult = testResult;
        this.testForm = testForm;
    }

    id: String;
    candidateId : String;
    testStatus: String; 
    testResult: String; 
    testForm: Test;

}