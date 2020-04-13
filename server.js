import http from 'http';
import chalk from 'chalk';

import app from './config/app.js';
import config from './config/config.js';

const server = http.Server(app);

server.listen(config.port, () => {
    if (config.env == 'production' || config.env == 'development' || config.env == 'testing') {
        console.info(`
    =================================================================

       Server started on port ${chalk.green(config.url)}:${chalk.green(config.port)} (${config.env})

    =================================================================
    `);
        return true;
    } else {
        console.error(`APP_ENV is set to ${environment}, but only production, development and testing are valid.`);
    }
    process.exit(1);
});