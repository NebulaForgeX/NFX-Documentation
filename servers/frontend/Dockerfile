# syntax=docker/dockerfile:1
# Same as the other NFX consoles: nfx-ui is the pinned npm package, not a local image.
FROM node:22-alpine AS deps
WORKDIR /app
ARG VITE_BASE=/documentation/
ARG BACKEND_HOST=localhost
ARG BACKEND_PORT=10153
ENV VITE_BASE=${VITE_BASE}
ENV BACKEND_HOST=${BACKEND_HOST}
ENV BACKEND_PORT=${BACKEND_PORT}
COPY package.json package-lock.json ./
RUN npm install
COPY . .

FROM deps AS builder
ENV DOCKER_BUILD=1
RUN npm run build

FROM nginx:alpine AS secure
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
