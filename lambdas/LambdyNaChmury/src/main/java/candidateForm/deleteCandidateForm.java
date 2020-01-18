package candidateForm;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import models.CandidateForm;
import requests.ErrorMessage;
import requests.GatewayRequest;
import requests.GatewayResponse;;

public class deleteCandidateForm implements RequestHandler <GatewayRequest, GatewayResponse<CandidateForm>>{

	public GatewayResponse<CandidateForm> handleRequest(GatewayRequest request, Context context) {
		
	AmazonDynamoDB client = AmazonDynamoDBClientBuilder.defaultClient();
		DynamoDBMapper mapper = new DynamoDBMapper(client);
		CandidateForm candidateForm= null;
		String id = request.getPathParameters().get("form_id");
		candidateForm = mapper.load(CandidateForm.class, id);
		if(candidateForm == null)	{
			return new GatewayResponse<>(new ErrorMessage(400, "Candidate Form does not exist"));
		}
		mapper.delete(candidateForm);
		return new GatewayResponse<>(204);
	}
}
