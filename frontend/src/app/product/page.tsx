'use client'
import { useEffect, useState } from 'react'
import ToastComponent from '@/components/common/toast';
import useFetchList from '@/hooks/useFetchList'
import useQuery from '@/hooks/useQuery'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useDebounce } from 'use-debounce';



export default function Products() {
  const [input, setInput] = useState('');
  const [debouncedValue] = useDebounce(input, 500); // chờ 500ms
  const [query, updateQuery, resetQuery] = useQuery({
    limit: 10,
    sortBy: "title",
    order: "asc",
    q: ""
  });
  const [datas] = useFetchList('products', query);

  useEffect(() => {
      updateQuery({q: input});
  }, [debouncedValue]);

  const handleSearch = (e: any) => {
      setInput(e.target.value)
  }
  
  console.log(datas);

  return (
    <main>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Search"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          onChange={handleSearch}
        />
      </InputGroup>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th className='dark:bg-black'>Title</th>
            <th>Content</th>
            <th>Category</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          { datas?.map((data, index) => (
            <tr key={data.id}>
              <td>{data.id}</td>
              <td>{data.title}</td>
              <td style={{ maxWidth: '500px', textOverflow: 'ellipsis' }}>{data.description}</td>
              <td>{data.category}</td>
              <td>{data.price}</td>
            </tr>
          )) }
        </tbody>
      </Table>
    </main>
  )
}
