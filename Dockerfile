FROM eclipse-temurin:11-alpine

RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

RUN mkdir /opt/app
COPY target/eventbox-admin.jar /opt/app
WORKDIR /opt/app
CMD ["java", "-jar", "eventbox-admin.jar"]
