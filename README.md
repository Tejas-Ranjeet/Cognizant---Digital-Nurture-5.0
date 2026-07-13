# Cognizant Digital Nurture 5.0

This repository contains my weekly assignments, hands-on exercises, and projects completed as part of the **Cognizant Digital Nurture 5.0** Program. The repository demonstrates practical implementation of Java programming, Design Patterns, Spring Framework, Spring Boot, RESTful Web Services, and Spring Cloud Microservices.

---

## Repository Structure

```text
Cognizant---Digital-Nurture-5.0
│
├── Week 1
│   ├── Data Structure and Algorithm Assignment
│   ├── DesignPrincipleAssignment
│   └── TDD using JUnit5 and Mockito
│
├── Week 2
│   ├── LibraryManagement
│   ├── LibraryManagement_DI
│   └── LibraryManagement_Maven
│
├── Week 3
│   ├── Exercise 01 - spring-learn
│   ├── Exercise 02 - Hands-on-4 - Spring Core - Load Country from Spring Configuration XML
│   ├── Exercise 03 - Hello World RESTful Web Service
│   ├── Exercise 04 - REST - Country Web Service
│   ├── Exercise 05 - REST - Get Country based on Country Code
│   └── Exercise 06 - Create Authentication Service that returns JWT
│
├── Week 4
│   ├── eureka-server
│   ├── account-service
│   ├── loan-service
│   └── api-gateway
│
├── README.md
└── .gitignore
```

---

## Technologies Used

- Java 21
- Maven
- Spring Framework
- Spring Core
- Spring Boot 3
- Spring Dependency Injection (IoC)
- Spring AOP
- Spring Web MVC
- Spring Boot REST
- Spring Cloud
- Netflix Eureka Server
- Spring Cloud Gateway
- RESTful Web Services
- JWT Authentication
- Git & GitHub

---

## Week-wise Contents

### Week 1
- Data Structure and Algorithm Assignments
- Design Principles
- Singleton Design Pattern
- Factory Method Design Pattern
- Test Driven Development using JUnit 5 and Mockito

---

### Week 2
- Spring Framework Basics
- Dependency Injection (IoC)
- Bean Configuration
- Maven Project Setup
- Spring Dependency Management

---

### Week 3
- Spring Boot Fundamentals
- RESTful Web Services
- Spring MVC
- Country REST API
- JWT Authentication Service
- Spring Boot Project Development

---

### Week 4
### Spring Boot 3 & Spring Cloud Microservices

- Eureka Server
- Account Service
- Loan Service
- API Gateway
- Service Discovery
- REST API Development
- Spring Cloud Gateway Routing
- Microservices Architecture

---

## Microservices Architecture

```text
                     +----------------------+
                     |     API Gateway      |
                     |      Port : 8083     |
                     +----------+-----------+
                                |
          ---------------------------------------------
          |                                           |
+----------------------+                 +----------------------+
|   Account Service    |                 |    Loan Service      |
|      Port : 8081     |                 |      Port : 8082     |
+----------------------+                 +----------------------+
                 \                         /
                  \                       /
                   \                     /
                  +-------------------------+
                  |      Eureka Server      |
                  |       Port : 8761       |
                  +-------------------------+
```

---

## How to Run

### Java Projects

Open the project in any Java IDE:

- Visual Studio Code
- IntelliJ IDEA
- Eclipse

Compile and run the required Java class.

---

### Maven Projects

Navigate to the project directory and execute:

```bash
mvn clean install
mvn spring-boot:run
```

---

### Microservices Execution Order

Start the applications in the following order:

1. Eureka Server
2. Account Service
3. Loan Service
4. API Gateway

After all services start successfully, access the Eureka Dashboard:

```
http://localhost:8761
```

---

## Learning Outcomes

Throughout this program, I gained practical experience in:

- Object-Oriented Programming
- Data Structures and Algorithms
- Design Patterns
- Test Driven Development (TDD)
- Maven Build Management
- Spring Framework
- Dependency Injection (IoC)
- Spring Boot
- REST API Development
- JWT Authentication
- Spring Cloud
- Netflix Eureka
- API Gateway
- Microservices Architecture
- Git & GitHub Version Control

---

## Author

**Tejas Ranjeet**

B.Tech Computer Science and Engineering  
VIT Bhopal University

---

This repository will continue to be updated with additional assignments, hands-on exercises, and projects completed during the **Cognizant Digital Nurture 5.0** Program.
