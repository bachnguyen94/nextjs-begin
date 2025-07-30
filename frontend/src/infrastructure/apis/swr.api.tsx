import useSWR from 'swr'

const fetcher = (url:string) => fetch(url)
  .then((res) => res.json());

export function fetchData(params: string) {
    const { data, error, isLoading } = useSWR(
        process.env.NEXT_PUBLIC_BASE_URL + params,
        fetcher,
        {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
        }
    );
    console.log(process.env.NEXT_PUBLIC_BASE_URL + params);
    return {data, error, isLoading};
}

export function fetchDataProduct(params: string) {
    const { data, error, isLoading } = useSWR(
        "https://api.escuelajs.co/api/v1" + params,
        fetcher,
        {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
        }
    );
    console.log(process.env.NEXT_PUBLIC_BASE_URL + params);
    return {data, error, isLoading};
}