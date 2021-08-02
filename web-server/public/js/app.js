console.log('Client side javascript file is loaded!')

fetch('http://localhost:3000/weather?address=!').then((response) => {
    response.json().then((data) => {
        if (data.error) {
            return console.error(data.error)
        }

        console.log(data.location);
        console.log(data.forecast);
    }).catch((reason) => {
        console.error('Error: ' + reason)
    })
})