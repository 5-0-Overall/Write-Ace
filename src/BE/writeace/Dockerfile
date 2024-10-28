# Use Node.js as the base image
FROM node:18-alpine

# Create a working directory
WORKDIR /usr/src/app

# Install necessary tools, including PostgreSQL client
RUN apk add --no-cache wget tar netcat-openbsd postgresql-client

# Copy wait-for-it.sh script to the working directory
COPY wait-for-it.sh /usr/src/app/wait-for-it.sh
RUN chmod +x /usr/src/app/wait-for-it.sh

# Copy package.json and package-lock.json if available
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code into container
COPY . .

# Copy migrations
COPY migrations ./migrations

# Build the application
RUN npm run build

# Install Flyway
RUN wget -qO- https://repo1.maven.org/maven2/org/flywaydb/flyway-commandline/8.5.13/flyway-commandline-8.5.13-linux-x64.tar.gz | tar xvz && \
    ln -s /usr/src/app/flyway-8.5.13/flyway /usr/local/bin/flyway

# Expose the port the app runs on
EXPOSE 3000

# Use wait-for-it.sh to wait for the database
ENTRYPOINT ["/usr/src/app/wait-for-it.sh", "db", "--"]

# Start the application
CMD ["npm", "run", "start:prod"]
