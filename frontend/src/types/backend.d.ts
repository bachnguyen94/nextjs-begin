interface IBlog {
    id?: number;
    title: string;
    content: string;
    author: string;
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