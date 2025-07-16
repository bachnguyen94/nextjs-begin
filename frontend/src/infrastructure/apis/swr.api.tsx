import useSWR from 'swr'

const fetcher = (url:string) => fetch(url)
  .then((res) => res.json());

export function fetchData(params: string) {
  console.log(process.env.NEXT_PUBLIC_BASE_URL);
    const { data, error, isLoading } = useSWR(
        process.env.NEXT_PUBLIC_BASE_URL + params,
        fetcher,
        {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
        }
    );
    return {data, error, isLoading};
}