ARG BUILD_FROM=ghcr.io/hassio-addons/base:21.0.1

# Stage 1: Grab the pre-built application from the author's official image
FROM diegosouzapw/omniroute:latest AS upstream

# Stage 2: Build the Home Assistant Add-on
FROM $BUILD_FROM

# Install Node.js
RUN apk add --no-cache nodejs npm

WORKDIR /app

# Copy the completely pre-built app from the official image into our HA image
COPY --from=upstream /app /app

# Link the command globally, but IGNORE the broken Husky dev scripts!
RUN cd /app && npm link --ignore-scripts

# Copy the HA bootstrap script
COPY run.sh /run.sh
RUN chmod a+x /run.sh

CMD [ "/run.sh" ]