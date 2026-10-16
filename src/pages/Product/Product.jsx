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
import ProductSkeleton from "./ProductSkeleton";

function Product() {

    const params = useParams()

    const { isLoad, setIsLoad, addToCart, removeFromCart, plusOne, removeOne, getQty } = useAppContext()

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
                    isLoad ? <ProductSkeleton /> :
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
                                                        product.shipping?.free && <p className="text-sm border border-gray-500 shadow font-bold bg-gray-600 px-2 rounded-xl">Free shipping</p>
                                                    }
                                                    <p className="text-sm font-bold border border-gray-500 shadow bg-gray-600 px-2 rounded-xl">{product.shipping?.estimatedDays} day to deliver</p>
                                                </div>
                                                <div className="md:grid grid-cols-6 hidden">
                                                    {
                                                        product.discount === 0 ? <p className="text-green-300 self-center row-span-2">{product.price}$</p> :
                                                            <div className="row-span-2 self-center">
                                                                <div className="flex items-baseline gap-2 col-span-3">
                                                                    <p className="line-through text-sm">{product.price}$</p>
                                                                    <p className="bg-red-500 rounded-lg px-1">{product.discount}%</p>
                                                                </div>
                                                                <p className="text-green-300">{(product.price * (1 - product.discount / 100)).toFixed(2)}$</p>
                                                            </div>
                                                    }
                                                    {
                                                        getQty(product.id) ?
                                                            <>
                                                                <div className="flex col-span-3 col-start-4 justify-between items-center">
                                                                    <button onClick={() => plusOne(product.id)} className="cursor-pointer size-8 hover:ring-2 text-neutral-300 shadow-md hover:ring-neutral-300 transition-all bg-green-600 font-black text-2xl px-2 rounded-full">
                                                                        +
                                                                    </button>
                                                                    <p className="text-xl border-b">{getQty(product.id)}</p>
                                                                    <button onClick={() => removeOne(product.id)} className="cursor-pointer size-8 hover:ring-2 text-neutral-300 shadow-md hover:ring-neutral-300 transition-all bg-red-600 font-black text-2xl px-2 rounded-full">
                                                                        -
                                                                    </button>
                                                                </div>
                                                                <button onClick={() => removeFromCart(product.id)} className="mt-1.5 flex justify-center py-1 w-3/5 mx-auto cursor-pointer hover:ring-2 text-neutral-300 shadow-md hover:ring-neutral-300 transition-all bg-red-600 font-black col-span-3 col-start-4 px-2 rounded-md">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M17 6V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H2v2h2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8h2V6zM9 4h6v2H9zM6 20V8h12v12z" /><path d="M9 10h2v8H9zM13 10h2v8h-2z" /></svg>
                                                                </button>
                                                            </>
                                                            :
                                                            <button onClick={() => addToCart(product)} className={`col-span-3 ${product.discount === 0 && "py-1.5"} row-start-1 rounded-lg border border-gray-400 shadow hover:ring-2 text-neutral-300 cursor-pointer hover:ring-gray-300 transition-all shadow-gray-700 bg-zinc-600 text-nowrap row-span-2 col-start-4`}>
                                                                Add to Cart
                                                            </button>
                                                    }
                                                </div>
                                            </>
                                    }
                                </div>
                            </div>
                            <div className="fixed w-full bottom-0 left-0 pb-3 pt-2 rounded-t-2xl z-10 md:hidden flex justify-evenly items-baseline bg-zinc-700 border-t border-gray-400">
                                <div className="flex">
                                    {
                                        product.discount === 0 ? <p className="text-green-300 self-center row-span-2">{product.price}$</p> :
                                            <>

                                                <p className="line-through">{product.price}$</p>
                                                <p className="bg-red-500 text-neutral-200 ml-1 mr-4 rounded-lg px-1">{product.discount}%</p>
                                                <p className="text-green-300">{(product.price * (1 - product.discount / 100)).toFixed(2)}$</p>
                                            </>
                                    }
                                </div>
                                {
                                    getQty(product.id) ?
                                        <>
                                            <div className="flex items-center">
                                                <button onClick={() => plusOne(product.id)} className="pb-1 size-9 cursor-pointer hover:ring-2 text-neutral-300 shadow-md hover:ring-neutral-300 transition-all bg-green-600 font-black text-2xl px-2 rounded-full">
                                                    +
                                                </button>
                                                <p className="text-xl mx-5 border-b">{getQty(product.id)}</p>
                                                <button onClick={() => removeOne(product.id)} className="pb-1 size-9 cursor-pointer hover:ring-2 text-neutral-300 shadow-md hover:ring-neutral-300 transition-all bg-red-600 font-black text-2xl px-2 rounded-full">
                                                    -
                                                </button>
                                            </div>
                                        </>
                                        :
                                        <button onClick={() => addToCart(product)} className={`col-span-3 p-1.5 ${product.discount === 0 && "py-1.5"} row-start-1 rounded-lg border border-gray-400 shadow hover:ring-2 text-neutral-300 cursor-pointer hover:ring-gray-300 transition-all shadow-gray-700 bg-zinc-600 text-nowrap row-span-2 col-start-4`}>
                                            Add to Cart
                                        </button>
                                }
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
                                <div className="font-mono mt-5">
                                    <h2 className="text-lg">Specific Details</h2>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-1 gap-x-4 rounded-lg p-3 my-2 border border-gray-500 shadow-md myGr">
                                        {Object.entries(product.specifications ?? {}).map(([key, value]) => (
                                            <p key={key}>
                                                <span className="text-lg  text-neutral-400">{key}</span>:<span className="ml-1 border-b border-neutral-400 pb-0.5">{value}</span>
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