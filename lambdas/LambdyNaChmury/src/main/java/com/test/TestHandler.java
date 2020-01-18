package com.test;

import exceptions.ResourceNotFoundException;
import models.Question;
import models.Test;
import requests.TestRequest;

import java.util.List;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.model.CreateTableRequest;
import com.amazonaws.services.dynamodbv2.model.ProvisionedThroughput;
import com.amazonaws.services.lambda.runtime.Context;
import requests.GatewayRequest;
import requests.QuestionRequest;

public class TestHandler {
	
	public static Object getAll (TestRequest request, Context context) throws ResourceNotFoundException {
		AmazonDynamoDB client = AmazonDynamoDBClientBuilder.defaultClient();
		DynamoDBMapper mapper = new DynamoDBMapper(client);	
		DynamoDBScanExpression scanExpression = new DynamoDBScanExpression();
		List<Test> iList =  mapper.scan(Test.class, scanExpression);
		if(iList.size() == 0)	{
			throw new ResourceNotFoundException("Table is empty");
		}
		return iList;
	}
	
	public static Object getTestFromId (TestRequest request, Context context) throws ResourceNotFoundException {
		AmazonDynamoDB client = AmazonDynamoDBClientBuilder.defaultClient();
		DynamoDBMapper mapper = new DynamoDBMapper(client);
		Test test = null;
		test = mapper.load(Test.class, request.getId());
		if(test == null)	{
			throw new ResourceNotFoundException("Resource not found: " + request.getId());
		}
		return test;
	}

	public static Object createTest (TestRequest request, Context context) {
		AmazonDynamoDB client = AmazonDynamoDBClientBuilder.defaultClient();
//		DynamoDBMapper dynamoDBMapper = new DynamoDBMapper(client);
//		CreateTableRequest createTableRequest = dynamoDBMapper.generateCreateTableRequest(Test.class);
//		// Set your throughput here
//		createTableRequest.withProvisionedThroughput(new ProvisionedThroughput(1L, 1L));
//
//		client.createTable(createTableRequest);
		
		
		DynamoDBMapper mapper = new DynamoDBMapper(client);
		Test test = null;
		test = request.getTest();
		mapper.save(test);
	
		return test;
		
	}
//	public static Object createTest (GatewayRequest request, Context context) {
//		AmazonDynamoDB client = AmazonDynamoDBClientBuilder.defaultClient();
//		DynamoDBMapper mapper = new DynamoDBMapper(client);
//		Test test = null;
//		test = request.getTypedBody(Test.class);
//		mapper.save(test);
//	
//		return test;
//	}
	
	public static void deleteTest (TestRequest request, Context context) throws ResourceNotFoundException {
		AmazonDynamoDB client = AmazonDynamoDBClientBuilder.defaultClient();
		DynamoDBMapper mapper = new DynamoDBMapper(client);
		Test test = null;
		test = mapper.load(Test.class, request.getId());
		if(test== null)	{
			throw new ResourceNotFoundException("Resource not found: " + request.getId());
		}
		mapper.delete(test);

	}
	
}
