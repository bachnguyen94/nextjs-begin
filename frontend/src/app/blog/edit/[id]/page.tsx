'use client'
import { fetchData } from '@/infrastructure/apis/swr.api'
import { useEffect } from 'react'
import { useBlogFormik } from "@/components/blog/blogFormHook";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { updateBlog } from '@/infrastructure/apis/blog.api';
import { useRouter } from 'next/navigation';
import {notificationSuccess} from '@/helper/helper'
import {mutate} from 'swr';
import Link from 'next/link'
import { PulseLoader } from 'react-spinners';

export default function EditDetailBlog({params}: {params: {id: string}}) {
    const {data, error, isLoading} = fetchData(`/blogs/${params.id}`);
    const router = useRouter();
    
    const formik = useBlogFormik((values) => {
        updateBlog(data.id, values).then(() => {
            notificationSuccess("Blog updated successfully");
            mutate(`${process.env.BASE_URL}/blogs/${data.id}`);
            router.push(`/blog/view/${data.id}`);
        });
    });
    useEffect(() => {
        if (data) formik.setValues(data); 
    },[data]);
    
    if (error) return "An error has occurred.";
    if (isLoading) return "Loading...";
    console.log(data);


    return (
        <>
            <div className='container'>
                <form onSubmit={formik.handleSubmit}>
                    <Form.Label htmlFor="title">Title</Form.Label>
                    <Form.Control
                        id="title"
                        name="title"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.title}
                    />
                    {formik.touched.title && formik.errors.title ? (
                        <div>{formik.errors.title}</div>
                    ) : null}
                
                    <Form.Label htmlFor="content">Content</Form.Label>
                    <Form.Control
                        id="content"
                        name="content"
                        as="textarea"
                        rows={9}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.content}
                    />
                    {formik.touched.content && formik.errors.content ? (
                        <div>{formik.errors.content}</div>
                    ) : null}
                
                    <Form.Label htmlFor="author">Author</Form.Label>
                    <Form.Control
                        id="author"
                        name="author"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.author}
                    />
                    {formik.touched.author && formik.errors.author ? (
                        <div>{formik.errors.author}</div>
                    ) : null}
                    <Button className='mt-3 me-2' type="submit" variant="primary">Save</Button>
                    <Link className='mt-3 btn btn-light' href={`/blog/view/${params.id}`}>Cancel</Link>
                </form>
            </div>
        </>
    )
}