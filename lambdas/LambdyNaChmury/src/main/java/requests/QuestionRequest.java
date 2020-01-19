package requests;

import models.Question;

public class QuestionRequest {

	private String httpMethod;
	
	private int amount;
	
	private String id;
	
	private Question question;
	
	public String getHttpMethod()	{
		return httpMethod;
	}
	
	public void setHttpMethod(String httpMethod)		{
		this.httpMethod = httpMethod;
	}
	
	public String getId()	{
		return id;
	}
	
	public void setId(String id)	{
		this.id = id;
	}
	
	public void setAmount(int amount)	{
		this.amount = amount;
	}
	
	public Question getQuestion()	{
		return  question;
	}
	
	public void setQuestion(Question question)	{
		this.question = question;
	}

	public int getAmount() {
		return amount;
	}
}
