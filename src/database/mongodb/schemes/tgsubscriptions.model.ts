import {
    Mongoose
} from "https://deno.land/x/mongo@LATEST_VERSION/mod.ts";

const tgSubscriptionsSchema = new Mongoose.Schema({ 
    tg_account: {
        type: Mongoose.Schema.ObjectId,
        ref: "accounts"
    },
    tg_channel: {
        type: Mongoose.Schema.ObjectId,
        ref: "tg_channels"
    }
}); 

const tgSubscriptionsModel = Mongoose.model('tg_subscriptions', tgSubscriptionsSchema);
export default tgSubscriptionsModel;