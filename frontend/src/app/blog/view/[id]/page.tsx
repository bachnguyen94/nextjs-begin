'use client'
import { fetchData } from '@/infrastructure/apis/swr.api'
import { useEffect, useState } from 'react'
import { useBlogFormik } from "@/components/blog/blogFormHook";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Link from 'next/link'
import ToastComponent from '@/components/common/toast';

export default function ViewDetailBlog({params}: {params: {id: string}}) {
    console.log("component rerender");
    const {data, error, isLoading} = fetchData(`/blogs/${params.id}`);
    
    if (error) return "An error has occurred.";
    if (isLoading) return "Loading...";

    return (
        <>
            <div className='row'>
                <div className='col-md-2'>Title</div>
                <div className='col-md-10'>{data?.title}</div>
                <div className='col-md-2'>Content</div>
                <div className='col-md-10'>{data?.content}</div>
                <div className='col-md-2'>Author</div>
                <div className='col-md-10'>{data?.author}</div>
                <div>
                    <Link className='btn btn-primary me-2' href={`/blog/edit/${data.id}`}>Edit</Link>
                    <Link className='btn btn-light me-2' href={'/blog'}>Back</Link>
                </div>
            </div>
            <ToastComponent />
        </>
    )
}