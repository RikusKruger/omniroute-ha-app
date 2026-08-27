ARG BUILD_FROM=ghcr.io/hassio-addons/base:21.0.1

FROM diegosouzapw/omniroute:latest AS upstream

FROM $BUILD_FROM

# 1. Install Node.js, the glibc compatibility layers, and dos2unix
RUN apk add --no-cache nodejs npm gcompat libc6-compat dos2unix

WORKDIR /app

# 2. Copy the pre-built Debian files
COPY --from=upstream /app /app

# 3. Link the package globally
RUN cd /app && npm link --ignore-scripts

# 4. Copy the script, scrub invisible Windows line endings, and make executable
COPY run.sh /run.sh
RUN dos2unix /run.sh && chmod a+x /run.sh

CMD [ "/run.sh" ]