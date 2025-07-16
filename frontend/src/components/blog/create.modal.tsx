'use client'
import { Dispatch, useEffect, useState, SetStateAction } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useBlogFormik } from "@/components/blog/blogFormHook";
import Form from 'react-bootstrap/Form';
import {createBlog, getBlog, updateBlog} from '@/infrastructure/apis/blog.api';
import {mutate} from 'swr';
import { toast } from 'react-toastify';
import {notificationSuccess} from '@/helper/helper'

type modalProps = {
    id: number;
    setID: Dispatch<SetStateAction<number>>;
    show: boolean;
    setShow : Dispatch<SetStateAction<boolean>>
}


export default function CreateModal({id, setID, show, setShow}: modalProps) {
    const handleClose = () => {
        formik.setErrors({});
        setShow(false);
    };
    const handleShow = () => {
        setID(0);
        setShow(true);
        formik.resetForm();
    }
    const formik = useBlogFormik((values) => {
        createBlog(values)
            .then(() => {
                notificationSuccess("Blog created successfully");
                formik.resetForm();
                handleClose();
                mutate(`${process.env.NEXT_PUBLIC_BASE_URL}/blogs`);
            })
            .catch((error: any) => {
                console.error("Error creating blog:", error);
                toast.error("Failed to create blog");
            });
    });

    useEffect(() => {
        if (id > 0) {
            getBlog(id)
            .then((response: any) => {
                formik.setValues(response.data);
                setShow(true);
            })
            .catch((error: any) => {
                console.error("Error fetching blog data:", error);
                toast.error("Failed to fetch blog data");
            });
        }
    }, [id]);

    const handleUpdate = (e: React.MouseEvent<HTMLButtonElement> , id: number) => {
        e.preventDefault();
        const values = formik.values;
        // console.log(values);
        updateBlog(id, values)
        .then(() => {
            notificationSuccess("Blog updated successfully");
            formik.resetForm();
            handleClose();
            mutate(`${process.env.NEXT_PUBLIC_BASE_URL}/blogs`);
        })
        .catch((error: any) => {
            console.error("Error updating blog:", error);
            toast.error("Failed to update blog");
        });
    }

    return (
        <>
            <Button className='btn btn-primary mb-3 mt-3 text-left' onClick={handleShow}>Add new</Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>Add new</Modal.Title>
                </Modal.Header>
                <form>
                    <Modal.Body>
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
                            rows={3}
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
                    
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {id === 0 ?
                        <Button type="submit" variant="primary" onClick={formik.handleSubmit}>Save</Button>
                    :
                        <Button type="submit" variant="primary" onClick={(e) => handleUpdate(e, id)}>Update</Button>
                    }
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}