const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());   // crossorigin resource error avoid
app.use(express.json())  //populate request body

const thingamabobs = [
    {id: 1, name: "plumbus", price: 34.59},
    {id: 2, name: "vana furby", price: 666},
    {id: 3, name: "sapakas", price: 2000}
]

const displayCars = [{
    Car:{
        carBrand:"BMW",
        color:"Purple",
        "Tinted windows": true,
        wheels: 76,
        //lisada juurde 5 erinevat andmeomadust millest vähemalt, üks on tekst, teine arv ja kolmas objekt kahe omadusega
        sunroof: false,
        "Number of gears": 6,
        Comforts:{
            Seatwarmers: true,
            "Cruise control": true,
            "Seat fabric": "Leather"
        }
    }
}]

app.getElementById("app").innerHTML = 
`
<div id="json">
    <h1> Car properties </h1>
    <p>Brand of car: ${displayCars[0].Car.carBrand}</p>
    <p>Car color: ${displayCars[0].Car.color}</p>
    <p>Tinted windows: ${displayCars[0].Car["Tinted windows"]}</p>
    <p>Wheels: ${displayCars[0].Car.wheels}</p>
    <p>Sunroof: ${displayCars[0].Car.sunroof}</p>
    <p>Number of gears: ${displayCars[0].Car["Number of gears"]}</p>
    <p>Comforts: </p>
    <p>Seatwarmers: ${displayCars[0].Car.Comforts.Seatwarmers}</p>
    <p>Seatwarmers: ${displayCars[0].Car.Comforts["Cruise control"]}</p>
    <p>Seatwarmers: ${displayCars[0].Car.Comforts["Seat fabric"]}</p>

</div>
`;

app.get('/thingamabobs', (req, res) => {res.send(thingamabobs)})

app.get('/thingamabobs/:id', (req, res) => {
    if (typeof thingamabobs[req.params.id - 1] === 'undefined')
    {
        return res.status(404).send({error: "Object not found. Check your thingamabob id"})
    }
})

app.post('/thingamabobs', (req, res) => {
    if (!req.body.name || !req.body.price)
    {
        return res.status(400).send({error:"One or multiple parameters missing"})
    }
    let newThingy = {
        id: thingamabobs.length+1,
        price: req.body.price,
        name: req.body.name
    }
    thingamabobs.push(newThingy)
    res.status(201).location('localhost:8080/thingamabobs/' + (thingamabobs.length - 1)).
    send(newThingy)
})

app.put('/thingamabobs/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, price } = req.body;

    const thingamabob = thingamabobs.find(c => c.id === id);

    if (!thingamabob) {
        return res.status(404).send({ error: "Client not found. Check your thingamabobs id." });
    }

    if (name) thingamabob.name = name;
    if (price) thingamabob.price = price;

    res.send(thingamabob);
});


app.delete('/thingamabobs/:id', (req, res) => {
    if (typeof thingamabobs[req.params.id - 1] === 'undefined')
    {
        return res.status(404).send({error: "Object not found. Check your thingamabob id"})
    }
    thingamabobs.splice(req.params.id - 1, 1)
    res.status(204).send({error: "No content"})
})


// Clients
const clients = [
    {id: 1, name:"tester", email: "tester@gmail.com"}
]

app.get('/clients', (req, res) => {res.send(clients)})

app.get('/clients/:id', (req, res) => {
    if (typeof clients[req.params.id - 1] === 'undefined')
    {
        return res.status(404).send({error: "Object not found. Check your clients id"})
    }
})

app.post('/clients', (req, res) => {
    if (!req.body.name || !req.body.email)
    {
        return res.status(400).send({error:"One or multiple parameters missing"})
    }
    let newClients = {
        id: clients.length+1,
        name: req.body.name,
        email: req.body.email
    }
    clients.push(newClients)
    res.status(201).location('localhost:8080/clients/' + (clients.length - 1)).
    send(newClients)
})

app.delete('/clients/:id', (req, res) => {
    if (typeof clients[req.params.id - 1] === 'undefined')
    {
        return res.status(404).send({error: "Object not found. Check your clients id"})
    }
    clients.splice(req.params.id - 1, 1)
    res.status(204).send({error: "No content"})
})

app.put('/clients/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;

    const client = clients.find(c => c.id === id);

    if (!client) {
        return res.status(404).send({ error: "Client not found. Check your client id." });
    }

    if (name) client.name = name;
    if (email) client.email = email;

    res.send(client);
});

app.listen(8080, () => {console.log(`API running at: http://localhost:8080`)})