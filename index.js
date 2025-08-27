import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { Ultraviolet } from '@titaniumnetwork-dev/ultraviolet';
import { join } from 'node:path';
import BareServer from '@tomphttp/bare-server-node';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

const app = express();
const server = createServer(app);
const bareServer = new BareServer('/bare/');

const ultra = new Ultraviolet({
    bare: '/bare/',
    prefix: '/service/'
});

app.use(express.static(join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'index.html'));
});

server.on('request', (req, res) => {
    if (bareServer.shouldRoute(req)) {
        bareServer.routeRequest(req, res);
    } else {
        ultra.routeRequest(req, res);
    }
});

server.on('upgrade', (req, socket, head) => {
    if (bareServer.shouldRoute(req)) {
        bareServer.routeUpgrade(req, socket, head);
    }
});

const port = process.env.PORT || 8080;
server.listen(port, () => {
    console.log(`Ultraviolet backend running on http://localhost:${port}`);
});