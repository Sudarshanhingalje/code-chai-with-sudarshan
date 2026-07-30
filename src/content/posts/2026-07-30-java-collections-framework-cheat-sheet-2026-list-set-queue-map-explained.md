---
title: "Java Collections Framework Cheat Sheet 2026 – List, Set, Queue & Map Explained"
description: "Master the Java Collections Framework with this one-page cheat sheet. Learn List, Set, Queue, Map, HashMap, TreeMap, HashSet, LinkedHashSet, ArrayList, LinkedList, PriorityQueue, and their time complexities with simple explanations."
date: 2026-07-30
tags: [java, collections, java collections, hashmap, hashset, arraylist, linkedlist, treemap, queue, interview, cheat sheet]
category: tech
coverImage: /images/collection.png
author: Sudarshan
featured: false
draft: false
---

# Java Collections Framework Cheat Sheet 🚀

![Java Collections Framework](https://raw.githubusercontent.com/Sudarshanhingalje/code-chai-with-sudarshan/main/public/images/collection.png)

> One image. Everything you need to revise Java Collections before interviews.

---

# Why Collections?

The Java Collections Framework (JCF) provides ready-made data structures that help you store, manage, and retrieve data efficiently.

Package:

```java
import java.util.*;
```

---

# Collection Hierarchy

```
Object
   │
Collection
   ├── List
   ├── Set
   └── Queue

Map (Separate Interface)
```

---

# List

Stores elements in insertion order.

✅ Ordered

✅ Duplicate values allowed

✅ Index based

### Implementations

| Class | Features |
|--------|----------|
| ArrayList | Fast random access |
| LinkedList | Fast insertion/deletion |
| Vector | Thread-safe (Legacy) |

Common Methods

```java
add()
get()
set()
remove()
contains()
size()
sort()
```

Use When

- Order matters
- Duplicates are allowed
- Need index access

---

# Set

Stores unique elements.

✅ No duplicates

❌ No index

### Implementations

| Class | Features |
|--------|----------|
| HashSet | Fast, unordered |
| LinkedHashSet | Maintains insertion order |
| TreeSet | Sorted order |

Common Methods

```java
add()
remove()
contains()
size()
```

Use When

- Need unique values
- Fast searching
- Remove duplicates

---

# Queue

FIFO (First In First Out)

Common Methods

```java
offer()
poll()
peek()
```

Implementations

- PriorityQueue
- ArrayDeque

Use When

- Scheduling
- Task processing
- BFS Algorithm

---

# Map

Stores data as Key → Value pairs.

Keys must be unique.

### Implementations

| Class | Features |
|--------|----------|
| HashMap | Fast, unordered |
| LinkedHashMap | Insertion order |
| TreeMap | Sorted keys |
| Hashtable | Thread-safe (Legacy) |
| EnumMap | Enum keys only |

Common Methods

```java
put()
get()
remove()
containsKey()
keySet()
values()
entrySet()
```

---

# HashMap

✔ Average Time: O(1)

Features

- Fastest Map
- One null key
- Multiple null values
- Uses Hashing
- Buckets internally

Best for

- Caching
- Lookup
- APIs
- Configurations

---

# HashSet

Internally backed by HashMap.

Features

- Unique values
- Fast lookup
- O(1) average operations

---

# LinkedHashSet

Features

- No duplicates
- Preserves insertion order

---

# TreeMap

Uses Red-Black Tree.

Features

- Sorted keys
- O(log n)
- Natural or Comparator ordering

Useful Methods

```java
firstKey()
lastKey()
floorKey()
ceilingKey()
higherKey()
lowerKey()
```

---

# Time Complexity

| Operation | ArrayList | LinkedList | HashSet | HashMap | TreeMap |
|------------|-----------|------------|----------|----------|----------|
| Add | O(1) | O(1) | O(1) | O(1) | O(log n) |
| Search | O(n) | O(n) | O(1) | O(1) | O(log n) |
| Remove | O(n) | O(1) | O(1) | O(1) | O(log n) |

---

# Interview Tips

## Choose ArrayList

- Frequent reading
- Less insertion/deletion

---

## Choose LinkedList

- Frequent insertion
- Frequent deletion

---

## Choose HashSet

- Unique elements
- Fast lookup

---

## Choose LinkedHashSet

- Unique elements
- Preserve insertion order

---

## Choose TreeSet

- Sorted unique data

---

## Choose HashMap

- Fast key-value storage

---

## Choose LinkedHashMap

- Cache implementation
- Maintain insertion order

---

## Choose TreeMap

- Need sorted keys

---

# Quick Revision

| Interface | Best Implementation |
|------------|--------------------|
| List | ArrayList |
| Set | HashSet |
| Ordered Set | LinkedHashSet |
| Sorted Set | TreeSet |
| Queue | PriorityQueue |
| Map | HashMap |
| Ordered Map | LinkedHashMap |
| Sorted Map | TreeMap |

---

# Key Takeaways

- List → Ordered + Duplicates
- Set → Unique Elements
- Queue → FIFO Processing
- Map → Key-Value Storage
- HashMap → Fastest Lookup
- TreeMap → Sorted Data
- HashSet → Unique Values
- LinkedHashMap → Ordered Map

---

## Final Thoughts

Keep this cheat sheet bookmarked for interview preparation and quick revision. Understanding when to use each collection is more important than memorizing every method.

Happy Coding! ☕
