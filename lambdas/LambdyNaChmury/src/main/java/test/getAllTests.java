package test;

import java.util.List;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import models.Question;
import requests.GatewayRequest;
import requests.GatewayResponse;

public class getAllTests implements RequestHandler <GatewayRequest, GatewayResponse<List<Question>>> {

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
}
