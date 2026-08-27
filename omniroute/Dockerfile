ARG BUILD_FROM=ghcr.io/hassio-addons/base:21.0.1
FROM $BUILD_FROM

# 1. Install Node, Git, and essential compile tools for native modules
RUN apk add --no-cache nodejs npm git python3 make g++

# 2. Set working directory
WORKDIR /app

# 3. Clone the repo, install ALL dependencies, build the source, and link the CLI
RUN git clone https://github.com/diegosouzapw/OmniRoute.git . && \
    npm install && \
    npm run build && \
    npm link

# 4. Copy the HA bootstrap script
COPY run.sh /run.sh
RUN chmod a+x /run.sh

CMD [ "/run.sh" ]