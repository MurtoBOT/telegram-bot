import {
    Mongoose
} from "https://deno.land/x/mongo@LATEST_VERSION/mod.ts";

const tgChannelsSchema = new Mongoose.Schema({ 
    tg_link_account: {
        type: Mongoose.Schema.ObjectId,
        ref: "accounts"
    },
    tg_link_channel_id: {
        type: String,
        required: true
    }
}); 

const tgChannelsModel = Mongoose.model('tg_channels', tgChannelsSchema);
export default tgChannelsModel;