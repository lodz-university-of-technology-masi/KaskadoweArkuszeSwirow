package requests;

import models.CandidateForm;

public class CandidateTestRequest {

	private String httpMethod;
	
	private String id;
	
	private CandidateForm candidateTest;

	public String getHttpMethod() {
		return httpMethod;
	}

	public void setHttpMethod(String httpMethod) {
		this.httpMethod = httpMethod;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public CandidateForm getCandidateTest() {
		return candidateTest;
	}

	public void setCandidateTest(CandidateForm candidateTest) {
		this.candidateTest = candidateTest;
	}
	
}