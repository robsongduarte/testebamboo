# Estagio 1 - Será responsavel em construir nossa aplicação
FROM node:9.11.2-slim as node
WORKDIR /app
COPY package.json /app/
RUN npm install
COPY ./ /app/
ARG env=prod
RUN ng build --configuration=dev_aws

# Estagio 2 - Será responsavel por expor a aplicação
FROM nginx:alpine
COPY --from=node /app/dist /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
