FROM node:bullseye-slim

WORKDIR /app
COPY ./users-api/src/package*.json .
RUN npm install

COPY ./users-api/src .
COPY ./users-api/data .

EXPOSE 8080

CMD ["./docker-entrypoint.sh"]
