package candidateForm;

import java.util.List;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import models.CandidateForm;
import requests.ErrorMessage;
import requests.GatewayRequest;
import requests.GatewayResponse;

public class getAllCandidateForm implements RequestHandler <GatewayRequest, GatewayResponse<List<CandidateForm>>> {

	
	@Override
	public GatewayResponse<List<CandidateForm>> handleRequest(GatewayRequest request, Context context) {
		AmazonDynamoDB client = AmazonDynamoDBClientBuilder.defaultClient();
		DynamoDBMapper mapper = new DynamoDBMapper(client);	
		DynamoDBScanExpression scanExpression = new DynamoDBScanExpression();
		List<CandidateForm> iList =  mapper.scan(CandidateForm.class, scanExpression);
		
		if(iList.isEmpty())	{
			return new GatewayResponse<>(new ErrorMessage(404, "Table is empty"));
		}
		
		return new GatewayResponse<>(iList, 200);
	}
}

