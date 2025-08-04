'use client';
import { fetchDataProduct } from '@/infrastructure/apis/swr.api'

interface IdProps {
  id: number;
}

const PanelComponent = ({id}: IdProps) => {
    const { data, error, isLoading } = fetchDataProduct('/products');
      
    if (error) return "An error has occurred.";
    if (isLoading) return "Loading...";
    return (
        <p>dddd</p>
    );
}

export default PanelComponent;