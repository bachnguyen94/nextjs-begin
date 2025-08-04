'use client';
import { fetchDataProduct } from '@/infrastructure/apis/swr.api'

interface IdProps {
  id: number;
}

const PanelComponent = ({id}: IdProps) => {
  console.log(id);
    const { data, error, isLoading } = fetchDataProduct(`/products/${id}`);
      
    if (error) return "An error has occurred.";
    if (isLoading) return "Loading...";
    return (
        <p>{data.description}</p>
    );
}

export default PanelComponent;