import { model, Schema } from "mongoose";


const postSchema = new Schema({
    country_nm: { type: String, required: true, unique: true },
    country_eng_nm: { type: String, required: true },
    contact_remark: { type: String, required: true },
    flag_download_url: { type: String, required: true },
    dang_map_download_url: { type: String, required: true },
    continent_cd: { type: String },
    continent_eng_nm: { type: String },
    continent_nm:  { type: String },
    country_iso_alp2: {type: String},
    map_download_url: { type: String},
    wrt_dt: { type: String },
    comments: { type: String },
    user: {
        email: { type: String, required: true }
    }
}, { timestamps: true });

export const Post = model('Post', postSchema);
