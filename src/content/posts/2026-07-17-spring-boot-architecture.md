---
title: "Clean Architecture in Spring Boot Microservices"
description: "A deep dive into structuring Spring Boot applications for scale, testability, and clarity."
date: 2026-07-17
tags: [spring, java, backend]
category: tech
coverImage: ""
author: Sudarshan
featured: true
draft: false
---

When building microservices with **Spring Boot**, one of the most critical decisions is how to structure the codebase. A poorly organized application can quickly become a "ball of mud," making it hard to maintain, test, and scale.

In this tech note, we will look at how to implement **Clean Architecture** patterns in Spring Boot applications.

## Core Layers of Clean Architecture

To keep our application modular, we split it into three primary layers:

1. **Domain Layer**: Contains entities, business logic, and rules. It has *zero* dependencies on external libraries or other layers.
2. **Use Case (Application) Layer**: Orchestrates the flow of data to and from the domain entities. Defines interfaces (ports) for data access.
3. **Infrastructure Layer**: Implements database repositories, web controllers, configurations, and third-party integrations (adapters).

### Directory Layout

A standard package structure looks like this:

```text
com.sudarshan.blog
├── domain
│   ├── model       // Plain Java Entities
│   └── exception   // Business exceptions
├── application
│   ├── port        // Incoming (Use Cases) & Outgoing (Repositories) interfaces
│   └── service     // Core use case implementations
└── infrastructure
    ├── adapter     // RestControllers (web) & JPA repositories (persistence)
    └── config      // Spring Configuration beans
```

### Example: Defining Ports and Adapters

By using interfaces for our persistence layer, we decouple the core logic from Spring Data JPA or any specific SQL database:

```java
// Under application/port
public interface PostRepository {
    Optional<Post> findById(Long id);
    Post save(Post post);
}
```

Then, in the infrastructure layer, we implement this interface using a Spring Data repository wrapper:

```java
// Under infrastructure/adapter/persistence
@Component
public class PostJpaAdapter implements PostRepository {
    private final SpringDataPostRepository jpaRepository;

    public PostJpaAdapter(SpringDataPostRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    public Optional<Post> findById(Long id) {
        return jpaRepository.findById(id).map(PostEntity::toDomain);
    }

    @Override
    public Post save(Post post) {
        PostEntity entity = PostEntity.fromDomain(post);
        return jpaRepository.save(entity).toDomain();
    }
}
```

This structure makes it incredibly simple to write unit tests for the domain and service layers without needing to boot up a full Spring Application Context.

What are your thoughts on this architecture? Let me know in the contact page!
