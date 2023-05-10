import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import img1 from '../../../public/01Carrossel_laranja.png'
import img2 from '../../../public/03Carrossel_verao.png'
import img3 from '../../../public/Sucos-naturais-para-vender.jpg'
import img4 from '../../../public/sucos-diferentes.jpg'
import img5 from '../../../public/sucos-600x600.jpg'

const images = [
  { id: 1, src: img1.src },
  { id: 2, src: img2.src },
  { id: 3, src: img3.src},
  { id: 4, src: img4.src },
  { id: 5, src:  img5.src },
];

export default function Carrousel() {
	const settings = {
		autoplay: true, // enable autoplay
		autoplaySpeed: 3000, // set autoplay speed (in milliseconds)
		dots: true,
		touchMove: true,
		infinite: true,
		speed: 500,
		zIndex: 1,
		slidesToShow: 1,
		adaptiveHeight: true,
		slidesToScroll: 1,
	  };

  return (
    <div className="mt-[100px] w-acreen h-[300px] m-auto">
      <Slider {...settings}>
        {images.map(image => (
          <div key={image.id} >
            <img className='h-[250px] w-screen' src={image.src} alt={`Imagem ${image.id}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
}
