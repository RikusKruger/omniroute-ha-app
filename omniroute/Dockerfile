ARG BUILD_FROM=ghcr.io/hassio-addons/base:21.0.1
FROM $BUILD_FROM

# Install Node.js, npm, and git (required to clone from GitHub)
RUN apk add --no-cache nodejs npm git

# Set working directory
WORKDIR /app

# Bypass the broken NPM release and install directly from the master branch!
RUN npm install -g git+https://github.com/diegosouzapw/OmniRoute.git

# Copy the HA bootstrap script
COPY run.sh /run.sh
RUN chmod a+x /run.sh

CMD [ "/run.sh" ]