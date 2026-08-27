const fs = require('fs');
const { spawn } = require('child_process');

console.log("==========================================");
console.log("Booting OmniRoute inside Home Assistant...");
console.log("==========================================\n");

// 1. Read the UI settings provided by Home Assistant
let options = {};
try {
    options = JSON.parse(fs.readFileSync('/data/options.json', 'utf8'));
} catch (e) {
    console.warn("Warning: Could not read HA options, using defaults.");
}

// 2. Map HA variables to OmniRoute's environment
process.env.PORT = "20128";
process.env.WEB_PORT = "20128";

if (options.DEFAULT_MODEL) process.env.DEFAULT_MODEL = options.DEFAULT_MODEL;
if (options.OPENAI_API_KEY) process.env.OPENAI_API_KEY = options.OPENAI_API_KEY;
if (options.ANTHROPIC_API_KEY) process.env.ANTHROPIC_API_KEY = options.ANTHROPIC_API_KEY;
if (options.MAX_MEMORY_MB) process.env.NODE_OPTIONS = `--max-old-space-size=${options.MAX_MEMORY_MB}`;

// 3. Determine if MCP is toggled on (Use the production binary!)
const mcpEnabled = options.ENABLE_MCP === true;
const args = mcpEnabled ? ['bin/omniroute.mjs', '--mcp'] : ['bin/omniroute.mjs'];

console.log("Injecting environment variables...");
console.log(`Executing: node ${args.join(' ')}\n`);

// Ensure we are in the right folder
process.chdir('/app');

// 4. Start the native OmniRoute application using Node
const child = spawn('node', args, { 
    stdio: 'inherit', 
    shell: true
});

child.on('error', (err) => {
    console.error("Failed to start OmniRoute:", err);
});