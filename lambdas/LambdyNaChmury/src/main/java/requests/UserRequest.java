package requests;

import models.User;

public class UserRequest {

	private String httpMethod;
	
	private String id;
	
	private User user;
	
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
	
	public User getUser()	{
		return  user;
	}
	
	public void setUser(User user)	{
		this.user = user;
	}
}
