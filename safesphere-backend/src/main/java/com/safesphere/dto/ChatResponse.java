package com.safesphere.dto;

public class ChatResponse {
    private String reply;
    private String responseType;

    public ChatResponse() {}

    public ChatResponse(String reply, String responseType) {
        this.reply = reply;
        this.responseType = responseType;
    }

    public String getReply() {
        return reply;
    }

    public void setReply(String reply) {
        this.reply = reply;
    }

    public String getResponseType() {
        return responseType;
    }

    public void setResponseType(String responseType) {
        this.responseType = responseType;
    }
}