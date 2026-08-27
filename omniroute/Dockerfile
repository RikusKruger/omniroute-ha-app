# Use the ultra-stable, official Node 20 image (Bypasses the Node 24 bug!)
FROM node:20-alpine

# Install OmniRoute globally from NPM
RUN npm install -g omniroute@latest

# Copy our Node boot script and run it
COPY run.js /run.js
CMD ["node", "/run.js"]