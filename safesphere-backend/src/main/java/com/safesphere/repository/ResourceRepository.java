package com.safesphere.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.safesphere.model.Resource;

import java.util.List;

public interface ResourceRepository extends JpaRepository<Resource, Long> {

    List<Resource> findByResourceTypeIgnoreCase(String resourceType);

}