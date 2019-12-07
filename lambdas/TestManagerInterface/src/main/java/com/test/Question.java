package com.test;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;

@DynamoDBTable(tableName = "Questions")
public class Question {

	@DynamoDBHashKey
	private int ID;
	
	@DynamoDBAttribute
	private int owner_ID;
	
	@DynamoDBAttribute
	private String question;
	
	@DynamoDBAttribute
	private String answer_A;
	
	@DynamoDBAttribute
	private String answer_B;
	
	@DynamoDBAttribute
	private String answer_C;
	
	@DynamoDBAttribute
	private String answer_D;
	
	@DynamoDBAttribute
	private String correct;
	
	public Question(){
	}

	public int getID() {
		return this.ID;
	}

	public void setID(int ID) {
		this.ID = ID;
	}

	public int getOwner_ID() {
		return owner_ID;
	}

	public void setOwner_ID(int owner_ID) {
		this.owner_ID = owner_ID;
	}

	public String getQuestion() {
		return question;
	}

	public void setQuestion(String question) {
		this.question = question;
	}

	public String getAnswer_A() {
		return answer_A;
	}

	public void setAnswer_A(String answer_A) {
		this.answer_A = answer_A;
	}

	public String getAnswer_B() {
		return answer_B;
	}

	public void setAnswer_B(String answer_B) {
		this.answer_B = answer_B;
	}

	public String getAnswer_C() {
		return answer_C;
	}

	public void setAnswer_C(String answer_C) {
		this.answer_C = answer_C;
	}

	public String getAnswer_D() {
		return answer_D;
	}

	public void setAnswer_D(String answer_D) {
		this.answer_D = answer_D;
	}

	public String getCorrect() {
		return correct;
	}

	public void setCorrect(String correct) {
		this.correct = correct;
	}

}
	

