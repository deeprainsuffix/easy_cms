import { HandleApi } from '../dist_server/server/Response/HandleApi';
import { Handle_assets } from '../dist_server/server/Response/Handle_assets';
import { httpUrl_prefix_api, httpUrl_prefix_assets } from '../dist_server/server/http.url';

export default {
    async fetch(request, env) {
        const req = request.req;
        const url = new URL(request.url);
        req.url = url;
        if (url.startsWith(httpUrl_prefix_api)) {
            return await new HandleApi().router(req, new Response());
        }
        else if (url.startsWith(httpUrl_prefix_assets)) {
            return await new Handle_assets().router(req, new Response());
        }

        return env.ASSETS.fetch(request);
        // if (url.pathname.startsWith('/api/')) {
        //     // TODO: Add your custom /api/* logic here.
        //     return new Response('Ok');
        //     // return new HandleApi().router(req, res);
        // }
        // // Otherwise, serve the static assets.
        // // Without this, the Worker will error and no assets will be served.
        // return env.ASSETS.fetch(request);
    },
}