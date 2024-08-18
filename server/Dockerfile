FROM node:20

ARG ENV

WORKDIR /app

COPY . /app

# Install dependencies
RUN npm install

# Run the application
CMD [ "node", "index" ]