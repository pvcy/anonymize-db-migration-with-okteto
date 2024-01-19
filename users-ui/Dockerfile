FROM nginx:alpine

COPY nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY src /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]
