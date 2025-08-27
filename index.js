// This is the correct ES module import syntax for an ES module environment.
// We are only importing the necessary modules to keep the code clean.
import { server as ultravioletServer } from '@titaniumnetwork-dev/ultraviolet';

// The server handler function that Vercel expects.
// It directly uses the imported `ultravioletServer` to handle all incoming requests.
export default function handler(req, res) {
    try {
        // The imported `ultravioletServer` is a function that can handle
        // HTTP requests and responses directly. This bypasses the need to
        // manually create an http server instance.
        ultravioletServer(req, res);
    } catch (error) {
        console.error('An error occurred:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Internal Server Error: ${error.message}`);
    }
}
