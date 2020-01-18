package question;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import models.Question;
import requests.GatewayRequest;
import requests.GatewayResponse;

public class addQuestion implements RequestHandler <GatewayRequest, GatewayResponse<Question>> {

	
	@Override
	public GatewayResponse<Question> handleRequest(GatewayRequest request, Context context) {
		AmazonDynamoDB client = AmazonDynamoDBClientBuilder.defaultClient();
		DynamoDBMapper mapper = new DynamoDBMapper(client);
		Question question = null;
		question = request.getTypedBody(Question.class);
		mapper.save(question);
		
		return new GatewayResponse<>(question, 200);
	}
}
