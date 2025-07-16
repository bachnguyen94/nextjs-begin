import { useFormik } from 'formik';
import * as Yup from 'yup';

export const initialBlogData = {
    title: '',
    content: '',
    author: '',
};

export function useBlogFormik(onSubmit: (values: typeof initialBlogData) => void) {
    return useFormik({
        initialValues: initialBlogData,
        validationSchema: Yup.object({
            title: Yup.string()
                .max(55, 'Must be 15 characters or less')
                .required('Required'),
            content: Yup.string()
                .max(700, 'Must be 700 characters or less')
                .required('Required'),
            author: Yup.string().required('Required'),
        }),
        onSubmit,
    });
}