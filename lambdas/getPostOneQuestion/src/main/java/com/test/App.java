package com.test;

import com.test.Request;
import com.test.ResourceNotFoundException;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.lambda.runtime.Context;


public class App {
	

	public static Object handleRequest (Request request, Context context) throws ResourceNotFoundException {
		AmazonDynamoDB client = AmazonDynamoDBClientBuilder.defaultClient();
		DynamoDBMapper mapper = new DynamoDBMapper(client);
		Question question = null;
		switch(request.getHttpMethod())		{
		case "GET":
			question = mapper.load(Question.class, request.getId());
			if(question == null)	{
				throw new ResourceNotFoundException("Resource not found: " + request.getId());
			}
			return question;
		case "POST":
			question = request.getQuestion();
			mapper.save(question);
			return question;
		default:
			break;
		}
		return null;
	}
}
