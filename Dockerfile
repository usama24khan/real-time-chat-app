# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
# Using /usr/src/app as a conventional working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
# This allows Docker to cache the npm install step, improving build times
COPY backend/package*.json ./backend/

# Change to the backend directory in the container
WORKDIR /usr/src/app/backend

# Install application dependencies
# Use --production flag if you only need production dependencies
RUN npm install --production

# Copy the rest of the application code to the working directory
# Copy the entire backend and public directories to the working directory
COPY backend/ /usr/src/app/backend
COPY Public/ /usr/src/app/Public

# Expose the port the app runs on
EXPOSE 3000

# Define environment variable for the port
ENV PORT=3000

# Define the command to run the application
# Using node instead of nodemon for production
CMD ["node", "server.js"]
