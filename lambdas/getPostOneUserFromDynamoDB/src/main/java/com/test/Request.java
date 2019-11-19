package com.test;

public class Request {

	private String httpMethod;
	
	private int id;
	
	private User user;
	
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
	
	public User getUser()	{
		return  user;
	}
	
	public void setUser(User user)	{
		this.user = user;
	}
}
