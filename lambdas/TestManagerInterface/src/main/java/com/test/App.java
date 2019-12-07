package com.test;

import com.test.Request;
import com.test.ResourceNotFoundException;

import java.util.List;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.lambda.runtime.Context;


public class App {
	
	public static Object getAll (Request request, Context context) throws ResourceNotFoundException {
		AmazonDynamoDB client = AmazonDynamoDBClientBuilder.defaultClient();
		DynamoDBMapper mapper = new DynamoDBMapper(client);	
		DynamoDBScanExpression scanExpression = new DynamoDBScanExpression();
		List<Test> iList =  mapper.scan(Test.class, scanExpression);
		if(iList.size() == 0)	{
			throw new ResourceNotFoundException("Table is empty");
		}
		return iList;
	}

	public static void createTest (Request request, Context context) throws ResourceNotFoundException {
		AmazonDynamoDB client = AmazonDynamoDBClientBuilder.defaultClient();
		DynamoDBMapper mapper = new DynamoDBMapper(client);
		Test test = null;
		if(request.getHttpMethod() == "POST") {
			test = request.getTest();
			mapper.save(test);
		}
	}
	
	public static void deleteTest (Request request, Context context) throws ResourceNotFoundException {
		AmazonDynamoDB client = AmazonDynamoDBClientBuilder.defaultClient();
		DynamoDBMapper mapper = new DynamoDBMapper(client);
		Test test = request.getTest();
		if(request.getHttpMethod() == "POST") {
			mapper.delete(test);
		}
	}
	
	public static void addQuestionToTest (Request request, Context context) throws ResourceNotFoundException {
		AmazonDynamoDB client = AmazonDynamoDBClientBuilder.defaultClient();
		DynamoDBMapper mapper = new DynamoDBMapper(client);
		Test test = request.getTest();
		if(request.getHttpMethod() == "POST") {
			int idOfNewQuestion = request.getQuestion().getID();
			List<Integer> questions = test.getQuestions();
			questions.add(idOfNewQuestion);
			test.setQuestions(questions);
			mapper.save(test);
		}
	}
	
	public static void removeQuestionToTest (Request request, Context context) throws ResourceNotFoundException {
		AmazonDynamoDB client = AmazonDynamoDBClientBuilder.defaultClient();
		DynamoDBMapper mapper = new DynamoDBMapper(client);
		Test test = request.getTest();
		if(request.getHttpMethod() == "POST") {
			List<Integer> questions = test.getQuestions();
			int idOfQuestion = request.getQuestion().getID();
			questions.remove(idOfQuestion);
			Test changedTest = new Test(test.getID(), test.getName(), test.getOwner_ID(), questions);
			mapper.delete(test);
			mapper.save(changedTest);	
		}
	}
}
