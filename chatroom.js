var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB, { useNewUrlParser: true } );
mongoose.set('useCreateIndex', true);

var chatRoomSchema = new Schema({
    id: { type: String, required: true, index: { unique: true }},
    name: { type: [{userName: String}], required: true,  },
    image: { type: [{actorName: String, characterName: String}], required: true }
});

module.exports = mongoose.model('Movie', MovieSchema);