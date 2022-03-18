const { Router } = require('express')
const multer  = require('multer')
import { Web3Storage, getFilesFromPath, File } from 'web3.storage'

const router = Router()
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGUyODVkMWRCZmJjZWQzOTFGMjE4YmQ1NTZFQjg2NmZENzRmOTMzMUIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NDcyODU0MzUxMTMsIm5hbWUiOiJuZWFyYm9va3Nob3AifQ.iAOFsrE3tI5YIxetxcQms7VGFcpa2cxrYE40IEAZSGc'

router.post('/uploader/test', multer().single('libro'),async function (req, res) {
  const options = {
    cwd: './static'
  }
  const client = new Web3Storage({ token })
  const files = [
    new File([req.file.buffer], req.file.originalname )
  ]
  const cid = await client.put(files)
  return res.json({ data: cid })
})

module.exports = router