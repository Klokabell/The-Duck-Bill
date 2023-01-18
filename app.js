const { response } = require("express")
const axios = require("axios")
const cheerio = require('cheerio')

    
    axios.get('http://assignments.reaktor.com/birdnest/drones', {
    headers: {
        'Content-type': 'application/x-www-form-urlencoded'
    }
})
    .then(response => response.data)
    .then(xml => {
        const $ = cheerio.load(xml, {
            xmlMode: true,
        })

        let xaxis =  $('drone').children().filter("positionX").text()
        let yaxis =  $('drone').children().filter("positionY").text()

        console.log(xaxis)
        console.log(yaxis)
  })
