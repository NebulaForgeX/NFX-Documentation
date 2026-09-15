# syntax=docker/dockerfile:1
FROM node:22-alpine AS builder

WORKDIR /app

ARG BACKEND_HOST=localhost
ARG BACKEND_PORT=10153
ENV BACKEND_HOST=${BACKEND_HOST}
ENV BACKEND_PORT=${BACKEND_PORT}

COPY package.json package-lock.json ./
COPY --from=nfx-ui . /NFX-UI
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
