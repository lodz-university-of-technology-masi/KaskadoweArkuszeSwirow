package models;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBDocument;

@DynamoDBDocument
public class Answer {

	
	@DynamoDBAttribute
	private String content;
	
	@DynamoDBAttribute
	private boolean isCorrect;
	
	@DynamoDBAttribute
	private boolean isSelected;
	
	@DynamoDBAttribute
	private String candidateAnswer;
	
	public Answer() {
		
	}
	
	public Answer(String content, boolean isCorrect, boolean isSelected, String candidateAnswer)	{
		this.content = content;
		this.isCorrect = isCorrect;
		this.isSelected = isSelected;
		this.candidateAnswer = candidateAnswer;
	}
	
	public void setContent(String content) {
		this.content = content;
	}
	
	public String getContent() {
		return content;
	}
	
	public String getCandidateAnswer() {
		return candidateAnswer;
	}
	
	public void setCandidateAnswer(String candidateAnswer) {
		this.candidateAnswer = candidateAnswer;
	}
	
	public void setIsCorrect(boolean isCorrect) {
		this.isCorrect = isCorrect;
	}
	
	public boolean getIsCorrect()	{
		return isCorrect;
	}
	
	public void setIsSelected(boolean isSelected) {
		this.isSelected = isSelected;
	}
	
	public boolean getIsSelected()	{
		return isSelected;
	}
}
