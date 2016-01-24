var https = require('https');
var path = require('path');
var fs = require('fs');
var _ = require('lodash');

var Component = {
  fetchDeps: function(build){
    _.forEach(this.includeFiles, function(url, name){    
      https.get(url, function(res){
          var body = '';
          res.on('data', function(chunk) {
            body += chunk;
          });
          res.on('end', function() {
            fs.writeFile(path.resolve(process.cwd(), build.project.dest, name), 
              body,
              function(err){
                if(err){
                  console.error('Error writing firmware to file: ' + err);
                }
            });
          });
      }).on('error', function(err){
        callback('Problem fetching firmware: ' + err);
      });
    });
  }
};

module.exports = Component;