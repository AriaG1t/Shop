import { useEffect, useState } from "react";
import Container from "../../components/Container/Container";
import { useParams } from "react-router-dom";
import { getProduct } from "../../services/api";
import { useAppContext } from "../../context/AppContext";
import ItemSkeleton from "../../components/Item/ItemSkeleton";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

function Product() {

    const params = useParams()

    const { isLoad, setIsLoad } = useAppContext()

    const [product, setProduct] = useState([])

    useEffect(() => {
        setIsLoad(true)
        getProduct(params.id)
            .then(res => setProduct(res))
            .catch(error => console.log(error))
            .finally(() => setIsLoad(false))
    }, [params.id])

    return (
        <Container>
            <div className="flex md:flex-row flex-col gap-5 mt-5">
                {
                    isLoad ? <ItemSkeleton /> :
                        <>
                            <div className="md:col-span-1 font-mono h-fit md:sticky top-18 col-span-3 p-3 shadow-mist-500 bg-zinc-700 rounded-lg border border-mist-500 shadow">
                                <div className="md:w-60 rounded m-auto">
                                    <Swiper
                                        className="imgSwipe"
                                        modules={[Navigation, Autoplay]}
                                        slidesPerView={1}
                                        breakpoints={{
                                            768: {
                                                slidesPerView: 1
                                            },
                                            425: {
                                                slidesPerView: 1.5
                                            }
                                        }}
                                        loop
                                        navigation
                                        autoplay={{
                                            delay: 3000,
                                            disableOnInteraction: true,
                                        }}
                                    >
                                        {
                                            product.images?.map(item => (
                                                <SwiperSlide>
                                                    <img className="w-60 rounded m-auto" src={item} alt={`product ${product.id}`} />
                                                </SwiperSlide>
                                            ))
                                        }
                                    </Swiper>
                                </div>
                                <div className="mt-2">
                                    <p>{product.title}</p>
                                    <p className="flex items-center">
                                        <svg className="size-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="yellow" viewBox="0 0 24 24" strokeWidth={1.5} stroke="yellow">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                        </svg>
                                        {product.rating}
                                    </p>
                                    {
                                        product.availability === "out_of_stock" ? <p className="bg-red-600 text-center px-2 rounded">Out of stock</p> :
                                            <>

                                                <div className="flex my-2 gap-1.5 flex-wrap">
                                                    <p className="text-sm font-bold border border-gray-500 shadow bg-gray-600 px-2 rounded-xl">{product.warranty} warranty</p>
                                                    {
                                                        product.shipping?.free ? <p className="text-sm border border-gray-500 shadow font-bold bg-gray-600 px-2 rounded-xl">Free shipping</p> : null
                                                    }
                                                    <p className="text-sm font-bold border border-gray-500 shadow bg-gray-600 px-2 rounded-xl">{product.shipping?.estimatedDays} day to deliver</p>
                                                </div>
                                                <div className="grid grid-cols-2">
                                                    {
                                                        product.discount === 0 ? <p className="text-green-300 self-center row-span-2">{product.price}$</p> :
                                                            <>
                                                                <div className="flex items-baseline gap-2">
                                                                    <p className="line-through text-sm">{product.price}$</p>
                                                                    <p className="bg-red-500 rounded-lg px-1">{product.discount}%</p>
                                                                </div>
                                                                <p className="col-start-1 text-green-300">{(product.price * (1 - product.discount / 100)).toFixed(2)}$</p>
                                                            </>
                                                    }
                                                    <button className={`${product.discount === 0 && "py-1.5"} row-start-1 rounded-lg border border-gray-400 shadow hover:ring-2 text-neutral-300 cursor-pointer hover:ring-gray-300 transition-all shadow-gray-700 bg-zinc-600 text-nowrap row-span-2 col-start-2`}>
                                                        Add to Cart
                                                    </button>
                                                </div>

                                            </>
                                    }
                                </div>
                            </div>
                            <div className="md:col-span-2 text-justify col-span-3">
                                <p>{product.description}</p>
                                <div className="font-mono flex mt-2 flex-wrap gap-2">
                                    {
                                        product.features?.map(item => (
                                            <p className="bg-gray-800 border text-sm text-mist-300 shadow shadow-gray-600 border-gray-500 rounded-xl px-2">{item}</p>
                                        ))
                                    }
                                </div>
                                <div className="font-mono mt-5 w-max">
                                    <h2 className="text-lg">Specific Details</h2>
                                    <div className="grid grid-cols-2 gap-y-1 gap-x-4 rounded-lg p-3 my-2 border border-gray-500 shadow-md myGr">
                                        {Object.entries(product.specifications ?? {}).map(([key, value]) => (
                                            <p key={key}>
                                                <span className="text-lg text-neutral-400">{key}</span>: <span className="border-b border-neutral-400 pb-0.5">{value}</span> 
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </>
                }
            </div>
        </Container>
    )
}

export default Product;