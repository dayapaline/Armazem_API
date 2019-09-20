const mongoose = require('mongoose'); 

mongoose.connect('mongodb+srv://dayane:estoque@cluster0-4dd3b.mongodb.net/test?retryWrites=true&w=majority', { useUnifiedTopology:true, useCreateIndex:true, useNewUrlParser:true });
mongoose.Promise = global.Promise;

module.exports = mongoose;