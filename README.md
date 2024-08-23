# inetum_project - Event Management Application

## Overview

### Description

API and Frontend for the event management application developed as part of the TP FINAL project. This application allows users to create, manage, and participate in events through an intuitive user interface and an integrated notification system.


### Color palette
https://coolors.co/264653-2a9d8f-e9c46a-f4a261-e76f51

**#264653**, **#2a9d8f**, **#e9c46a**, **#f4a261**, **#e76f51**

![Events-palette-hex](https://github.com/user-attachments/assets/ac213551-222d-4827-9f4e-ca302677a997)


### Language

**Backend:**

[![Made with Java](https://img.shields.io/badge/Made%20with-Java-orange)](https://www.java.com/)  
[![Made with Spring Boot](https://img.shields.io/badge/Made%20with-Spring%20Boot-green)](https://spring.io/projects/spring-boot)

**Frontend:**

[![Made with Angular](https://img.shields.io/badge/Made%20with-Angular-red)](https://angular.io/)

## Requirements

To run the TP FINAL application locally, ensure you have the following tools installed:

- [Java JDK 21](https://www.oracle.com/fr/java/technologies/downloads/#java21)
- [Angular CLI](https://angular.io/cli)
- [MySQL](https://www.mysql.com/)

## Installation Procedure for Developers

Follow the steps below to set up the development environment for TP FINAL.

### 1. Clone the Repository

```bash
git clone https://github.com/wosaline/inetum_project.git
```

Navigate to the API's working directory

```bash
cd tp-final
```

### 2. Backend Setup

Navigate to the eventsAppBackend directory:

```bash	
cd eventsAppBackend
```

Create a configuration file **.env** :

```bash
DATABASE_PASSWORD=[YourSQLPassword]
```

### 3. Database Setup

Create database using the file **schema.sql** that can be found in eventsAppBackend/src/main/resources

The database must be accessible on port 3306

### 4. Frontend Setup

Navigate to the eventsAppFrontend directory:

```bash	
cd eventsAppFrontend
```

Install the necessary dependencies:

```bash	
npm install
```

Start the Angular development server:

```bash	
ng serve
```

## Contributors

- [Rosaline](https://github.com/wosaline)
- [Hatem](https://github.com/hatem-marzougui)
- [Gill Christ](https://github.com/gbiyoghe27)
- [Anliat](https://github.com/moleela) 
