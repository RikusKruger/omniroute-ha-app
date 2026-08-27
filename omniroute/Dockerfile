# Explicitly demand Node 22 so Docker cannot use the cached Node 20 image
FROM node:22-alpine

RUN npm install -g omniroute@latest
RUN sed -i 's/await init_auth();/(async () => { await init_auth(); })();/g' /usr/local/lib/node_modules/omniroute/dist/open-sse/mcp-server/server.js

COPY run.js /run.js
CMD ["node", "/run.js"]