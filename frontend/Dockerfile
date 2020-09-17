# Use an official node runtime as a parent image
FROM node:14

WORKDIR /app/frontend

# Install dependencies
COPY package.json yarn.lock /app/frontend/

RUN yarn

# Add rest of the client code
COPY . /app/frontend/

EXPOSE 3001

CMD yarn start