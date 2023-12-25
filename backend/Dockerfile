FROM maven:3.8.5-openjdk-17 as build
COPY . .
RUN mvn clean package -DskipTests


FROM maven:3.8.5-openjdk-17-slim
COPY --from=build /target/IntelliDent-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]