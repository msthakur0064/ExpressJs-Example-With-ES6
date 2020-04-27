import http from 'http';

import app from './config/app';
import config from './config/config';

const server = http.Server(app);

server.listen(config.port, () => {
    if (config.env == 'production' || config.env == 'development' || config.env == 'test') {
        console.info(`
    =================================================================

       Server started on port ${config.url}:${config.port} (${config.env})

    =================================================================
    `);
        return true;
    } else {
        console.error(`APP_ENV is set to ${config.env}, but only production, development and testing are valid.`);
    }
    process.exit(1);
});