const axios = require('axios');
const { scum } = require("./index.js")
const cheerio = require("cheerio")

let url = 'https://assignments.reaktor.com/birdnest/pilots/'
let i=0

console.log(scum)
while(i<scum?.length) {
    sn = scum[i].serialNumber

    axios.get(url)
    .then(response => response.data)
    .then(function(){
        console.log()
    })
}

let bastards = []

/* Ran out of time to finish this. Was planning to use create a loop that
    attached the serial number to the end of the URL, then another loop that
    extracted the pilots' details and put them onto the bastards array with a time
    stamp I would use to check if they'd been 10 minutes on the list and slice them
    from the array when time had passed. The counter would reset if they were still
    in the scum array when it got refreshed.
    The bastards array would be the basis for the HTML list, with the app running on
    netifly. So many criminals getting away because I didn't finish
*/



