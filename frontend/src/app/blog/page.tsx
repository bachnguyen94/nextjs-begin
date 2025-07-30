'use client'
import { useEffect, useState } from 'react'
import TableComponent2 from '@/components/common/table2';
import CreateModal from '@/components/blog/create.modal'
import ToastComponent from '@/components/common/toast';
import { fetchData, fetchDataProduct } from '@/infrastructure/apis/swr.api'



export default function Blogs() {
  const [id, setID] = useState<number>(0);
  const [show, setShow] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);

  const handlePageChange = (selected: number) => {
    // Handle page change logic here, e.g., fetch new data based on selected page
    setPage(selected);
  };

// const { data, error, isLoading } = fetchData(`/blogs?_page=` +page +`&_per_page=2`);
const { data, error, isLoading } = fetchDataProduct(`/products?offset=` + page + `&limit=1`);

  if (error) return "An error has occurred.";
  if (isLoading) return "Loading...";

  return (
    <main>
      <CreateModal id={id} setID={setID} show={show} setShow={setShow}/>
      <TableComponent2 blogs={data?.sort((a: any, b:any) => b.id - a.id)} setID={setID} setShow={setShow} pageChange={handlePageChange}/>
      <ToastComponent />
    </main>
  )
}
