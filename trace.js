/**
*  IBM Confidential
*
*  OCO Source Materials
*
*  5799-MA4
*
*  © Copyright IBM Corp. 2017
*
*  The source code for this program is not published or otherwise divested of its trade secrets,
*  irrespective of what has been deposited with the U.S. Copyright Office.
*/
function stackInfo() {
  let path = require('path');
  let stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/i;
  let stackReg2 = /at\s+()(.*):(\d*):(\d*)/i;
  let stacklist = (new Error()).stack.split('\n').slice(3);
  let s = stacklist[0];
  let sp = stackReg.exec(s) || stackReg2.exec(s);
  let data = {};
  if (sp && sp.length === 5) {
    data.method = sp[1];
    data.path = sp[2];
    data.line = sp[3];
    data.pos = sp[4];
    data.file = path.basename(data.path);
  }
  return data;
}

module.exports = function trace(msg) {
    let info = stackInfo();
    let method = info.method;
    let file = info.file;
    let line = info.line;
    console.log('(' + method + ') <' + file + ':' + line + '> ' + msg);
  };
