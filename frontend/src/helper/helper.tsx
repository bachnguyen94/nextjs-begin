import { toast } from 'react-toastify';


export const notificationSuccess = (msg: string) => {
    toast.success(msg);
};