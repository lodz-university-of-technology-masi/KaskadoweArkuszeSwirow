package requests;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;


public class GatewayResponse<Response> {
    private static final ObjectMapper objectMapper = new ObjectMapper();
    private String body = null;
    private Map<String, String> headers;
    private int statusCode;

    public GatewayResponse(final int statusCode) {
        setHeaders();
        this.statusCode = statusCode;
    }

    public GatewayResponse(int statusCode, String errorMessage) {
        setHeaders();
        this.statusCode = statusCode;
        this.body = errorMessage;
    }

    public GatewayResponse(ErrorMessage errorMessage) {
        setHeaders();
        this.statusCode = errorMessage.getStatusCode();

        try {
            this.body = objectMapper.writeValueAsString(errorMessage);
        } catch (JsonProcessingException e) {
            this.body = "Could not serialize Response object to JSON";
            this.statusCode = 500;
        }
    }
    
    public GatewayResponse(final Response body, final int statusCode) {
        setHeaders();
        this.statusCode = statusCode;

        try {
            this.body = objectMapper.writeValueAsString(body);
        } catch (JsonProcessingException e) {
            this.body = "Could not serialize Response object to JSON";
            this.statusCode = 500;
        }
    }

    private void setHeaders() {
        Map<String, String> headers = new HashMap<>();
        headers.put("Content-Type", "application/json");
        headers.put("Access-Control-Allow-Origin", "*");
        this.headers = Collections.unmodifiableMap(new HashMap<>(headers));
    }

    public String getBody() {
        return body;
    }

    public Map<String, String> getHeaders() {
        return headers;
    }

    public int getStatusCode() {
        return statusCode;
    }
}

