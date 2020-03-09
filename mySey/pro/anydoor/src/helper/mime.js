const path = require('path')
const mineTypes = {
  'css': 'text/css',
  'js': 'application/x-javascript',
  'doc': 'application/msword',
  'pdf': 'application/pdf',
  'xls': 'application/vnd.ms-excel',
  'ppt': 'application/vnd.ms-powerpoint',
  'swf': 'application/x-shockwave-flash',
  'zip': 'application/zip',
  'mp3': 'audio/mpeg',
  'gif': 'image/gif',
  'jpg': 'image/jpeg',
  'jpeg': 'image/jpeg',
  'ico': 'image/x-icon',
  'html': 'text/html',
  'txt': 'text/plain',
  'mp4': 'video/mp4',
  'xml': 'text/xml',
  'png': 'image/png',
  'bmp': 'image/x-ms-bmp'
}
module.exports = (filePath) => {
  let ext = path.extname(filePath).split('.').pop().toLowerCase()
  if (!ext) {
    ext = filePath
  }
  return mineTypes[ext] || mineTypes['txt']
}
