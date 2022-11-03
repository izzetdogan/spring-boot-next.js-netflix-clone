FROM  openjdk:17
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} MovieAPI-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar", "/MovieAPI-0.0.1-SNAPSHOT.jar"]