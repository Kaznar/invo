# ---- Stage 1: Build ----
FROM node:22-alpine AS build

WORKDIR /app

# Install dependencies first (better layer caching)
COPY package.json yarn.lock* ./
RUN corepack enable && yarn install --frozen-lockfile 2>/dev/null || yarn install

# Copy source and build
COPY . .
RUN yarn build

# ---- Stage 2: Serve ----
FROM nginx:1.27-alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built static files from build stage
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
