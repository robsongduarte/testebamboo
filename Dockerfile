FROM node:10-alpine as builder

COPY package.json package-lock.json ./
## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm i && mkdir ./adtech-temp-modules && mv -f node-modules ./adtech-temp-modules

WORKDIR ./adtech-temp-modules

COPY . .
#Build the angular app in production mode and store the artifacts in dist folder
RUN $(npm bin)/ng build --prod

FROM nginx:1.13.3-alpine

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
COPY /dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
