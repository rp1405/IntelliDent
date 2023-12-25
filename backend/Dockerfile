FROM maven:3.9.6-eclipse-temurin-21 as build
COPY . .
RUN mvn clean package -DskipTests


FROM ubuntu:22.04
COPY --from=build /target/IntelliDent-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]