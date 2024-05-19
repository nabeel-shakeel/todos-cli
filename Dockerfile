# Step 1: Build Image
FROM node:20-alpine AS builder


WORKDIR /app

# Copy package.json and yarn.lock file
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy pplication code
COPY . .

# Build the project
RUN yarn build

# Step 2: Runner Image
FROM node:20-alpine

# Create and set the working directory
WORKDIR /app

# Copy the built application from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json .
COPY --from=builder /app/index.js .

# Use ENTRYPOINT to handle arguments properly
ENTRYPOINT ["npx", "td"]
