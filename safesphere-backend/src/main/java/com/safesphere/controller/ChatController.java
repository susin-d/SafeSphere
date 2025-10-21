package com.safesphere.controller;

import org.springframework.web.bind.annotation.*;
import com.safesphere.service.ChatService;
import com.safesphere.dto.ChatRequest;
import com.safesphere.dto.ChatResponse;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "http://localhost:3000")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping
    public ChatResponse handleChat(@RequestBody ChatRequest chatRequest) {
        return chatService.processMessage(chatRequest.getMessage(), chatRequest.getLanguage());
    }
}