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
docker container create --name eventbox-admin-1.0.0 -p 8080:80 eventbox/admin:1.0.0
```

#### run container
```bash
docker start eventbox-admin-1.0.0
```