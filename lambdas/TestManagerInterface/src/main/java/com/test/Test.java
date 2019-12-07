package com.test;


import java.util.List;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;

@DynamoDBTable(tableName = "Tests")
public class Test {

	@DynamoDBHashKey
	private int ID;
	
	@DynamoDBAttribute
	private String name;
	
	@DynamoDBAttribute
	private int owner_ID;
	
	@DynamoDBAttribute
	private List<Integer> questions;

	Test(int ID, String name, int owner_ID){
		this.ID = ID;
		this.name = name;
		this.owner_ID = owner_ID;
		this.questions = null;
	}
	
	Test(int ID, String name, int owner_ID, List<Integer> questions){
		this.ID = ID;
		this.name = name;
		this.owner_ID = owner_ID;
		this.questions = questions;
	}
	
	public int getID() {
		return ID;
	}

	public void setID(int ID) {
		this.ID = ID;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getOwner_ID() {
		return owner_ID;
	}

	public void setOwner_ID(int owner_ID) {
		this.owner_ID = owner_ID;
	}

	public List<Integer> getQuestions() {
		return questions;
	}

	public void setQuestions(List<Integer> questions) {
		this.questions = questions;
	}
	
	
}