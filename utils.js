'use strict';
const fs = require('fs');
const mime = require('mime');

module.exports = {
  getFile: function (path) {
      debugger;
    const filePath = `${__dirname}/public${path}`;
    try {
      const content = fs.openSync(filePath, 'r');
      const contentType = mime.getType(filePath);
      return {
        content,
        headers: {
          'content-type': contentType
        }
      };
    } catch (e) {
      return null;
    }
  }
}