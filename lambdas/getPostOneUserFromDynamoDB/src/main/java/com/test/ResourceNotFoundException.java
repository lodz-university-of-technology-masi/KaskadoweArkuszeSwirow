package com.test;

public class ResourceNotFoundException extends Exception {
	
	private static final long serialVersionUID = 1L;
	
	public ResourceNotFoundException(String message)	{
		super("Not found: " + message);
	}
}
