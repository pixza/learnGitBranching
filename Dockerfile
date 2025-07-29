FROM node:14.20.0-alpine3.16 as build

RUN apk add git --no-cache
WORKDIR "/src"

COPY . /src
# Install dependencies
RUN yarn install && yarn cache clean

# Use the secure production build with obfuscation
ENV NODE_ENV=production
RUN yarn gulp productionBuild

FROM scratch AS export
WORKDIR /
COPY --from=build /src/index.html .
COPY --from=build /src/build ./build

FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html/

# Only copy the built artifacts (no source code)
COPY --from=export . .

# Add nginx configuration to block access to source directories
COPY <<EOF /etc/nginx/conf.d/security.conf
# Block access to source directories
location /src/ {
    deny all;
    return 404;
}

location /node_modules/ {
    deny all;
    return 404;
}

location ~ /\. {
    deny all;
    return 404;
}
EOF