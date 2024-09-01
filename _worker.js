// import { HandleApi } from './dist_server/server/Response/HandleApi'

export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        if (url.pathname.startsWith('/api/')) {
            // TODO: Add your custom /api/* logic here.
            return new Response('Ok');
            // return new HandleApi().router(req, res);
        }
        // Otherwise, serve the static assets.
        // Without this, the Worker will error and no assets will be served.
        return env.ASSETS.fetch(request);
    },
}