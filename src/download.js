async function download(url) {
  return new Promise((resolve)=> resolve(url))
}

module.exports = function(...urls) {
  const downloadPromises = urls.map(download)
  return Promise.all(downloadPromises)
}