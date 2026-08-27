# 1. Use the official Node 20 image
FROM node:20-alpine

# 2. Install OmniRoute globally from NPM
RUN npm install -g omniroute@latest

# 3. HOT-PATCH THE DEVELOPER's BUG! 
# This command physically searches the broken file and wraps their illegal 'await' command in a valid async wrapper.
RUN sed -i 's/await init_auth();/(async () => { await init_auth(); })();/g' /usr/local/lib/node_modules/omniroute/dist/open-sse/mcp-server/server.js

# 4. Copy our Node boot script and run it
COPY run.js /run.js
CMD ["node", "/run.js"]