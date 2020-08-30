module.exports = {
  pluginOptions: {
    electronBuilder: {
      "dmg": {
        "contents": [
          {
            "x": 110,
            "y": 110
          },
          {
            "x": 240,
            "y": 240,
            "type": "link",
            "path": "/Applications"
          }
        ]
      }, nodeIntegration: true
    }
  },
  transpileDependencies: ['vuetify'],
};
