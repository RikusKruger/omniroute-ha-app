# 1. Use the EXACT official image. No Alpine, no compiling.
FROM diegosouzapw/omniroute:latest

# 2. Switch to root user so Home Assistant can read the config files
USER root

# 3. Copy our tiny Node.js bridge script
COPY run.js /run.js

# 4. Boot the script
CMD ["node", "/run.js"]