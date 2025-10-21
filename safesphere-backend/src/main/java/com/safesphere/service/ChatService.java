package com.safesphere.service;

import org.springframework.stereotype.Service;
import com.safesphere.service.GeminiService;
import com.safesphere.dto.ChatResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;
import java.util.Arrays;
import java.util.List;

@Service
public class ChatService {

    private final GeminiService geminiService;
    private final ObjectMapper objectMapper;

    public static final List<String> EMERGENCY_KEYWORDS = Arrays.asList(
        "emergency", "help", "suicide", "abuse", "violence", "rape", "assault", "crisis", "threat", "danger"
    );

    public ChatService(GeminiService geminiService, ObjectMapper objectMapper) {
        this.geminiService = geminiService;
        this.objectMapper = objectMapper;
    }

    public ChatResponse processMessage(String userInput, String language) {
        String normalized = userInput.toLowerCase().trim();

        if (isEmergency(normalized)) {
            return new ChatResponse("Emergency detected. Please contact emergency services immediately.", "emergency");
        }

        // Use Gemini for generating responses
        String geminiResponse = geminiService.sendMessage(userInput, language);
        try {
            JsonNode jsonNode = objectMapper.readTree(geminiResponse);
            String answerText = jsonNode.get("answer_text").asText();
            return new ChatResponse(answerText, "gemini");
        } catch (Exception e) {
            return new ChatResponse("I'm sorry, there was an error processing your request.", "error");
        }
    }

    private boolean isEmergency(String message) {
        return EMERGENCY_KEYWORDS.stream().anyMatch(message::contains);
    }
}