const router = require('express').Router()
const path = require('path')
const fs = require('fs')

const data = []

router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../views', 'index.html'))
})

router.get('/leavenotes', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../views', 'leavenotes.html'))
})

router.post('/leave', (req, res, next) => {
  console.log(req.body)

  let noteEntry = {
    name: req.body.name,
    content: req.body.body,
    published: new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  data.push(noteEntry)
  fs.writeFile('notes.txt', JSON.stringify(data), () => {
      res.status(302).redirect('/')
  })
})

router.get('/readnotes', (req,res,next) => {
    fs.readFile("notes.txt", "utf8", (err, data) => {
        let noteList = []
        console.log(data)
        
        if(!err){
          try{
            noteList = JSON.parse(data)
          }catch(e){
            fs.writeFileSync("notes.txt", [])
                noteList = []
              }
            }
        data = noteList
            
        res.render('readnotes', { title: "Explore this guestbook", noteList })
    })
})


module.exports = router