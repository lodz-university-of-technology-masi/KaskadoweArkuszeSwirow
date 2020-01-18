package candidateForm;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import models.CandidateForm;
import requests.GatewayRequest;
import requests.GatewayResponse;

public class addCandidateForm implements RequestHandler <GatewayRequest, GatewayResponse<CandidateForm>> {

	
	@Override
	public GatewayResponse<CandidateForm> handleRequest(GatewayRequest request, Context context) {
		AmazonDynamoDB client = AmazonDynamoDBClientBuilder.defaultClient();
		DynamoDBMapper mapper = new DynamoDBMapper(client);
		CandidateForm candidateForm = null;
		candidateForm = request.getTypedBody(CandidateForm.class);
		mapper.save(candidateForm);
		
		return new GatewayResponse<>(candidateForm, 200);
	}
}

