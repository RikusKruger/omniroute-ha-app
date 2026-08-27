# 1. Use the official image
FROM diegosouzapw/omniroute:latest

# 2. Switch to root user
USER root

# 3. FIX THE AUTHOR'S BUG: Force-install the missing tsx engine
RUN cd /app && npm install tsx

# 4. Copy and run our bridge script
COPY run.js /run.js
CMD ["node", "/run.js"]