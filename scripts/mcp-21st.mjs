#!/usr/bin/env node
// 21st.dev MCP Client Helper
const ENDPOINT = 'https://21st.dev/api/mcp';
const API_KEY = process.env.API_KEY_21ST || '';

async function rpc(method, params = {}) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: Date.now(),
      method,
      params,
    }),
  });
  const data = await res.json();
  if (data.error) {
    throw new Error(`RPC Error [${data.error.code}]: ${data.error.message}`);
  }
  return data.result;
}

const [action, ...args] = process.argv.slice(2);

async function main() {
  if (!action || action === 'list') {
    const res = await rpc('tools/list');
    const tools = res.tools || [];
    console.log(`Connected to 21st.dev MCP. Found ${tools.length} available tools:\n`);
    for (const t of tools) {
      console.log(`- ${t.name.padEnd(25)} : ${t.description?.slice(0, 75)}...`);
    }
    return;
  }

  if (action === 'search') {
    const query = args.join(' ') || 'card';
    const res = await rpc('tools/call', {
      name: 'search',
      arguments: { query, limit: 5 },
    });
    console.log(res.content?.[0]?.text || JSON.stringify(res, null, 2));
    return;
  }

  if (action === 'get') {
    const id = parseInt(args[0], 10);
    if (!id) {
      console.error('Usage: node scripts/mcp-21st.mjs get <componentId>');
      process.exit(1);
    }
    const res = await rpc('tools/call', {
      name: 'get_component',
      arguments: { id },
    });
    console.log(res.content?.[0]?.text || JSON.stringify(res, null, 2));
    return;
  }

  console.log(`Usage:
  node scripts/mcp-21st.mjs list             # List all 51 MCP tools
  node scripts/mcp-21st.mjs search <query>  # Search components/themes
  node scripts/mcp-21st.mjs get <id>        # Retrieve component code`);
}

main().catch(err => {
  console.error(err.message);
  process.exit(1);
});

