package com.test;

import models.Question;
import models.Test;
import requests.GatewayRequest;
import requests.QuestionRequest;
import requests.GatewayResponse;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import com.amazonaws.Request;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapperConfig;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.util.TimingInfo;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import exceptions.ResourceNotFoundException;


public class QuestionHandler implements RequestHandler <GatewayRequest, GatewayResponse<List<Question>>> {
	
	public static Object getAllQuestions (GatewayRequest request, Context context) throws ResourceNotFoundException {
		AmazonDynamoDB client = AmazonDynamoDBClientBuilder.defaultClient();
		DynamoDBMapper mapper = new DynamoDBMapper(client);	
		DynamoDBScanExpression scanExpression = new DynamoDBScanExpression();
		List<Question> iList =  mapper.scan(Question.class, scanExpression);

		if(iList.size() == 0)	{
			throw new ResourceNotFoundException("Table is empty");
		}
		return iList;
	
	}
	
	@Override
	public GatewayResponse<List<Question>> handleRequest(GatewayRequest input, Context context) {
		AmazonDynamoDB client = AmazonDynamoDBClientBuilder.defaultClient();
		DynamoDBMapper mapper = new DynamoDBMapper(client);	
		DynamoDBScanExpression scanExpression = new DynamoDBScanExpression();
		List<Question> iList =  mapper.scan(Question.class, scanExpression);

//		if(iList.size() == 0)	{
//			throw new ResourceNotFoundException("Table is empty");
//		}
		return new GatewayResponse<>(iList, 200);
	}
	
	public static Object getRandomQuestion (QuestionRequest request, Context context) throws ResourceNotFoundException {
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
	
	public static List<Question> getRandomQuestions (QuestionRequest request, Context context) throws ResourceNotFoundException {
		AmazonDynamoDB client = AmazonDynamoDBClientBuilder.defaultClient();
		DynamoDBMapper mapper = new DynamoDBMapper(client);	
		DynamoDBScanExpression scanExpression = new DynamoDBScanExpression();
		List<Question> iList =  mapper.scan(Question.class, scanExpression);
		int amount = request.getAmount();
		List<Question> randomQuestions = new ArrayList<Question>();
		Random rand = new Random();
		if(iList.size() == 0)	{
			throw new ResourceNotFoundException("Table is empty");
		}
		for(int i=0; i<amount; i++)
		{
			randomQuestions.add(iList.get(rand.nextInt(iList.size())));
		}
		
		return randomQuestions;
	}
	
	public static Object addQuestion (QuestionRequest request, Context context) {
		AmazonDynamoDB client = AmazonDynamoDBClientBuilder.defaultClient();
		DynamoDBMapper mapper = new DynamoDBMapper(client);
		Question question = null;
		question = request.getQuestion();
		mapper.save(question);
		
		return question;
	
	}
	
	public static Object getQuestion (QuestionRequest request, Context context) throws ResourceNotFoundException {
		AmazonDynamoDB client = AmazonDynamoDBClientBuilder.defaultClient();
		DynamoDBMapper mapper = new DynamoDBMapper(client);
		Question question = null;
		question = mapper.load(Question.class, request.getId());
		if(question == null)	{
			throw new ResourceNotFoundException("Resource not found: " + request.getId());
		}
		return question;
	}
	
	public static void deleteQuestion (QuestionRequest request, Context context) throws ResourceNotFoundException {
		AmazonDynamoDB client = AmazonDynamoDBClientBuilder.defaultClient();
		DynamoDBMapper mapper = new DynamoDBMapper(client);
		Question question = null;
		question = mapper.load(Question.class, request.getId());
		if(question == null)	{
			throw new ResourceNotFoundException("Resource not found: " + request.getId());
		}
		mapper.delete(question);
		
	}
	
	public static void modifyQuestion (QuestionRequest request, Context context) throws ResourceNotFoundException {
		DynamoDBMapperConfig dynamoDBMapperConfig = new DynamoDBMapperConfig.Builder()
				  .withConsistentReads(DynamoDBMapperConfig.ConsistentReads.CONSISTENT)
				  .withSaveBehavior(DynamoDBMapperConfig.SaveBehavior.UPDATE)
				  .build();
		AmazonDynamoDB client = AmazonDynamoDBClientBuilder.defaultClient();
		DynamoDBMapper mapper = new DynamoDBMapper(client);
		Question question = null;
		question = mapper.load(Question.class, request.getId());
		if(question == null)	{
			throw new ResourceNotFoundException("Resource not found: " + request.getId());
		}
		mapper.save(question, dynamoDBMapperConfig);
	}
	
	public static Object addQuestionToTest (QuestionRequest request, Context context) throws ResourceNotFoundException {
		AmazonDynamoDB client = AmazonDynamoDBClientBuilder.defaultClient();
		DynamoDBMapper mapper = new DynamoDBMapper(client);
		Test test = mapper.load(Test.class, request.getId());
			Question newQuestion = request.getQuestion();
			List<Question> questions = test.getQuestions();
			questions.add(newQuestion);
			test.setQuestions(questions);
			mapper.save(test);
			
			return newQuestion;
	}
	
	public static void removeQuestionFromTest (QuestionRequest request, Context context) throws ResourceNotFoundException {
		AmazonDynamoDB client = AmazonDynamoDBClientBuilder.defaultClient();
		DynamoDBMapper mapper = new DynamoDBMapper(client);
		Test test = mapper.load(Test.class, request.getId());
			Question questionToDelete = request.getQuestion();
			List<Question> questions = test.getQuestions();
			
			for(Question item : questions)
			{
				if(item.getId().equals(questionToDelete.getId()))
					questions.remove(item);
			}
			test.setQuestions(questions);
			mapper.save(test);
			
	}
}
