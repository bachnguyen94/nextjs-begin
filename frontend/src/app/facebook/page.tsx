'use client';
import {useRouter} from "next/navigation";
import { Button } from 'react-bootstrap';

const Facebook = () => {
    const router = useRouter();
    const backBtn = () => {
        router.push("/");
    }
  return (
    <div>
      <h1>Facebook Page</h1>
      <p>This is the Facebook page content.</p>
      <Button variant="success" onClick={backBtn}>Back home</Button>
    </div>
  );
}

export default Facebook;