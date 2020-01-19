package models;

import java.util.Map;

import models.User;

public class Response {

	private int statusCode; // http status code

    private Map<String, String> headers; // headers

    private User user; // body - what you want to return to client

    public Response(int statusCode, Map<String, String> headers, User user) {
        this.statusCode = statusCode;
        this.headers = headers;
        this.user = user;
    }

    public int getStatusCode() {
        return statusCode;
    }

    public Map<String, String> getHeaders() {
        return headers;
    }

    public User getUser() {
        return user;
    }

    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }

    public void setHeaders(Map<String, String> headers) {
        this.headers = headers;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
