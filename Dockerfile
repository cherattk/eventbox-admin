# eventbox/admin
# VERSION : 1.0.0

FROM eclipse-temurin:11-alpine

#RUN addgroup -S spring && adduser -S spring -G spring
#USER spring:spring

RUN mkdir /opt/app
COPY target/eventbox-admin-1.0.0.jar /opt/app
WORKDIR /opt/app
CMD ["java", "-jar", "eventbox-admin-1.0.0.jar"]
