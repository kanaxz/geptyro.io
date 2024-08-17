FROM node:20

ARG ENV

WORKDIR /app

COPY . /app

# Copy SSL certificates
COPY certs/${ENV} /etc/ssl/

# Install dependencies
RUN npm install

# Expose the port the app runs on
EXPOSE 10002

# Run the application
CMD [ "node", "index" ]