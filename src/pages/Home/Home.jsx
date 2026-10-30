import { Link } from "react-router-dom";
import Container from "../../components/Container/Container";
import Slider from "../../components/Slider/Slider";
import { useAppContext } from "../../context/AppContext";
import { useMemo, useState } from "react";
import { Swiper, SwiperSlide} from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

function Home() {

    const [swiper, setSwiper] = useState(null);

    const {products} = useAppContext()

    const topDiscount = useMemo(() => {
        let data = [...products]
        data = data
            .filter(item => item.discount > 0)
            .sort((a, b) => b.discount - a.discount)
            .slice(0, 5)
        return data
    }, [products])

    const topRating = useMemo(() => {
        let data = [...products]
        data = data
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 5)
        return data
    }, [products])
    
    const categoryProducts = useMemo(() => {
        const categories = [...new Set(products.map(item => item.category))]
        
        return categories.map(category => ({
            category,
            products: products
                .filter(item => item.category === category)
                .sort((a, b) => b.rating - a.rating)
                .slice(0,5)
        }))
    }, [products])
    
    return(
        <>
            <Container>
                <div className="w-full myGr my-5 h-80 grid grid-rows-6 p-3.5 items-center rounded-4xl bg-amber-900">
                    <h2 className="row-start-2 font-mono text-center text-xl md:text-2xl">
                        All The Technology You Need In One Place
                    </h2>
                    <p className="md:row-start-3 row-start-4 text-center font-thin my-10">
                        Modern Laptops, Mobiles, Monitor, Gaming Equipment, ect... with best price. 
                    </p>
                    <Link to="/items" className="row-start-6 w-30 flex justify-center items-center bg-gray-700 border text-neutral-400 hover:text-mist-200 hover:ring-gray-500 hover:ring-2 border-gray-600 rounded-full justify-self-center py-1 px-3 text-sm font-thin ">
                        all products...
                    </Link>
                </div>
                <div className="specialLg text-mist-300 p-1 rounded-xl">
                    <div className="flex sm:flex-row flex-col justify-between sm:items-center m-1 sm:m-5">
                        <div className="flex sm:flex-row flex-col items-baseline">
                            <h3 className="font-mono text-xl mr-3">Special Offers</h3>
                            <p className="text-sm font-thin">Best Price You'll Ever Find</p>
                        </div>
                        <Link to="/items?sort=discount" className="h-8 max-w-32 sm:mt-0 mt-2 text-xs font-mono flex justify-center items-center bg-zinc-700 border hover:ring-mist-400 hover:ring-2 border-gray-600 rounded-full justify-self-center py-1 px-3">
                            all products...
                        </Link>
                    </div>
                    <Slider item={topDiscount}/>
                </div>
                <div className="topLG my-20 text-mist-300 p-2 rounded-xl">
                    <div className="flex sm:flex-row flex-col justify-between sm:items-center m-1 sm:m-5">
                        <div className="flex sm:flex-row flex-col items-baseline">
                            <h3 className="font-mono text-xl mr-3">Top Rated</h3>
                            <p className="text-sm font-thin">Our Customers Favorite</p>
                        </div>
                        <Link to="/items?sort=rating" className="h-8 max-w-32 sm:mt-0 mt-2 text-xs font-mono flex justify-center items-center bg-zinc-700 border hover:ring-mist-400 hover:ring-2 border-gray-600 rounded-full justify-self-center py-1 px-3">
                            all products...
                        </Link>
                    </div>
                    <Slider item={topRating}/>
                </div>  
                <div className="text-mist-300 p-1 bg-gray-600 rounded-xl">
                    <Swiper
                        modules={[Navigation]}
                        slidesPerView={1}
                        loop
                        onSwiper={setSwiper}
                        >
                        {
                            categoryProducts.map(({category, products}) => (
                                <SwiperSlide key={category}>
                                    <div className="font-mono mt-3 flex-row items-baseline ml-1 flex justify-between">
                                        <h2 className="text-xl mx-7">{category.charAt(0).toUpperCase()}{category.slice(1)}</h2>
                                        <Link to={`/items?category=${category}`}className="h-8 max-w-32 sm:mt-0 mt-2 text-xs flex justify-center items-center bg-zinc-700 border hover:ring-mist-400 hover:ring-2 border-gray-600 rounded-full justify-self-center py-1 px-3">
                                            all products...
                                        </Link>
                                    </div>
                                    <Slider item={products} />
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                    {/* swipe buttons*/}
                        
                        <div className="flex justify-center mb-2">
                            <button
                                onClick={() => swiper?.slidePrev()}
                                className="text-xl mr-10 bg-gray-800 size-10 flex justify-center items-center p-2 rounded-full cursor-pointer"
                            >
                          	    &lt;
                            </button>
                            <button
                                onClick={() => swiper?.slideNext()}
                                className="text-xl bg-gray-800 size-10 flex justify-center items-center p-2 rounded-full cursor-pointer"
                            >
                          	    &gt;
                            </button>
                        </div>
                        
                </div> 
            </Container>
        </>
    )
}

export default Home;