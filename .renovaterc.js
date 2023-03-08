module.exports = {
    extends: [
      'config:base',
    ],
    schedule: 'at any time',
    packages: {
      npm: {
        enabled: true,
      },
    },
  };