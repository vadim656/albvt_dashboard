module.exports = {
    apps: [
      {
        name: 'CRM',
        port: 3333,
        exec_mode: 'cluster',
        instances: 'max',
        script: './node_modules/nuxt/bin/nuxt.js',
        args: 'start'
      },
    ]
  }