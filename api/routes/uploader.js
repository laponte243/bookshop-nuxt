const { Router } = require('express')
const multer = require('multer')
import { Web3Storage, getFilesFromPath, File } from 'web3.storage'

const router = Router()
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGUyODVkMWRCZmJjZWQzOTFGMjE4YmQ1NTZFQjg2NmZENzRmOTMzMUIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NDcyODU0MzUxMTMsIm5hbWUiOiJuZWFyYm9va3Nob3AifQ.iAOFsrE3tI5YIxetxcQms7VGFcpa2cxrYE40IEAZSGc'

router.post('/uploader/web3storage', multer().fields([{ name: 'book', maxCount: 1 }, { name: 'cover', maxCount: 1 }]), async function (req, res) {
  const options = {
    cwd: './static2'
  }
  const client = new Web3Storage({ token })
  const files = [
    new File([req.files.book[0].buffer], 'book.' + req.files.book[0].originalname.split('.').pop() ),
    new File([req.files.cover[0].buffer], 'cover.' + req.files.cover[0].originalname.split('.').pop())
  ]
  const cid = await client.put(files)
  console.log('cid', cid, 'nombre_libro', 'book.' + req.files.book[0].originalname.split('.').pop())
  return res.json({ data: cid, nombre_libro: 'book.' + req.files.book[0].originalname.split('.').pop(), nombre_cover: 'cover.' + req.files.cover[0].originalname.split('.').pop() })
})

router.post('/uploader/categoria', multer().single('imagen'), async function (req, res) {
  const options = {
    cwd: './static'
  }
  const client = new Web3Storage({ token })
  const files = [
    new File([req.file.buffer], req.file.originalname)
  ]
  const cid = await client.put(files)
  return res.json({ data: cid, nombre: req.file.originalname })
})
module.exports = router
