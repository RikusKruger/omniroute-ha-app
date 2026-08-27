# 1. Use the absolute latest, stable Node LTS image!
FROM node:lts-alpine

# 2. Install OmniRoute globally from NPM
RUN npm install -g omniroute@latest

# 3. HOT-PATCH THE DEVELOPER's BUG! 
RUN sed -i 's/await init_auth();/(async () => { await init_auth(); })();/g' /usr/local/lib/node_modules/omniroute/dist/open-sse/mcp-server/server.js

# 4. Copy our Node boot script and run it
COPY run.js /run.js
CMD ["node", "/run.js"]