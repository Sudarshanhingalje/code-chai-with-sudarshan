---
title: "Why hashCode() Actually Matters in Java"
description: "A quick, practical look at why overriding hashCode() properly is not optional if you care about your objects working right in collections."
date: 2026-07-24
tags: [java, hashcode, equals, collections, interview-prep]
category: tech
coverImage: /images/blog/hascode-explained.png
author: Sudarshan
featured: false
draft: true
---

Why hashCode() Actually Matters in Java

Most of us learn equals() and hashCode() together in college, write them once with the IDE auto-generate button, and never really think about them again. But last week I was debugging a weird bug where a HashSet was letting in "duplicate" objects that should've been rejected, and it made me actually sit down and understand why hashCode() is such a big deal.

The short version

hashCode() is what hash-based collections (HashMap, HashSet, Hashtable) use to decide which bucket an object goes into. Before Java even checks equals(), it uses the hash code to narrow down where to look. If two "equal" objects give different hash codes, the collection will never even compare them with equals() — it'll just think they belong in different buckets and treat them as different entries.

That's the whole bug in one line: if you override equals() but not hashCode(), your objects can be "equal" but still act like duplicates in a HashSet/HashMap.

A small example
class Employee {
    int id;
    String name;

    Employee(int id, String name) {
        this.id = id;
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Employee)) return false;
        Employee e = (Employee) o;
        return id == e.id;
    }

    // no hashCode() override — this is the mistake
}
If you put two Employee objects with the same id into a HashSet, both will get added — even though equals() says they're the same. Why? Because the default hashCode() (from Object) is based on memory address, so two different objects almost always get different hash codes, and the set never bothers to call equals() on them.

The fix is simple:

java
@Override
public int hashCode() {
    return Objects.hash(id);
}

Now both objects hash to the same bucket, equals() gets called, and the set correctly treats them as duplicates.

The rule to remember

If you override equals(), you must override hashCode() too — and they need to agree. Java's own contract says: equal objects must have equal hash codes (the reverse isn't required — unequal objects can share a hash code, that's just a collision, and that's fine).

Break this rule and you get subtle bugs: objects vanishing from sets, map.get() returning null for a key that "should" exist, duplicate entries where you expected none. These are the kind of bugs that don't show up in a quick test but bite you in production once your data grows.

Interview angle

This also happens to be a classic interview question, and now I actually understand why it's asked instead of just reciting "always override both." If you ever get asked "why override hashCode() with equals()," the buckets explanation above is the real answer — not just "because it's a rule."

That's it — a small thing, but it's one of those Java basics that quietly decides whether your collections behave correctly or not.