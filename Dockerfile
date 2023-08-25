# Stage 1: Compile and build the app

# Set the build stage image to Node 16
FROM node:16-alpine as build

# Set the working directory in the container to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies quietly
RUN npm install --quiet

# Copy the rest of the application code to the container
COPY . .

# Build the application
RUN npm run build


# Stage 2: Serve app with nginx

# Set the base running image to nginx Alpine
FROM nginx:alpine-perl

# Copy the output from the build stage
COPY --from=build /app/dist/oieho /usr/share/nginx/html

# Expose port 80
EXPOSE 80