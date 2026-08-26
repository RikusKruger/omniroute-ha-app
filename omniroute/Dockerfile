ARG BUILD_FROM=ghcr.io/hassio-addons/base:21.0.1
FROM $BUILD_FROM

# Install Node.js
RUN apk add --no-cache nodejs npm

# Set working directory
WORKDIR /app

# Install the latest global OmniRoute directly from NPM
RUN npm install -g omniroute@latest

# Copy the HA bootstrap script
COPY run.sh /run.sh
RUN chmod a+x /run.sh

CMD [ "/run.sh" ]