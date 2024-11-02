#### EventBox/Admin:1.0.0

#### Build jar
```bash
./mvnw clean package spring-boot:repackage
```

#### build docker image
```bash
docker build -t eventbox/admin:1.0.0 .
```

#### build container
```bash
docker container create --name eventbox-admin-1.0.0 --publish 8080:80 eventbox/admin:1.0.0
```

#### run container
```bash
docker start -a eventbox-admin-1.0.0
```

$$\color{red}Important$$ : The service whithin the container will be reachable at **http://host.docker.internal:8080**
