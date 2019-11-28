module.exports = {
    apps: [{
        name: 'changenow-bot',
        script: './node_modules/.bin/babel-node',
        args: 'src/index.js',
        cwd: __dirname,
        restart_delay: 3000,
        autorestart: true,
        max_restarts: 50,
        merge_logs: true,
        log_type: ‘json’
    }]
}