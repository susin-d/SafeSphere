package com.safesphere.model;

import jakarta.persistence.*;

@Entity
public class LegalArticle {

    @Id
    @GeneratedValue
    private Long id;

    private String title;

    private String category;

    @Column(length=5000)
    private String content;

    // getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

}