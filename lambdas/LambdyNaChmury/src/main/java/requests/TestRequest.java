package requests;

import models.Test;

public class TestRequest {

	private String httpMethod;
	
	private String id;
	
	private Test test;
	
	
//	TestRequest() {
//
//	}
//	
//	TestRequest(String httpMethod, String id, Test test) {
//		this.id = id;
//		this.httpMethod = httpMethod;
//		this.test = test;
//	}
	
//	TestRequest(String httpMethod, int id, Test test) {
//		this.id = id;
//		this.httpMethod = httpMethod;
//		this.test = test;
//		this.question = question;
//	}
	
	public String getHttpMethod()	{
		return httpMethod;
	}
	
	public void setHttpMethod(String httpMethod)		{
		this.httpMethod = httpMethod;
	}
	
	public String getId()	{
		return id;
	}
	
	public void setId(String id)	{
		this.id = id;
	}
	
	public Test getTest()	{
		return test;
	}
	
	public void setTest(Test test)	{
		this.test = test;
	}
	
}
