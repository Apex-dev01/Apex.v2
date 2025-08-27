self.__uv$config = {
    prefix: '/service/',
    bare: 'https://apex-pv.vercel.app//bare/',
    encodeUrl: Ultraviolet.codec.xor.encode,
    decodeUrl: Ultraviolet.codec.xor.decode,
    handler: '/uv/uv.handler.js',
    bundle: '/uv/uv.bundle.js',
    sw: '/uv/uv.sw.js'
};