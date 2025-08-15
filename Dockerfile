FROM node:14.20.0-alpine3.16 as build

RUN apk add git --no-cache
WORKDIR "/src"


RUN yarn install && yarn cache clean
COPY . /src
# Install dependencies

# Use the secure production build with obfuscation
ENV NODE_ENV=production
RUN yarn build:ctf

FROM scratch AS export
WORKDIR /
COPY --from=build /src/build/index.html .
COPY --from=build /src/build ./build

FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html/

# Only copy the built artifacts (no source code)
COPY --from=export . .

# Add nginx configuration to block access to source directories
RUN rm /etc/nginx/conf.d/default.conf
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    \
    # Security: Block access to source directories \
    location /src/ { \
        deny all; \
        return 404; \
    } \
    \
    location /node_modules/ { \
        deny all; \
        return 404; \
    } \
    \
    location ~ /\\. { \
        deny all; \
        return 404; \
    } \
    \
    # Serve static files \
    location / { \
        try_files $uri $uri/ /index.html; \
        add_header Cache-Control "no-cache, no-store, must-revalidate"; \
    } \
    \
    # Handle JS and CSS files \
    location ~* \\.(js|css)$ { \
        expires 1y; \
        add_header Cache-Control "public, immutable"; \
    } \
}' > /etc/nginx/conf.d/default.conf