export interface InfoItem {
    _id: string;
    country_nm: string;
    country_eng_nm: string;
    contact_remark: string;
    flag_download_url: string;
    dang_map_download_url: string;
    comments: Comment[];
}

export interface Comment {
    comment: string;
    createdAt: Date;
    _id: string;
}