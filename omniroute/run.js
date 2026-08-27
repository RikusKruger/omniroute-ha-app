const fs = require('fs');
const { spawn } = require('child_process');

console.log("==========================================");
console.log("Booting Pure Node 22 OmniRoute Environment...");
console.log("==========================================\n");

// Read HA UI Settings
let options = {};
try {
    options = JSON.parse(fs.readFileSync('/data/options.json', 'utf8'));
} catch (e) {
    console.warn("Warning: Could not read HA options, using defaults.");
}

// Map settings
process.env.PORT = "20128";
process.env.WEB_PORT = "20128";
if (options.DEFAULT_MODEL) process.env.DEFAULT_MODEL = options.DEFAULT_MODEL;
if (options.OPENAI_API_KEY) process.env.OPENAI_API_KEY = options.OPENAI_API_KEY;
if (options.ANTHROPIC_API_KEY) process.env.ANTHROPIC_API_KEY = options.ANTHROPIC_API_KEY;
if (options.MAX_MEMORY_MB) process.env.NODE_OPTIONS = `--max-old-space-size=${options.MAX_MEMORY_MB}`;

// Spawn the global omniroute command
const args = (options.ENABLE_MCP === true) ? ['--mcp'] : [];
const child = spawn('omniroute', args, { stdio: 'inherit', shell: true });

child.on('error', (err) => {
    console.error("Failed to start OmniRoute:", err);
});