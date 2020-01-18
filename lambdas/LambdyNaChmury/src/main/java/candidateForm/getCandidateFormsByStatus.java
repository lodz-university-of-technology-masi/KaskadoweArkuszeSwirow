package candidateForm;

import java.util.HashMap;
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
import com.amazonaws.services.dynamodbv2.model.AttributeValue;

public class getCandidateFormsByStatus implements RequestHandler <GatewayRequest, GatewayResponse<List<CandidateForm>>>{

	public GatewayResponse<List<CandidateForm>> handleRequest(GatewayRequest request, Context context) {
		AmazonDynamoDB client = AmazonDynamoDBClientBuilder.defaultClient();
		DynamoDBMapper mapper = new DynamoDBMapper(client);
		String status = request.getPathParameters().get("status");
		List<CandidateForm> iList = null;	
        HashMap<String, AttributeValue> eav = new HashMap<>();
       
        eav.put(":v1", new AttributeValue().withS(status));
        
        iList =  mapper.scan(
                CandidateForm.class,
                new DynamoDBScanExpression()
                        .withFilterExpression("testStatus = :v1")
                        .withExpressionAttributeValues(eav)
        );
        
		if(iList.isEmpty())	{
			return new GatewayResponse<>(new ErrorMessage(404, "Candidate Form does not exist"));
		}
		return new GatewayResponse<>(iList, 200);
	}
}
