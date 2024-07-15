import {
    Mongoose
} from "https://deno.land/x/mongo@LATEST_VERSION/mod.ts";

export enum PostStatuses {
    PENDING,
    ACCEPTED,
    DESCLINED
}

const tgPostsSchema = new Mongoose.Schema({
    text: String,
    author: {
        type: Mongoose.Schema.ObjectId,
        ref: "accounts"
    },
    status: {
        type: PostStatuses,
        default: PostStatuses.PENDING
    }
});

const tgPostsModel = Mongoose.model('tg_posts', tgPostsSchema);
export default tgPostsModel;