const express = require ('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 3500   
const { logger } = require ('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')

app.use(logger)

//allows our app to recieve json data
app.use(express.json())
//

//middleware    
//  app.use(express.static('public')) would also work
app.use('/', express.static(path.join(__dirname, 'public')))
//

app.use('/', require('./routes/root'))

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404  Not Found')
    }
})

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
