export default {
    name: "portfolioItems",
    title: "PortfolioItems",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
        },
        {
            name: "description",
            title: "Description",
            type: "string",
        },
        {
            name: "url",
            title: "Url",
            type: "string",
        },
        {
            name: "imgUrl",
            title: "ImgUrl",
            type: "image",
        },
        {
            name: "modalTitle",
            title: "ModalTitle",
            type: "string",
        },
        {
            name: "modalDescription",
            title: "modalDescription",
            type: "string",
        },
        {
            name: "modalImgUrl",
            title: "ModalImgUrl",
            type: "image",
        },
        {
            name: "gitUrl",
            title: "GitUrl",
            type: "string",
        },
    ],
};
