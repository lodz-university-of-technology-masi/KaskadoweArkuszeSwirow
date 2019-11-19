package com.test;

import com.test.Request;
import com.test.ResourceNotFoundException;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.lambda.runtime.Context;


public class App {
	
	//static final Logger log = Logger.getLogger(App.class);

	public static Object handleRequest (Request request, Context context) throws ResourceNotFoundException {
		AmazonDynamoDB client = AmazonDynamoDBClientBuilder.defaultClient();
		DynamoDBMapper mapper = new DynamoDBMapper(client);
		User user = null;
		switch(request.getHttpMethod())		{
		case "GET":
			user = mapper.load(User.class, request.getId());
			if(user == null)	{
				throw new ResourceNotFoundException("Resource not found: " + request.getId());
			}
			return user;
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
