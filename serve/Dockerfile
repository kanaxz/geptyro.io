FROM node:20

ARG ENV

WORKDIR /app

COPY . /app

# Install dependencies
RUN npm install


RUN apt-get update
RUN apt-get install -y libnss3 libatk-bridge2.0-0 libx11-xcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxtst6 libglib2.0-0 libxrandr2 libgbm1 libasound2 libpangocairo-1.0-0 libatk1.0-0 libcups2 libdrm2 libxkbcommon0

# Run the application
CMD [ "node", "index" ]