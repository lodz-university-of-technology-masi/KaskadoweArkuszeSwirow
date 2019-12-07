package com.test;

public class Request {

	private String httpMethod;
	
	private int id;
	
	private Test test;
	
	private Question question;
	
	
	Request(String httpMethod, int id, Test test) {
		this.id = id;
		this.httpMethod = httpMethod;
		this.test = test;
		this.question = null;
	}
	
	Request(String httpMethod, int id, Test test, Question question) {
		this.id = id;
		this.httpMethod = httpMethod;
		this.test = test;
		this.question = question;
	}
	
	public String getHttpMethod()	{
		return httpMethod;
	}
	
	public void setHttpMethod(String httpMethod)		{
		this.httpMethod = httpMethod;
	}
	
	public int getId()	{
		return id;
	}
	
	public void setId(int id)	{
		this.id = id;
	}
	
	public Test getTest()	{
		return test;
	}
	
	public void setTest(Test test)	{
		this.test = test;
	}
	
	public Question getQuestion()	{
		return this.question;
	}
	
	public void setQuestion(Question question)	{
		this.question = question;
	}
}
