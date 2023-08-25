# Set the base image to Node 16
FROM node:16-alpine

# root �� app ������ ����
RUN mkdir /app

# work dir ����
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies quietly
RUN npm install --quiet

# Copy the rest of the application code to the container
COPY . .

# Build the application
RUN nixpacks build ./app --name my-app

# Expose port 3000
EXPOSE 3000

# Run the command to start the server
CMD ["npm", "start"]