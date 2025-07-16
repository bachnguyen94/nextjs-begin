import { PulseLoader } from 'react-spinners';

export default function Loading() {
  return (
        <div className="position-fixed inset-0 d-flex align-items-center justify-content-center bg-white z-50">
            <PulseLoader color="#36d7b7" />
        </div>
    ) 
}