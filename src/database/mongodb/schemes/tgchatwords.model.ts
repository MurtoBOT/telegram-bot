import {
    Mongoose
} from "https://deno.land/x/mongo@LATEST_VERSION/mod.ts";

const tgChatWordsSchema = new Mongoose.Schema({ 
    tg_chat_id: {
        type: String,
        required: true
    },
    word: {
        type: String
    }
}); 

const tgChatWordsModel = Mongoose.model('tg_subscriptions', tgChatWordsSchema);
export default tgChatWordsModel;