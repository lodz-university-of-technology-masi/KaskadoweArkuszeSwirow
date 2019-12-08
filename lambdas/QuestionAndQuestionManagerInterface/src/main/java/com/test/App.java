package com.test;

import com.test.Request;
import com.test.ResourceNotFoundException;
import java.util.List;
import java.util.Random;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapperConfig;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.lambda.runtime.Context;


public class App {
	
	public static Object getAllQuestions (Request request, Context context) throws ResourceNotFoundException {
		AmazonDynamoDB client = AmazonDynamoDBClientBuilder.defaultClient();
		DynamoDBMapper mapper = new DynamoDBMapper(client);	
		DynamoDBScanExpression scanExpression = new DynamoDBScanExpression();
		List<Question> iList =  mapper.scan(Question.class, scanExpression);

		if(iList.size() == 0)	{
			throw new ResourceNotFoundException("Table is empty");
		}
		return iList;
	
	}
	
	public static Object getRandomQuestion (Request request, Context context) throws ResourceNotFoundException {
		AmazonDynamoDB client = AmazonDynamoDBClientBuilder.defaultClient();
		DynamoDBMapper mapper = new DynamoDBMapper(client);	
		DynamoDBScanExpression scanExpression = new DynamoDBScanExpression();
		List<Question> iList =  mapper.scan(Question.class, scanExpression);
		Random rand = new Random();
		if(iList.size() == 0)	{
			throw new ResourceNotFoundException("Table is empty");
		}
		
		return iList.get(rand.nextInt(iList.size()));	
	}
	
	public static Object addQuestion (Request request, Context context) throws ResourceNotFoundException {
		AmazonDynamoDB client = AmazonDynamoDBClientBuilder.defaultClient();
		DynamoDBMapper mapper = new DynamoDBMapper(client);
		Question question = null;
		question = request.getQuestion();
		mapper.save(question);
		
		return question;
	
	}
	
	public static Object getQuestion (Request request, Context context) throws ResourceNotFoundException {
		AmazonDynamoDB client = AmazonDynamoDBClientBuilder.defaultClient();
		DynamoDBMapper mapper = new DynamoDBMapper(client);
		Question question = null;
		question = mapper.load(Question.class, request.getId());
		if(question == null)	{
			throw new ResourceNotFoundException("Resource not found: " + request.getId());
		}
		return question;
	}
	
	public static void deleteQuestion (Request request, Context context) throws ResourceNotFoundException {
		AmazonDynamoDB client = AmazonDynamoDBClientBuilder.defaultClient();
		DynamoDBMapper mapper = new DynamoDBMapper(client);
		Question question = null;
		question = request.getQuestion();
		mapper.delete(question);
		
	}
	
	public static void modifyQuestion (Request request, Context context) throws ResourceNotFoundException {
		AmazonDynamoDB client = AmazonDynamoDBClientBuilder.defaultClient();
		DynamoDBMapperConfig dynamoDBMapperConfig = new DynamoDBMapperConfig.Builder()
				  .withConsistentReads(DynamoDBMapperConfig.ConsistentReads.CONSISTENT)
				  .withSaveBehavior(DynamoDBMapperConfig.SaveBehavior.UPDATE)
				  .build();
		DynamoDBMapper mapper = new DynamoDBMapper(client);
		Question question = null;
		question = request.getQuestion();
		mapper.save(question, dynamoDBMapperConfig);
	
	}
	
}
