var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB, { useNewUrlParser: true } );
mongoose.set('useCreateIndex', true);

var chatRoomSchema = new Schema({
    name: { type: [{userName: String}], required: true,  },
    image: { type: [{actorName: String, characterName: String}], required: true }
});

module.exports = mongoose.model('channel', channelSchema);