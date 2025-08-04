'use client';
import { Collapse } from "antd";
import PanelComponent from "./panel";
import { fetchDataProduct } from '@/infrastructure/apis/swr.api'


const CollapseComponent = () => {
  const { Panel } = Collapse;

  const { data, error, isLoading } = fetchDataProduct('/products');
  
    if (error) return "An error has occurred.";
    if (isLoading) return "Loading...";

    return (
        <Collapse defaultActiveKey={['1']} expandIconPosition="end">
          {data?.map((product: IProduct) => (
            <Panel header={<HeaderComponent product={product}/>} key={product.id}>
              <PanelComponent />
            </Panel>
          ))}
        </Collapse>
    );
}

const HeaderComponent = ({product}: IpropsProduct) => {
  return (
    <div className="flex items-center justify-between">
      <p>{product.title}</p>
      <p>{product.slug}</p>
    </div>
  );
}

export default CollapseComponent;