import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function Slider() {
    return(
        <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={80}
                    slidesPerView={1}
                    breakpoints={{
                        1440: {
                            slidesPerView: 4
                        },
                        1024: {
                            slidesPerView: 4
                        },
                        768: {
                            slidesPerView : 3
                        },
                        500: {
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
                    <SwiperSlide>
                        <div className="m-auto text-black bg-amber-300 size-50">
                            Slide 1
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="m-auto text-black bg-amber-300 size-50">
                            Slide 2
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="m-auto text-black bg-amber-300 size-50">
                            Slide 3
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="m-auto text-black bg-amber-300 size-50">
                            Slide 4
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="m-auto text-black bg-amber-300 size-50">
                            Slide 5
                        </div>
                    </SwiperSlide>
                </Swiper>
    )
}

export default Slider;