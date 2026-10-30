import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Item from '../Item/Item';
import { useAppContext } from '../../context/AppContext';
import ItemSkeleton from '../Item/ItemSkeleton';

function Slider({ item }) {

    const { isLoad } = useAppContext()

    return (
        <Swiper
            className='swipe'
            modules={[Navigation, Autoplay]}
            slidesPerView={1}
            breakpoints={{
                1440: {
                    slidesPerView: 4
                },
                1024: {
                    slidesPerView: 3
                },
                768: {
                    slidesPerView: 2
                },
                640: {
                    slidesPerView: 2
                }
            }}
            autoplay={{
                delay: 3000,
                disableOnInteraction: true,
            }}
            loop
            navigation
        >
            {
                isLoad ?
                    <>
                        <SwiperSlide>
                            <ItemSkeleton />
                        </SwiperSlide>
                        <SwiperSlide>
                            <ItemSkeleton />
                        </SwiperSlide>
                        <SwiperSlide>
                            <ItemSkeleton />
                        </SwiperSlide>
                        <SwiperSlide>
                            <ItemSkeleton />
                        </SwiperSlide>
                        <SwiperSlide>
                            <ItemSkeleton />
                        </SwiperSlide>
                    </>
                    :
                    item.map(product => (
                        <SwiperSlide key={product.id}>
                            <div className="m-auto p-3">
                                <Item {...product} />
                            </div>
                        </SwiperSlide>
                    ))
            }
        </Swiper>
    )
}

export default Slider;