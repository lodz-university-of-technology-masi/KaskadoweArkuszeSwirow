package com.test;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.lambda.runtime.Context;

import exceptions.ResourceNotFoundException;
import models.Response;
import models.User;
import requests.UserRequest;


public class UserHandler {
	
	public static Object getAllUsers (UserRequest request, Context context) throws ResourceNotFoundException {
		AmazonDynamoDB client = AmazonDynamoDBClientBuilder.defaultClient();
		DynamoDBMapper mapper = new DynamoDBMapper(client);	
		DynamoDBScanExpression scanExpression = new DynamoDBScanExpression();
		List<User> iList =  mapper.scan(User.class, scanExpression);

		if(iList.size() == 0)	{
			throw new ResourceNotFoundException("Table is empty");
		}
		return iList;
	
	}
	
	public static Object getPostOneUser (UserRequest request, Context context) throws ResourceNotFoundException {
		AmazonDynamoDB client = AmazonDynamoDBClientBuilder.defaultClient();
		DynamoDBMapper mapper = new DynamoDBMapper(client);
		User user = null;
		switch(request.getHttpMethod())		{
		case "GET":
			user = mapper.load(User.class, request.getId());
			if(user == null)	{
				throw new ResourceNotFoundException("Resource not found: " + request.getId());
			}
			Map<String, String> headers = new HashMap<>();
            headers.put("Access-Control-Allow-Origin", "*"); // cors header, you can add another header fields

            return new Response(200, headers, user);
			//return user;
		case "POST":
			user = request.getUser();
			mapper.save(user);
			return user;	
		default:
			break;
		}
		return null;
	}
}
