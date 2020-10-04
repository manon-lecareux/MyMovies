var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useUnifiedTopology: true,
    useNewUrlParser: true,
};

mongoose.connect('mongodb+srv://manon:mongopsw@cluster0.ldbfj.mongodb.net/mymoviz?retryWrites=true&w=majority',
    options,
    function(err){
        console.log(err);
    }
);

module.exports = mongoose;
