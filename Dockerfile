# Use the official Node.js image
FROM node:14

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install production dependencies
RUN npm install --only=production

# Copy the rest of your app's code
COPY . .

# Expose the port your app runs on
EXPOSE 5000

# Define the command to run your app
CMD [ "node", "server.js" ]
