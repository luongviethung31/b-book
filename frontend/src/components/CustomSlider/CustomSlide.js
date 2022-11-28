import React from "react";
import Slider from 'react-slick';


const DataSlider = [{
  title: 'Sapiens - Lược Sử Loài Người Bằng Tranh - Tập 2: Những Trụ Cột Của Nền Văn Minh',
  author: 'Yuval Noah Harari',
  description: '12tháng trước cả Việt Nam căng mình đối phó với đại dịch COVID-19. TP.HCM và vùng phụ cận bị tổn thương nặng nề, cả xã hội căng thẳng trong trạng thái giãn cách ai ở đâu ngồi yên ở đó. Hệ thống y tế quá tải, các bệnh viện chật kín bệnh nhân. Lực lượng y tế tuyến đầu luôn làm việc trong trạng thái căng thẳng, kiệt sức. Các khu công nghiệp hoặc đóng cửa hoặc thực hiện sản xuất ba tại chỗ cầm chừng. Hoạt động giao thông, vận chuyển hàng hóa giữa các địa phương trên cả nước gần như phong tỏa hoàn toàn nhằm ngăn chặn nguy cơ bùng phát dịch bệnh.',
  discount: '20%',
  price: '98000',
  image:'https://newshop.vn/public/uploads/options/jpg61cec1a77f3f7.jpg'
}, {
  title: 'Sapiens Tập 2: Những Trụ Cột Của Nền Văn Minh',
  author: 'Yuval Noah Harari',
  description: 'TẬP 2 của loạt truyện tranh chuyển thể từ tác phẩm "Sapiens - Lược sử loài người" của tác giả Yuval Noah Harari được chính thức phát hành trên toàn cầu.',
  discount: '20%',
  price: '98000',
  image:'https://newshop.vn/public/uploads/options/sachvanhoc.jpg'
}, {
  title: 'Sapiens - Lược Sử Loài Người Bằng Tranh',
  author: 'Yuval Noah Harari',
  description: '"Sapiens - Lược sử loài người" của tác giả Yuval Noah Harari được chính thức phát hành trên toàn cầu.',
  discount: '20%',
  price: '98000',
  image:'https://newshop.vn/public/uploads/options/sachchobe.jpg'
}, ]

const CustomSlide = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
};

return (

  <Slider {...settings}>
    {DataSlider.map((item, idx) => {
      return (
        <div className="custom-slide" key={idx}>
          
      <img src={item.image} alt="slide-banner"/>
      <p>{item.title}</p>
   
        </div>
      )
    } ) }
    
    </Slider>

    )
  
};

export default CustomSlide;
