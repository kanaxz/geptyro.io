FROM node:20

ARG ENV

WORKDIR /app

COPY . /app

# Install dependencies
RUN npm install

EXPOSE 10002

# Run the application
CMD [ "node", "index" ]