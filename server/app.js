const express = require('express');
const app = express();
const cors = require('cors');
const itemModel = require('./models/itemModel.js');
const tableModel = require('./models/tableModel.js');
const db = require('./db.js');

app.use(express.json());
app.use(cors());
db.getDB();

app.get('/', async(req, res) => {
    await tableModel.find({})
    .then(result => res.json(result))
    .then(err => console.log(err));
});

app.post('/:id', async(req, res) => {
    const {id} = req.params;

    await tableModel.findByIdAndUpdate({_id:id}, { $set: {"details.selected": [], "details.total":0, "details.paid":false}})
    .then(result => res.json(result))
    .catch(err => console.log(err))
});

app.put('/:id', async(req, res) => {
    const {id} = req.params;
    const { paid } = req.body;
    console.log(paid);

    await tableModel.findByIdAndUpdate({_id:id}, { $set: {"details.paid": paid}})
    .then(result => res.json(result))
    .catch(err => console.log(err));
})

app.get('/view', async(req, res) => {
    await itemModel.find({})
    .then(result => res.json(result))
    .catch(err => console.log(err));
});

app.put('/view/:id', async(req, res) => {
    let {id} = req.params;
    let { avail } = req.body;
    await itemModel.findByIdAndUpdate({_id:id}, { available: avail })
    .then(result => res.json(result))
    .then(err => console.log(err));
})

app.get('/view/edit/:id', async(req, res) => {
    const { id } = req.params;
    await itemModel.findOne({_id:id})
    .then(result => res.json(result))
    .catch(err => console.log(err));
})

app.put('/view/edit/:id', async(req, res) => {
    const { id } = req.params;
    const { price, name } = req.body;
    await itemModel.findByIdAndUpdate({_id:id}, { price:price, name:name })
    .then(result => res.json(result))
    .catch(err => console.log(err));
})

app.get('/create', async(req, res) => {
    await itemModel.find({})
    .then(result => res.json(result))
    .catch(err => console.log(err));
})

app.post('/create', async(req, res) => {
    console.log(req.body);
    await itemModel.create(req.body)
    .then(result => res.json(result))
    .catch(err => console.log(err));
})

app.listen(5000, (req, res) => {
    console.log('Server is listening on port 5000');
})