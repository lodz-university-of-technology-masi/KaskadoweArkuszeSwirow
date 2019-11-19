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
	
	public static Object handleRequest (Request request, Context context) throws ResourceNotFoundException {
		AmazonDynamoDB client = AmazonDynamoDBClientBuilder.defaultClient();
		DynamoDBMapper mapper = new DynamoDBMapper(client);	
		DynamoDBScanExpression scanExpression = new DynamoDBScanExpression();
		List<Question> iList =  mapper.scan(Question.class, scanExpression);

		if(iList.size() == 0)	{
			throw new ResourceNotFoundException("Table is empty");
		}
		return iList;
	
	}
}
