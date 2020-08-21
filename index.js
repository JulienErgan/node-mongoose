const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
// const connect = mongoose.connect(url);
// const connect = mongoose.connect(url, { useNewUrlParser: true });
const connect = mongoose.connect(url, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true, 
    useFindAndModify: false 
})

connect.then((db) => {
    console.log('Connect correctly to server');

    Dishes.create({
        name: 'Uthapizza',
        description: 'test'
        })
        .then((dish) => {
            console.log(dish);

            Dishes.find({}).exec();
        })
        .then((dishes) => {
            console.log(dishes);
            return Dishes.deleteMany({});
        })
        .then(() => {
            return mongoose.connection.close();
        })
        .catch((err) => {
            console.log(err);
        });
});