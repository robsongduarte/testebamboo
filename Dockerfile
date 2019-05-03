FROM sinet/nginx-node:latest

RUN npm install -g @angular/cli
# Install and build the application
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN npm install 

RUN ng build --configuration=dev_aws

COPY default.conf /etc/nginx/conf.d/

CMD ["nginx", "-g", "daemon off;"]