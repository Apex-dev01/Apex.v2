// This is the correct ES module import syntax for an ES module environment.
import http from 'http';
import { fileURLToPath } from 'url';
import path from 'path';

// Import the server instance directly from the package.
// This is a common pattern for Vercel-compatible proxies.
import { server as ultravioletServer } from '@titaniumnetwork-dev/ultraviolet';

// This is the correct way to get the directory name in ES modules.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// This function will now use the imported ultravioletServer instance.
function handleRequest(req, res) {
    try {
        // We no longer need to instantiate `new Ultraviolet()`.
        // The server instance is imported directly and handles the request.
        ultravioletServer(req, res);
    } catch (error) {
        console.error('An error occurred:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Internal Server Error: ${error.message}`);
    }
}

// Create and start the server.
const server = http.createServer(handleRequest);
const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
