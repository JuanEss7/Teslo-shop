export const revalidate = 60; // 60 segundos


import { redirect } from 'next/navigation';

import { getPaginatedProductsWithImages } from '@/actions';
import { Pagination, ProductGrid, Title } from '@/components';
import ProductSlideHome from '@/components/product/slideshow/ProductSlideHome';



interface Props {
  searchParams: {
    page?: string;
  }
}


export default async function Home({ searchParams }: Props) {

  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ page });


  if (products.length === 0) {
    redirect('/');
  }
  const productsToSlideShow = products.slice(-6).map(product => {
    return {
      id: product.id,
      image: product.images[0],
      title: product.title,
      slug: product.slug
    }
  })
  return (
    <>
      <Title
        title="Tienda"
        subtitle="Todos los productos"
        className="mb-2"
      />
      {page === 1 && <ProductSlideHome
        products={productsToSlideShow}
        className="hidden md:block border border-orange-500"
      />}

      <ProductGrid
        products={products}
      />


      <Pagination totalPages={totalPages} />

    </>
  );
}
