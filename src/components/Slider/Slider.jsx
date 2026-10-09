import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Item from '../Item/Item';

function Slider({item}) {

    return(
        <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    slidesPerView={1}
                    breakpoints={{
                        1440: {
                            slidesPerView: 4
                        },
                        1024: {
                            slidesPerView: 3
                        },
                        768: {
                            slidesPerView : 2
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
                        item.map(product => (
                            <SwiperSlide>
                                <div className="m-auto">
                                    <Item key={product.id} {...product}/>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
    )
}

export default Slider;