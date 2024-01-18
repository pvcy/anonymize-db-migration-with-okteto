FROM node:bullseye-slim
RUN apt-get update && apt-get install postgresql-client -y

WORKDIR /app
COPY ./users-api/src/package*.json .
RUN npm install

COPY ./users-api/src .
COPY ./users-api/data .

EXPOSE 8080

CMD ["./docker-entrypoint.sh"]
