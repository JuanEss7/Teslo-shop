'use client'
import { getPaginatedProductsWithImages } from '@/actions';
import { Pagination, ProductGrid, Title } from '@/components';
import ProductSlideHome from '@/components/product/slideshow/ProductSlideHome';
import { FormEvent, useEffect, useState } from 'react';
import { Product } from '@/interfaces';
import { useDebounce } from 'use-debounce';
import { RotatingLines } from 'react-loader-spinner'


interface Props {
  searchParams: {
    page?: string;
  }
}


export default function Home({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [searchProduct, setSearchProduct] = useState<undefined | string>();
  const [orderProducts, setOrderProducts] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [debounceText] = useDebounce(searchProduct, 1000);
  const productsToSlideShow = products.slice(-6).map(product => {
    return {
      id: product.id,
      image: product.images[0],
      title: product.title,
      slug: product.slug
    }
  })
  function handleSubmit(e: FormEvent) {
    e.preventDefault()
  }
  useEffect(() => {
    getPaginatedProductsWithImages({ page, title: debounceText, order: orderProducts })
      .then(({ products: items, totalPages }) => {
        setIsLoading(false)
        setProducts(items)
        setTotalPages(totalPages)
      })
      .catch(() => {
        setIsLoading(false)
        setSearchProduct(undefined)
        setProducts([])
        setTotalPages(1)
      });
  }, [page, debounceText, orderProducts])
  return (
    <>
      <Title
        title="Tienda"
        subtitle="Todos los productos"
        className="mb-2"
      />
      {
        (page === 1 && products.length === 12) && <ProductSlideHome
          products={productsToSlideShow}
          className="hidden md:block border border-orange-500"
        />
      }
      {
        !isLoading ?
          <>
            <form
              className='w-fit py-3 flex items-center justify-start gap-3'
              onSubmit={handleSubmit}>
              <input
                type="text"
                name='product'
                placeholder='Buscar producto'
                className='py-1 px-2 focus:outline-none rounded-sm bg-transparent'
                onChange={(e) => setSearchProduct(e.target.value)}
                value={searchProduct}
              />
              <label className='flex justify-center items-center gap-1'>
                Ordernar por precio
                <input
                  type="checkbox"
                  checked={orderProducts}
                  onChange={(e) => setOrderProducts(e.target.checked)}
                />
              </label>
            </form>
            <ProductGrid
              products={products}
            />
          </>
          :
          <div className='w-full flex items-center justify-center'>
            <RotatingLines
              visible={true}
              strokeColor='#60a2e9'
              width="70"
              strokeWidth="3"
              animationDuration="0.6"
              ariaLabel="rotating-lines-loading"
            />
          </div>
      }
      <Pagination totalPages={totalPages} />
    </>
  );
}
