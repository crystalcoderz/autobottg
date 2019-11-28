module.exports = {
    apps: [{
        name: 'changenow-bot',
        script: 'npm',
        args: 'serve',
        cwd: __dirname,
        restart_delay: 3000,
        autorestart: true,
        max_restarts: 50,
        merge_logs: true,
        log_type: 'json'
    }]
}