// This is the correct way to import modules when using CommonJS syntax.
// We'll revert to this since the ES module imports are not working as expected.
const http = require('http');
const Ultraviolet = require('@titaniumnetwork-dev/ultraviolet');

// To get __dirname and __filename in an ES Module, you would use this pattern.
// However, since we're using `require` (CommonJS), these variables are
// available by default, so we don't need these lines.
// import { fileURLToPath } from 'url';
// import path from 'path';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// This function is a placeholder to show where Ultraviolet would be used.
function handleRequest(req, res) {
    try {
        // Now `Ultraviolet` is correctly imported and can be used as a constructor.
        // It should be a function/class that can be instantiated with `new`.
        const ultraviolet = new Ultraviolet();
        
        // This is a simple example of how to handle different routes.
        if (req.url === '/favicon.ico' || req.url === '/favicon.png') {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Favicon not found');
            return;
        }

        // The previous line 'new Ultraviolet.server()' was causing an error.
        // The `Ultraviolet` instance itself likely handles the proxying.
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
