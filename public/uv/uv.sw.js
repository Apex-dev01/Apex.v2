importScripts('/uv/uv.bundle.js');
importScripts('/uv/uv.config.js');
importScripts('/uv/uv.handler.js');

const handler = new Ultraviolet.handler.ServiceWorker(self.__uv$config);
self.addEventListener('fetch', event => handler.fetch(event));