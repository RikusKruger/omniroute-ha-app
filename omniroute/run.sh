#!/usr/bin/env bashio

bashio::log.info "Booting OmniRoute Home Assistant Add-on..."

# 1. Pull user settings directly from the Home Assistant UI
MAX_MEMORY=$(bashio::config 'MAX_MEMORY_MB')
DEFAULT_MODEL=$(bashio::config 'DEFAULT_MODEL')
OPENAI_KEY=$(bashio::config 'OPENAI_API_KEY')
ANTHROPIC_KEY=$(bashio::config 'ANTHROPIC_API_KEY')
MCP_ENABLED=$(bashio::config 'ENABLE_MCP')

# 2. Extract the dynamic Ingress port HA assigned for the Web UI
INGRESS_PORT=$(bashio::addon.ingress_port)

# 3. Build the .env file for OmniRoute dynamically
bashio::log.info "Injecting environment variables..."
cat << EOF > /app/.env
PORT=20128
WEB_PORT=${INGRESS_PORT}
DEFAULT_MODEL=${DEFAULT_MODEL}
OPENAI_API_KEY=${OPENAI_KEY}
ANTHROPIC_API_KEY=${ANTHROPIC_KEY}
EOF

# 4. Set strict Node.js memory limits based on HA UI config
export NODE_OPTIONS="--max-old-space-size=${MAX_MEMORY}"

# 5. Launch execution
if bashio::var.true "${MCP_ENABLED}"; then
    bashio::log.info "Starting OmniRoute with MCP enabled..."
    exec npx omniroute --mcp
else
    bashio::log.info "Starting OmniRoute..."
    exec npx omniroute
fi