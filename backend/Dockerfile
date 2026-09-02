FROM maven:3.9.4-eclipse-temurin-17 AS build
WORKDIR /app/backend
COPY pom.xml .
COPY src ./src
RUN mvn -DskipTests package

FROM eclipse-temurin:17-jre
WORKDIR /app/backend
COPY --from=build /app/backend/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/backend/app.jar"]
