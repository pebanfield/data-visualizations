module.exports = {srcHelper: _srcHelper};

var gitRevision = require('git-revision');
var pjson = require('../../../package.json');

function _srcHelper(text, options) {

  var scriptsStr = "";
  var shortHash = gitRevision('short');

  if(options.hash.scripts){
    var scripts = options.hash.scripts.split(",");

    for(var i=0; i<scripts.length; i++){
      let script = scripts[i];
      let fileName = "/js/"+script+"_"+pjson.version+"_"+shortHash+".js";
      scriptsStr += "<script type='text/javascript' src='" + fileName + "'></script>\n";
    }
  }

  if(options.hash.styles){
    var styles = options.hash.styles.split(",");

    for(var i=0; i<styles.length; i++){
      let style = styles[i];
      let fileName = "/css/"+style+"_"+pjson.version+"_"+shortHash+".css";
      scriptsStr += "<link rel='stylesheet' href='" + fileName + "'></link>\n";
    }

  }

  return scriptsStr;
}
