package com.safesphere.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.safesphere.model.LegalArticle;

import java.util.List;

public interface LegalArticleRepository extends JpaRepository<LegalArticle, Long> {

    List<LegalArticle> findByTitleContainingIgnoreCaseOrContentContainingIgnoreCase(String title, String content);

}