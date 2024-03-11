import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

export default function MovieDetailsPage() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
      <p>
        MP DE. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum
        corporis odio, totam minima itaque eligendi reiciendis iusto consectetur
        nemo quod, officiis, omnis possimus. Minus rem itaque voluptas,
        repellendus iste dicta.V
      </p>
    </>
  );
}
