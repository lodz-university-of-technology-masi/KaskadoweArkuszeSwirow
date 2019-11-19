package com.test;

public class Request {

	private String httpMethod;
	
	private int id;
	
	private Question question;
	
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
	
	public Question getQuestion()	{
		return  question;
	}
	
	public void setQuestion(Question question)	{
		this.question = question;
	}
}
