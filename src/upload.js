async function upload(path) {
  return new Promise((resolve)=> resolve(path))
}

module.exports = function(...paths) {
  const uploadPromises = paths.map(upload)
  return Promise.all(uploadPromises)
}