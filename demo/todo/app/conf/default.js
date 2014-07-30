var path = require("path");

this.config = {
  "ROOTDIR": path.join(__dirname, "../"),

  // if DEV = true,
  // nodex don't cache conctroller and templates.
  "DEV" : false,
  "PORT": 8888
};