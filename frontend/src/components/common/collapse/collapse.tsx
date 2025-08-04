'use client';
import { Collapse } from "antd";
// import PanelComponent from "./panel";
import { fetchDataProduct } from '@/infrastructure/apis/swr.api'
import { Suspense, lazy } from 'react';

const LazyHeavyComponent = lazy(() => import('./panel'));


const CollapseComponent = () => {
  const { Panel } = Collapse;

  const { data, error, isLoading } = fetchDataProduct('/products');
  
    if (error) return "An error has occurred.";
    if (isLoading) return "Loading...";

    return (
        <Collapse defaultActiveKey={['1']} expandIconPosition="end" accordion>
          {data?.map((product: IProduct) => (
            /* forceRender={true} thì sẽ tự động lazyload, đang để false để test thử lazy */
            <Panel header={<HeaderComponent product={product}/>} key={product.id} forceRender={false}>
              {/* <PanelComponent id={product.id}/> */}
              <Suspense fallback={<p>Đang tải component...</p>}>
                <LazyHeavyComponent id={product.id} />
              </Suspense>
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