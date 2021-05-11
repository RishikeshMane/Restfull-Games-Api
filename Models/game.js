const mongoose = require('mongoose')
const gamedb = mongoose.Schema({
    Name:{
        type:String,
        require:true
    },
    Id:{
        type:String,
        require:true
    },
    Type:{
        type:String,
        require:true
    },
    Ratingoutof5:{
        type:Number,
        require:true
    }
    
})
module.exports = mongoose.model("Games_model",gamedb);