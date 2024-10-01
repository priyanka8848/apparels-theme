import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import HomeBannerImg from '../../../public/assets/images/clothing_banner.png';
import HomeBannerSale from '../../../public/assets/images/clothing_sale.png';
import SunGlassSale from '../../../public/assets/images/sunglass_banner.png';

const HomeBanner = () => {
  const imageLoader = ({ src, width, quality }: any) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };
  return (
    <>
      <div className="container-fluid slider-container mt-4">
        <div className="row mt-3">
          <div className="col-sm-12 col-md-9 col-lg-9 col-xl-9">
            <Link href={'/'} className="banner-title text-white text-capitalize ls-25 homecategory_btnlink">
              <div className="category-banner banner banner-fixed " style={{ maxWidth: '100%', height: 'auto' }}>
                <Image
                  //   loader={imageLoader}
                  className={`w-100 `}
                  src={HomeBannerImg}
                  alt="Picture of the author"
                  width={1200}
                  height={500}
                  loading="eager"
                  priority={true}
                />
              </div>
            </Link>
          </div>
          <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">
            <div className="mb-4">
              <Link href={'/'} className="banner-title text-white text-capitalize ls-25 homecategory_btnlink">
                <div className="category-banner banner banner-fixed " style={{ maxWidth: '100%', height: 'auto' }}>
                  <Image
                    loader={imageLoader}
                    className={`w-100`}
                    src={HomeBannerSale}
                    alt="Picture of the author"
                    width={200}
                    height={235}
                    loading="eager"
                    priority={true}
                  />
                </div>
              </Link>
            </div>
            <Link href={'/'} className="banner-title text-white text-capitalize ls-25 homecategory_btnlink">
              <div className="category-banner banner banner-fixed " style={{ maxWidth: '100%', height: 'auto' }}>
                <Image
                  loader={imageLoader}
                  className={`w-100`}
                  src={SunGlassSale}
                  alt="Picture of the author"
                  width={200}
                  height={235}
                  loading="eager"
                  priority={true}
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeBanner;
