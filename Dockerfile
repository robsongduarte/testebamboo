FROM node:10-alpine as builder
RUN npm install -g @angular/cli
RUN apk add --update git openssh

RUN mkdir ./GOVC-AWS-WEB

COPY package.json ./GOVC-AWS-WEB/


WORKDIR ./GOVC-AWS-WEB
COPY . .

RUN npm install

RUN ng build --configuration=dev_aws

FROM nginx:1.13.3-alpine

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
COPY /dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]
