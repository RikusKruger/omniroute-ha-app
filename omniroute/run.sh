#!/usr/bin/env bashio

bashio::log.info "Booting OmniRoute Home Assistant Add-on..."

MAX_MEMORY=$(bashio::config 'MAX_MEMORY_MB')
DEFAULT_MODEL=$(bashio::config 'DEFAULT_MODEL')
OPENAI_KEY=$(bashio::config 'OPENAI_API_KEY')
ANTHROPIC_KEY=$(bashio::config 'ANTHROPIC_API_KEY')
MCP_ENABLED=$(bashio::config 'ENABLE_MCP')
INGRESS_PORT=$(bashio::app.ingress_port)

bashio::log.info "Injecting environment variables..."
cat << EOF > /app/.env
PORT=20128
WEB_PORT=${INGRESS_PORT}
DEFAULT_MODEL=${DEFAULT_MODEL}
OPENAI_API_KEY=${OPENAI_KEY}
ANTHROPIC_API_KEY=${ANTHROPIC_KEY}
EOF

export NODE_OPTIONS="--max-old-space-size=${MAX_MEMORY}"

# Navigate to the app directory
cd /app

# Boot the app natively using NPM!
if bashio::var.true "${MCP_ENABLED}"; then
    bashio::log.info "Starting OmniRoute with MCP enabled via NPM..."
    exec npm start -- --mcp
else
    bashio::log.info "Starting OmniRoute via NPM..."
    exec npm start
fi