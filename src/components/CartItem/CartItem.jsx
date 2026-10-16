import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

function CartItem({ item }) {

    const { plusOne, removeOne, removeFromCart } = useAppContext()

    return (
        <div className="font-mono relative max-w-70 h-min p-3 shadow-mist-500 bg-zinc-700 border rounded-lg border-mist-500 shadow">
            <Link to={`/product/${item.product.id}`}>
                <img className='rounded h-30 sm:h-40 aspect-square mx-auto mb-2' src={item.product.image} alt="" />
            </Link>
            <p>{item.product.title}</p>
            <div className='flex items-center justify-between mb-1'>
                <p className='flex items-center'>
                    <svg className="size-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="yellow" viewBox="0 0 24 24" strokeWidth={1.5} stroke="yellow">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                    </svg>
                    {item.product.rating}
                </p>
                {item.product.shipping.free && <p className="text-sm border border-gray-500 shadow font-bold bg-gray-600 px-2 rounded-xl text-nowrap w-min">Free shipping</p>}
            </div>
            <div className='flex gap-3'>
                {item.product.discount !== 0 && <p className='bg-red-500 rounded-lg px-1'>{item.product.discount}%</p>}
                <p className='text-green-300'>{item.product.discount !== 0 ?
                    ((item.product.price * (1 - item.product.discount / 100)) * item.qty).toFixed(2)
                    : item.product.price * item.qty}$</p>
            </div>
            <div className="flex mt-2 justify-between items-center">
                <button onClick={() => plusOne(item.product.id)} className="cursor-pointer size-8 hover:ring-2 text-neutral-300 shadow-md hover:ring-neutral-300 transition-all bg-green-600 font-black text-2xl px-2 rounded-lg">
                    +
                </button>
                <p className="text-xl border-b">{item.qty}</p>
                <button onClick={() => removeOne(item.product.id)} className="cursor-pointer size-8 hover:ring-2 text-neutral-300 shadow-md hover:ring-neutral-300 transition-all bg-red-600 font-black text-2xl px-2 rounded-lg">
                    -
                </button>
            </div>
            <button onClick={() => removeFromCart(item.product.id)} className="absolute -top-4 -right-2 flex justify-center py-1 cursor-pointer hover:ring-2 text-neutral-300 shadow-md hover:ring-neutral-300 transition-all bg-red-600 font-black px-2 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={"currentColor"} viewBox={"0 0 24 24"}>{/* Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free */}<path d="M17 6V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H2v2h2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8h2V6zM9 4h6v2H9zM6 20V8h12v12z" /><path d="M9 10h2v8H9zM13 10h2v8h-2z" /></svg>
            </button>
        </div>
    )
}

export default CartItem;