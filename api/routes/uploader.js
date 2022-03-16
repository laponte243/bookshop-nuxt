const { Router } = require('express')
import { Web3Storage, getFilesFromPath } from 'web3.storage'

const router = Router()
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGUyODVkMWRCZmJjZWQzOTFGMjE4YmQ1NTZFQjg2NmZENzRmOTMzMUIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NDcyODU0MzUxMTMsIm5hbWUiOiJuZWFyYm9va3Nob3AifQ.iAOFsrE3tI5YIxetxcQms7VGFcpa2cxrYE40IEAZSGc'

router.post('/uploader/test', async function (req, res) {
  const options = {
    cwd: './static'
  }
  console.log(req)
  // const client = new Web3Storage({ token })
  // const files = await getFilesFromPath('./assets/img/avatars/avatarM.png')
  // const cid = await client.put(files)
  // console.log(cid)
  return res.json({ data: 'hola' })
})

module.exports = router