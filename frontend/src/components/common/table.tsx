'use client';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { Modal } from 'antd';
import { deleteBlog } from '@/infrastructure/apis/blog.api';
import { mutate } from 'swr';
import {notificationSuccess} from '@/helper/helper';
import Link from 'next/link'

interface Iprops {
  blogs: IBlog[];
  setID: React.Dispatch<React.SetStateAction<number>>;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

function TableComponent(props: Iprops) {
  const { blogs, setID, setShow } = props;
  const handleEdit = (id: number | undefined) => {
    setShow(true);
    id !== undefined ? setID(id) : setID(0);
  }
  const handleDelete = (id: number| undefined) => {
    Modal.confirm({
      title: 'Bạn chắc chắn muốn xóa?',
      content: 'Hành động này không thể hoàn tác.',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk() {
        deleteBlog(id).then(() => {
          notificationSuccess("Blog have been deleted!");
          mutate(`${process.env.BASE_URL}/blogs`);
        });
      },
      onCancel() {
        console.log('Đã hủy');
      },
    });
  }

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th className='dark:bg-black'>Title</th>
            <th>Content</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          { blogs?.map((blog, index) => (
            <tr key={blog.id}>
              <td>{blog.id}</td>
              <td>{blog.title}</td>
              <td style={{ maxWidth: '500px', textOverflow: 'ellipsis' }}>{blog.content}</td>
              <td>{blog.author}</td>
              <td style={{ textAlign: 'center' }}>
                <Link className='btn btn-primary me-2' href={`/blog/view/${blog.id}`}>View</Link>
                <Button variant="primary" className='me-2' onClick={() => handleEdit(blog.id)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(blog.id)}>Delete</Button>
              </td>
            </tr>
          )) }
        </tbody>
      </Table>
    </>
  );
}

export default TableComponent;