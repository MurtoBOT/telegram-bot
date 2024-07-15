import {
    Mongoose
} from "https://deno.land/x/mongo@LATEST_VERSION/mod.ts";

const accountsSchema = new Mongoose.Schema({ 
    tg_account_id: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        default: 1
    },
    exp: Number
}); 

const accountsModel = Mongoose.model('accounts', accountsSchema);
export default accountsModel;