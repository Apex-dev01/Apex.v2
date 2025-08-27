import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import BareServer from '@tomphttp/bare-server-node';

// The correct way to import Ultraviolet.
// We import the entire module and then use its default export.
import Ultraviolet from '@titaniumnetwork-dev/ultraviolet';

// Define the root directory of the project
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

// Explicitly serve the `index.html` file
app.get('/', (req, res) => {
    res.sendFile(join(PUBLIC_DIR, 'index.html'));
});

// Serve the UV files from the `/uv` path
app.use('/uv', express.static(join(PUBLIC_DIR, 'uv')));

// Handle all other requests for the proxy logic
app.use((req, res, next) => {
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
    } else {
        socket.destroy();
    }
});

// Start the server
const port = process.env.PORT || 8080;
server.listen(port, () => {
    console.log(`Ultraviolet backend running on http://localhost:${port}`);
});
