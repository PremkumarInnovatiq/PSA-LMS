module.exports = {
    apps: [
      {
        name: 'PSA',
        script: 'node_modules/.bin/ng',
        args: 'serve --host 0.0.0.0 --port 3006',
        node_args: '--max-old-space-size=4096',
      },
    ],
  };
  