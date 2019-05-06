# Estagio 1 - Será responsavel em construir nossa aplicação
FROM node:10.13.0-alpine as node
WORKDIR /app
COPY package.json /app/
RUN apk --no-cache add git
RUN npm install
COPY ./ /app/
ARG env=prod
RUN npm run build

# Estagio 2 - Será responsavel por expor a aplicação
FROM nginx:1.13.3-alpine

## Remove default nginx website
RUN rm -rf C:/Ambiente/nginx-1.15.10/html/*

## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
COPY /dist C:/Ambiente/nginx-1.15.10/html
COPY nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]
