// This is the correct ES module import syntax for an ES module environment.
// It imports the entire module as a single object.
import * as Ultraviolet from '@titaniumnetwork-dev/ultraviolet';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

// This is the correct way to get the directory name in ES modules.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// This function is a placeholder to show where Ultraviolet would be used.
function handleRequest(req, res) {
    try {
        // We now access the `Ultraviolet` constructor as a property of the imported object.
        const ultraviolet = new Ultraviolet.Ultraviolet();
        
        // This is a simple example of how to handle different routes.
        if (req.url === '/favicon.ico' || req.url === '/favicon.png') {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Favicon not found');
            return;
        }

        // Your actual logic to use the proxy should go here.
        // For example, you would probably call a method on the `ultraviolet` instance
        // to handle the request, like `ultraviolet.requestHandler(req, res)`.

        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`Hello from the server!`);

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
