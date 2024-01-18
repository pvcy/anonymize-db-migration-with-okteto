FROM nginx:alpine
WORKDIR /usr/share/nginx

# Remove default nginx static assets
RUN rm -rf ./*

COPY ./users-ui/src ./html

ENTRYPOINT ["nginx", "-g", "daemon off;"]
