export interface Header {
    _id: string;
    _createdAt: string;
    name:  string;
    imgUrl: {
        asset: {
            url: string;
        }
    }
}