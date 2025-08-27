import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { Ultraviolet } from '@titaniumnetwork-dev/ultraviolet';
import { join } from 'node:path';
import BareServer from '@tomphttp/bare-server-node';

// These lines are standard Node.js to get the correct file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

// Initialize Express, the HTTP server, and the Bare server
const app = express();
const server = createServer(app);
const bareServer = new BareServer('/bare/');

// Initialize Ultraviolet with a prefix for proxied URLs and the bare server path
const ultra = new Ultraviolet({
    bare: '/bare/',
    prefix: '/service/'
});

// Serve static files from the 'public' directory
app.use(express.static(join(__dirname, 'public')));

// Handle the main '/' route, serving the index.html file
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'index.html'));
});

// Route HTTP requests to either the Bare server or the Ultraviolet instance
server.on('request', (req, res) => {
    if (bareServer.shouldRoute(req)) {
        bareServer.routeRequest(req, res);
    } else {
        ultra.routeRequest(req, res);
    }
});

// Handle WebSocket upgrade requests
server.on('upgrade', (req, socket, head) => {
    if (bareServer.shouldRoute(req)) {
        bareServer.routeUpgrade(req, socket, head);
    }
});

// Listen on the port provided by Vercel or default to 8080
const port = process.env.PORT || 8080;
server.listen(port, () => {
    console.log(`Ultraviolet backend running on http://localhost:${port}`);
});


