"use client"
import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules';


import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import './slideshow.css';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Producs {
    image: string,
    title: string,
    id: string,
    slug: string
}
interface Props {
    products: Producs[]
    className?: string;
}
function ProductSlideHome({ products }: Props) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        function handleRisize() {
            const width = Number(window.innerWidth);
            if (width < 700) {
                setIsMobile(true)
            } else {
                setIsMobile(false)
            }
        }
        window.addEventListener('resize', handleRisize)
        return () => {
            window.removeEventListener('resize', handleRisize)
        }
    }, [])
    return (
        <div className="mb-10 border w-full h-fit">
            <Swiper
                pagination
                autoplay={{
                    delay: 2500
                }}
                navigation={!isMobile}
                modules={[FreeMode, Autoplay, Pagination, Navigation]}
                className="mySwiper2 w-full h-fit "
            >
                {products.map(product => {
                    return <SwiperSlide key={product.id}
                        className='flex justify-center items-center select-none'
                    >
                        <Link
                            href={`/product/${product.slug}`}
                            className=''
                        >
                            <Image
                                width={600}
                                height={600}
                                src={`/products/${product.image}`}
                                alt={product.title}
                                className="object-cover h-full"
                            /></Link>
                    </SwiperSlide>
                })}
            </Swiper>
        </div>
    )
}

export default ProductSlideHome