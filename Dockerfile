# eventbox/admin
# VERSION : 1.0.0

FROM eclipse-temurin:11-alpine

#RUN addgroup -S spring && adduser -S spring -G spring
#USER spring:spring

ENV APP_NAME="eventbox-admin-1.0.0.jar"

RUN mkdir /opt/app
COPY target/$APP_NAME /opt/app

WORKDIR /opt/app
CMD ["sh" , "-c" , "java -jar $APP_NAME"]
