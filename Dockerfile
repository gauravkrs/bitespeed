# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory
WORKDIR /usr/src/index

# Copy package.json and package-lock.json
COPY package*.json ./

# Install any dependencies
RUN npm install

# Copy the rest of your app's source code
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

# Command to run the app
CMD ["node", "dist/index.js"]

docker build -t my-typescript-app .

# Run your Docker container
docker run -p 3000:3000 my-typescript-app
