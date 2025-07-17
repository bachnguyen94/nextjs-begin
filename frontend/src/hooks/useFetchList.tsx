import { useEffect, useState } from "react";
import { fetchProducts } from "@/infrastructure/apis/product.api";

const useFetchList = (params: string, query: any) => {
    const [list, setList] = useState([])
    useEffect (() => {
        const queryString = new URLSearchParams(query).toString();
        fetchProducts(params, queryString).then((res) => {
            setList(res.data);
        })
    },[JSON.stringify(query)]);
    return [list]
}
export default useFetchList;