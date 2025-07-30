interface IBlog {
    id?: number;
    title: string;
    content: string;
    author: string;
}

interface IProduct {
    id?: number;
    title: string;
    description: string;
    slug: string;
}

interface IQuery {
    _page: string;
    _per_page: string;
}

interface IQueryProduct {
    limit?: string;
    skip?: string;
    select?: string
}

interface IProduct {
    id: string;
    title: string;
    description: string,
    category: string,
    price: string
}