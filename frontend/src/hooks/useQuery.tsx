import {useState} from 'react'

const useQuery = (initial: any) => {
    const [query, setQuery] = useState<any>(initial);
    const resetQuery = () => {
        setQuery(initial);
    }
    const updateQuery = (newQuery: any) => {
        setQuery({
            ...query,
            ...newQuery
        });
    }
    return [query, updateQuery, resetQuery];
}

export default useQuery;