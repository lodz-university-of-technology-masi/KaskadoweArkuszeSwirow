package com.test;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;

@DynamoDBTable(tableName = "Questions")
public class Question {

	@DynamoDBHashKey
	private int id;
	
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
	private String correctAnswer;
	
	public Question()	{
		
	}
	
	public Question (int id, String question, String answer_A, String answer_B, String answer_C, String answer_D, String correctAnswer)	{
		this.id = id;
		this.question = question;
		this.answer_A = answer_A;
		this.answer_B = answer_B;
		this.answer_C = answer_C;
		this.answer_D = answer_D;
		this.correctAnswer = correctAnswer;
	}
	
	public int getId()	{
		return id;
	}
	
	public void setId(int id)	{
		this.id = id;
	}
	
	public String getQuestion()	{
		return question;
	}
	
	public void setQuestion(String question)	{
		this.question = question;
	}
	
	public String getAnswer_A()	{
		return answer_A;
	}
	
	public void setAnswer_A(String answer)	{
		this.answer_A = answer;
	}
	
	public String getAnswer_B()	{
		return answer_B;
	}
	
	public void setAnswer_B(String answer)	{
		this.answer_B = answer;
	}
	
	public String getAnswer_C()	{
		return answer_C;
	}
	
	public void setAnswer_C(String answer)	{
		this.answer_C = answer;
	}
	
	public String getAnswer_D()	{
		return answer_D;
	}
	
	public void setAnswer_D(String answer)	{
		this.answer_D = answer;
	}
	
	public String getCorrectAnswer()	{
		return correctAnswer;
	}
	
	public void setCorrectAnswer(String answer)	{
		this.correctAnswer = answer;
	}
}
