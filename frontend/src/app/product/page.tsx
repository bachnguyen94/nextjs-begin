'use client'
import { useEffect, useState } from 'react'
import ToastComponent from '@/components/common/toast';
import useFetchList from '@/hooks/useFetchList'
import useQuery from '@/hooks/useQuery'



export default function Blogs() {
  const [query, updateQuery, resetQuery] = useQuery({
    limit: 10,
    select: "title"
  });
  const [data] = useFetchList('products', query);
  const update = () => {
      updateQuery({limit: Math.random()*10});
  }
  
  console.log(data);

  return (
    <main>
      <button onClick={update}>aaaa</button>
    </main>
  )
}
