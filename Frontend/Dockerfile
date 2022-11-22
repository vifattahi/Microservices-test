# specify a base image
FROM node:alpine

# Install some dependecies
WORKDIR /home/app
COPY ./ /home/app/
RUN npm install

# Default command
CMD ["npm", "start"]