package com.test;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;

@DynamoDBTable(tableName = "Questions")
public class Question  {

	@DynamoDBHashKey
	private int id;
	
	@DynamoDBAttribute
	private String question;
	
	@DynamoDBAttribute
	private String wrong_answer_1;
	
	@DynamoDBAttribute
	private String wrong_answer_2;
	
	@DynamoDBAttribute
	private String wrong_answer_3;
	
	@DynamoDBAttribute
	private String correct_answer;
	
	@DynamoDBAttribute
	private String open_answer;
	
	@DynamoDBAttribute
	private float numeric_answer;
	
	public Question()	{
		
	}
	
	public Question (int id, String question, String wrong_answer_1, String wrong_answer_2, String wrong_answer_3, String correct_answer)	{
		this.id = id;
		this.question = question;
		this.wrong_answer_1 = wrong_answer_1;
		this.wrong_answer_2 = wrong_answer_2;
		this.wrong_answer_3 = wrong_answer_3;
		this.correct_answer = correct_answer;
	}
	
	public Question (int id, String question, String open_answer, String correct_answer)	{
		this.id = id;
		this.question = question;
		this.open_answer = open_answer;
		this.correct_answer = correct_answer;
	}
	
	public Question (int id, String question, float numeric_answer, String correct_answer)		{
		this.id = id;
		this.question = question;
		this.numeric_answer = numeric_answer;
		this.correct_answer = correct_answer;
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
	
	public String getWrong_answer_1()	{
		return wrong_answer_1;
	}
	
	public void setWrong_answer_1(String answer)	{
		this.wrong_answer_1 = answer;
	}
	
	public String getWrong_answer_2()	{
		return wrong_answer_2;
	}
	
	public void setWrong_answer_2(String answer)	{
		this.wrong_answer_2 = answer;
	}
	
	public String getWrong_answer_3()	{
		return wrong_answer_3;
	}
	
	public void setWrong_answer_3(String answer)	{
		this.wrong_answer_3 = answer;
	}
	
	public String getCorrect_answer()	{
		return correct_answer;
	}
	
	public void setCorrect_answer(String answer)	{
		this.correct_answer = answer;
	}
	
	public String getOpen_answer()	{
		return open_answer;
	}
	
	public void setOpen_answer(String answer)	{
		this.open_answer = answer;
	}
	
	public float getNumeric_answer()	{
		return numeric_answer;
	}
	
	public void setNumeric_answer(float answer)	{
		this.numeric_answer = answer;
	}
}
