module.exports = {
    apps: [{
        name: 'changenow-bot',
        script: 'node',
        args: 'dist/index.js',
        error_file: '/home/bot/.pm2/logs/error-bot.log',
        out_file: '/home/bot/.pm2/logs/out-bot.log',
        cwd: __dirname,
        restart_delay: 3000,
        autorestart: true,
        max_restarts: 50,
    }]
}