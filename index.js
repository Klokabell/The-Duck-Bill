const express = require("express")
const axios = require("axios")
const cheerio = require('cheerio')

const scum = []


// pass the url into axios to begin the data retrieving process
// the header allowed CORS issues to get gone

axios.get('http://assignments.reaktor.com/birdnest/drones', {
    headers: {
        'Content-type': 'application/x-www-form-urlencoded'
    }
})
//  once the response arrives, take the data, name it xml and switch to xml mode
    .then(response => response.data)
    .then(xml => {
        const $ = cheerio.load(xml, {
            xmlMode: true,
        })

        let drones = []
        

        let droneNo = $('capture drone').length
        //console.log(droneNo)
        arrayMaker()

// the intention was to switch these functions into modules when I was certain they worked
// but, not enough time and now I am left ashamed by the number of lines here

// this function is designed to set up the array of all drones in the area, which will be filtered
// by checking the violation bool, 
        function arrayMaker() {        
            for (i = 0; i<droneNo;) {
                let newDrone = $('drone').eq(i).children()

                drones[i] = {
                    serialNumber: newDrone.filter("serialNumber").text(),
                    model: newDrone.filter("model").text(),
                    positionX: Number(newDrone.filter("positionX").text()),
                    positionY: Number(newDrone.filter("positionY").text()),
                    violating: InViolation(Number(newDrone.filter("positionX").text()), Number(newDrone.filter("positionY").text()))
                }
                    i++
                }        
            return drones
        }
       
        Baddies()

// this little guy was just here to seperate the scum from the non scum
        function Baddies() {
            drones.forEach(function(baddy)  
                {
                    if(baddy.violating == true)
                    {
                        scum.push(baddy)
                        return scum
                    }
                })
        }
        console.log(scum)
    })


// this function was to determine which pilots had broken the law and were to be hunted
        function InViolation(x, y) {
            let dx = x/1000
            let dy = y/1000
            const cX = 250
            const cY = 250

            dx = dx.toFixed(2)
            dy = dy.toFixed(2)
            
            if((dx-cX) * (dx-cX) + (dy-cX) * (dy-cY) <= (100 * 100))
                return true;
            else 
                return false;
        }

module.export = { scum }