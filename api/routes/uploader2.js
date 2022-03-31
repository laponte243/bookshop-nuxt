const { Router } = require('express')
const multer  = require('multer')
const pinataSDK = require('@pinata/sdk');
const streamifier = require('streamifier');
const fs = require('fs')

const router = Router()

router.post('/uploader/pinata', multer().fields([{name: 'book', maxCount: 1},{name: 'cover', maxCount: 1}]),async function (req, res) {
  const options = {
    cwd: './static2'
  }
  const pinata = pinataSDK('5b04b05b229bdb1eded5', 'dc9ebc177b33d5fd02a5a095821670dbd50fb778faf031039e973bf661fa47de');
  const files = [
    new File([req.files.book.buffer], req.files.book[0].originalname ),
    new File([req.files.cover.buffer], req.files.cover[0].originalname)
  ]
  const test = streamifier.createReadStream(req.file.buffer).pipe(process.stdout)
  return client.put(files)
})

router.post('/uploader/categoria', multer().single('imagen'),async function (req, res) {
  const options = {
    cwd: './static'
  }
  const client = new Web3Storage({ token })
  const files = [
    new File([req.file.buffer], req.file.originalname )
  ]
  const cid = await client.put(files)
  return res.json({ data: cid, nombre: req.file.originalname })
})
module.exports = router