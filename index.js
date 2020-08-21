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
        name: 'Name Test 2',
        description: 'test'
        })
        .then((dish) => {
            console.log(dish);
            return Dishes.findByIdAndUpdate(dish._id, {
                $set: { description: 'Updated test' }
            },{
                new: true 
            })
            .exec();
        })
        .then((dish) => {
            console.log(dish);

            dish.comments.push({
                rating: 5,
                comment: 'I\'m getting a sinking feeling',
                author: 'Leonardo di Caprio' 
            });

            return dish.save();

        })
        .then((dish) => {
            console.log(dish);
            return Dishes.deleteMany({});
        })
        .then(() => {
            return mongoose.connection.close();
        })
        .catch((err) => {
            console.log(err);
        });
});