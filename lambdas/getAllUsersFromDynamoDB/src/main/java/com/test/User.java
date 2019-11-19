package com.test;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;

@DynamoDBTable(tableName = "Users")
public class User {

	@DynamoDBHashKey
	private int id;
	
	@DynamoDBAttribute
	private String firstName;
	
	@DynamoDBAttribute
	private String lastName;
	
	@DynamoDBAttribute
	private int age;
	
	public User()	{
		
	}
	
	public User (int id, String firstName, String lastName, int age)	{
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.age = age;
	}
	
	public int getId()	{
		return id;
	}
	
	public void setId(int id)	{
		this.id = id;
	}
	
	public String getfirstName()	{
		return firstName;
	}
	
	public void setfirstName(String firstName)	{
		this.firstName = firstName;
	}
	
	public String getLastName()	{
		return lastName;
	}
	
	public void setLastName(String lastName)	{
		this.lastName = lastName;
	}
	
	public int getAge()	{
		return age;
	}
	
	public void setAge(int age)	{
		this.age = age;
	}
}