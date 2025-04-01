const mongoose = require('mongoose');

async function getDB(){
    mongoose.connect('mongodb+srv://bala123:chinnuchinni@cluster0.b0m3w.mongodb.net/restuarant?retryWrites=true&w=majority')
    .then(result => console.log('DB Connected!'))
    .catch(e => console.log(e));
}

module.exports = {
    getDB
}