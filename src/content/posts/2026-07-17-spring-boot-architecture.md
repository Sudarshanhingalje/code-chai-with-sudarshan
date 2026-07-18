---
title: "Clean Architecture in Spring Boot Microservices"
description: "A practical guide to structuring Spring Boot applications using Clean Architecture — domain layers, ports & adapters, and testable service design."
date: 2026-07-17
tags: [spring, java, backend, microservices, architecture]
category: tech
coverImage: /code-chai-with-sudarshan/images/spring-boot.png
author: Sudarshan Hingalje
featured: true
draft: false
---

When building microservices with **Spring Boot**, one of the most critical decisions is how to structure the codebase. A poorly organized application becomes a "big ball of mud" — hard to test, hard to scale, hard to hand off to another developer.

In this post, I'll walk through **Clean Architecture** patterns applied specifically to Spring Boot.

## Why Clean Architecture?

The goal is simple: **your business logic should not depend on your framework**.

Spring Boot is amazing but it's a detail — an implementation choice. Your domain entities and use cases should work even if you swap Spring for Quarkus tomorrow.

## The Three Core Layers

```
com.sudarshan.blog
├── domain          ← Pure Java, zero framework dependencies
│   ├── model       ← Entities and value objects
│   └── exception   ← Business exceptions
├── application     ← Use cases and port interfaces
│   ├── port
│   │   ├── in      ← Use Case interfaces (Incoming)
│   │   └── out     ← Repository interfaces (Outgoing)
│   └── service     ← Use case implementations
└── infrastructure  ← Spring, JPA, REST, configs
    ├── adapter
    │   ├── web     ← @RestController (incoming adapter)
    │   └── persist ← JPA repository (outgoing adapter)
    └── config      ← Spring @Configuration beans
```

## Domain Layer — Zero Dependencies

```java
// domain/model/Post.java
public class Post {
    private final Long id;
    private final String title;
    private final String content;
    private final LocalDate publishedAt;
    private final boolean draft;

    // Constructor, getters — no Spring annotations here!
}
```

Notice — **no `@Entity`, no `@Column`**. Just plain Java.

## Application Layer — Ports (Interfaces)

```java
// application/port/out/PostRepository.java
public interface PostRepository {
    Optional<Post> findById(Long id);
    List<Post> findAllPublished();
    Post save(Post post);
}

// application/port/in/GetPostUseCase.java
public interface GetPostUseCase {
    Post getPost(Long postId);
}
```

## Application Layer — Service (Use Case Implementation)

```java
// application/service/PostService.java
@Service
@Transactional
@RequiredArgsConstructor
public class PostService implements GetPostUseCase {

    private final PostRepository postRepository; // injected interface, not JPA!

    @Override
    public Post getPost(Long postId) {
        return postRepository.findById(postId)
            .orElseThrow(() -> new PostNotFoundException(postId));
    }
}
```

## Infrastructure — JPA Adapter (Outgoing)

```java
// infrastructure/adapter/persist/PostJpaAdapter.java
@Component
@RequiredArgsConstructor
public class PostJpaAdapter implements PostRepository {

    private final SpringDataPostRepository jpaRepo;

    @Override
    public Optional<Post> findById(Long id) {
        return jpaRepo.findById(id)
                      .map(PostEntity::toDomain);
    }

    @Override
    public Post save(Post post) {
        PostEntity entity = PostEntity.fromDomain(post);
        return jpaRepo.save(entity).toDomain();
    }
}
```

## Infrastructure — REST Controller (Incoming)

```java
// infrastructure/adapter/web/PostController.java
@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {

    private final GetPostUseCase getPostUseCase;

    @GetMapping("/{id}")
    public ResponseEntity<PostResponse> getPost(@PathVariable Long id) {
        Post post = getPostUseCase.getPost(id);
        return ResponseEntity.ok(PostResponse.from(post));
    }
}
```

## Why This Structure Wins

| Benefit | Explanation |
|---|---|
| **Testable** | Unit test `PostService` with a mock `PostRepository` — no Spring context needed |
| **Swappable** | Replace JPA with MongoDB? Just write a new adapter |
| **Clear ownership** | Every class has one reason to exist |
| **No circular dependencies** | Domain ← Application ← Infrastructure (one direction only) |

---

This architecture saved me hours of debugging on a recent project. Start simple, add complexity only when needed. Next post: **testing this architecture with JUnit 5 + Mockito** without loading Spring context.
