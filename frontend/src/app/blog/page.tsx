'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import TableComponent from '@/components/common/table'
import CreateModal from '@/components/blog/create.modal'
import ToastComponent from '@/components/common/toast';
import { fetchData } from '@/infrastructure/apis/swr.api'



export default function Blogs() {
  const [id, setID] = useState<number>(0);
  const [show, setShow] = useState<boolean>(false);

  const { data, error, isLoading } = fetchData("/blogs");

  if (error) return "An error has occurred.";
  if (isLoading) return "Loading...";

  return (
    <main>
      <CreateModal id={id} setID={setID} show={show} setShow={setShow}/>
      <TableComponent blogs={data?.sort((a: any, b:any) => b.id - a.id)} setID={setID} setShow={setShow}/>
      <ToastComponent />
    </main>
  )
}
