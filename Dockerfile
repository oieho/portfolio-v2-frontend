# Set the base image to Node 16
FROM node:16-alpine

# Set the working directory in the container to /app
WORKDIR /src

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies quietly
RUN npm install --quiet

# Copy the rest of the application code to the container
COPY . .

# Build the application
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Run the command to start the server
CMD ["npm", "start"]