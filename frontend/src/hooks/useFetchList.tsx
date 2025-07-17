import { useEffect, useState } from "react";
import { fetchProducts } from "@/infrastructure/apis/product.api";

const useFetchList = (path: string, query: any) => {
    const [list, setList] = useState<IProduct[]>([])
    useEffect (() => {
        const queryString = new URLSearchParams(query).toString();
        fetchProducts(path, queryString).then((res) => {
            setList(res.data[path]);
        })
    },[JSON.stringify(query)]);
    return [list]
}
export default useFetchList;