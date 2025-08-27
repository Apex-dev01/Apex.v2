import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { Ultraviolet } from '@titaniumnetwork-dev/ultraviolet';
import { join } from 'node:path';
import BareServer from '@tomphttp/bare-server-node';

// Constants for file paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');
const PUBLIC_DIR = join(__dirname, 'public');

const app = express();
const server = createServer(app);
const bareServer = new BareServer('/bare/');

const ultra = new Ultraviolet({
    bare: '/bare/',
    prefix: '/service/'
});

// Serve static files from the public directory
app.use(express.static(PUBLIC_DIR));

// Handle all requests, including service worker and bare server
app.use((req, res, next) => {
    // Check if the request should be handled by the bare server
    if (bareServer.shouldRoute(req)) {
        bareServer.routeRequest(req, res);
    } else {
        // Otherwise, route the request through Ultraviolet
        ultra.routeRequest(req, res);
    }
});

// Handle upgrade requests (WebSockets)
server.on('upgrade', (req, socket, head) => {
    if (bareServer.shouldRoute(req)) {
        bareServer.routeUpgrade(req, socket, head);
    } else {
        socket.destroy();
    }
});

// Define the port for the server to listen on
const port = process.env.PORT || 8080;
server.listen(port, () => {
    console.log(`Ultraviolet backend running on http://localhost:${port}`);
});

