# specify a base image
FROM ubuntu:latest

# Install some dependecies
USER root
WORKDIR /home/app
COPY ./ /home/app/
RUN apt-get update
RUN apt-get -y install curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_18.x  | bash -
RUN apt-get -y install nodejs
RUN npm install

# Default command
CMD ["npm", "start"]