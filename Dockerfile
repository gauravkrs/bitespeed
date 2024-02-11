# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory
WORKDIR src/index

# Copy package.json and package-lock.json
COPY package.json ./

# Install any dependencies
RUN npm install

# Copy the rest of your app's source code
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

EXPOSE 3005

# Command to run the app
CMD ["npm", "start"]