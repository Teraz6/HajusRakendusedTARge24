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

app.delete('/thingamabobs/:id', (req, res) => {
    if (typeof thingamabobs[req.params.id - 1] === 'undefined')
    {
        return res.status(404).send({error: "Object not found. Check your thingamabob id"})
    }
    thingamabobs.splice(req.params.id - 1, 1)
    res.status(204).send({error: "No content"})
})

app.listen(8080, () => {console.log(`API running at: http://localhost:8080`)})