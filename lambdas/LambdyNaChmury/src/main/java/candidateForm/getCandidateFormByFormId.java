package candidateForm;

import java.util.HashMap;
import java.util.List;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import models.CandidateForm;
import requests.ErrorMessage;
import requests.GatewayRequest;
import requests.GatewayResponse;;

public class getCandidateFormByFormId implements RequestHandler <GatewayRequest, GatewayResponse<List<CandidateForm>>>{

	public GatewayResponse<List<CandidateForm>> handleRequest(GatewayRequest request, Context context) {
		
	AmazonDynamoDB client = AmazonDynamoDBClientBuilder.defaultClient();
		DynamoDBMapper mapper = new DynamoDBMapper(client);
		CandidateForm candidateForm = null;
		String id = request.getPathParameters().get("form_id");
		//candidateForm = mapper.load(CandidateForm.class, id);
		List<CandidateForm> iList = null;
		HashMap<String, AttributeValue> eav = new HashMap<>();
	       
        eav.put(":v1", new AttributeValue().withS(id));
        
        iList =  mapper.scan(
                CandidateForm.class,
                new DynamoDBScanExpression()
                        .withFilterExpression("id = :v1")
                        .withExpressionAttributeValues(eav)
        );
		if(iList.isEmpty())	{
			return new GatewayResponse<>(new ErrorMessage(404, "Candidate Form does not exist"));
		}
		
		return new GatewayResponse<>(iList, 200);
	}
}
