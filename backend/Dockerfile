FROM openjdk:21
EXPOSE 8080
ARG JAR_FILE=target/Intellident-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
EXPOSE 8080