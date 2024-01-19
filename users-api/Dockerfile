FROM node:bullseye-slim
RUN apt-get update && apt-get install postgresql-client -y

WORKDIR /app
COPY src/package*.json .
RUN npm install

COPY src ./

EXPOSE 8080

CMD ["./docker-entrypoint.sh"]
