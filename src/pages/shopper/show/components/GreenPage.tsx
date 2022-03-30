import React from 'react';
import '../bootstrap.rtl.css';
import '../style.css';
import { Button } from 'antd';
import { ShoppingTwoTone } from '@ant-design/icons';
import '../bootstrap.bundle.min';

class GreenPage extends React.Component {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <header className="container-fluid text-center">
          <div className="row subtitle">
            <div className="col w-100 ">
              <span>ESTB</span>
              <img src="/images/title.png" height="180" width="180" alt={''} />
              <span>2021</span>
            </div>
          </div>
          <div className="row title">
            <h2>LITTLE GREEN MIRACLE</h2>
          </div>
          <div className="row subtitle2">
            <h4>BRING NATURE INDOOR</h4>
          </div>
        </header>

        <section className="container-fluid order">
          <div className="row">
            <div className="col-lg-5 col-md-12 text-center">
              <div>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/x8s8ukbMtxk"
                        title="YouTube video player" frameBorder="0"
                        className={'miracleVideo'}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen></iframe>
                <img src="/images/pot plants.jpeg" alt="..." />
                {/*<button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleFade"
                  data-bs-slide="prev"
                >
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleFade"
                  data-bs-slide="next"
                >
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>*/}
              </div>
            </div>
            <div className="col-lg-6 col-md-12 text-center text-block">
              <h4 className="title-2">ABOUT THE KITS</h4>
              <hr />
              <p>
                As a part of the Miracle for Makeda campaign, Impact is selling beautiful and fragrant herb and vegetable boxes for your home garden. Choose a selection of herbs and vegetables to be assembled just for you. We take care of packaging and delivery. And as you watch your little garden grow, you can know that hope has grown for Makeda too, for each leaf that sprouts are an inch towards getting her the clinical trial she needs to save her.
                <br/><br/>
                herb kit options: basil, parsley, mint, thyme, cilantro, green onion<br/>
                crunchy kit options: nantes carrot, red radish, red leaf lettuce, butter lettuce, iceberg lettuce<br/>
                $30 / kit : 4 pots + blooming manual + plant fertilizer<br/>
                <br/>
                To make up your own kit, you are allowed to choose four herbs/vegetables from the collection we offer. Complete the order form below, and we will deliver it to you within two weeks of your order.

              </p>
              {/* <button type="button" className="btn btn-outline-warning">Order Now</button> */}
              <Button
                type="default"
                onClick={() => {
                  this.props.myFunc(true);
                }}
                shape="round"
                style={{ minWidth: 120 }}
                icon={<ShoppingTwoTone twoToneColor="#FF8800" />}
              >
                Order Now
              </Button>
            </div>
          </div>
        </section>

        <section className="container-fluid intro">
          <div className="row">
            <div className="col-lg-6 col-md-12 text-center text-block">
              <h4 className="title-2">ABOUT US</h4>
              <div className="slash"></div>
              <p>
                We are a group of passionate youths who yearn to create change locally and globally. Our mission is to form meaningful
                relationships while reaching shared objectives. We aspire to use available resources efficiently and to establish an open
                environment where ideas can be shared and implemented. This way, we can initiate greater change and make the result worthwhile.
              </p>
            </div>
            <div className="col-lg-3 col-md-6 text-center overflow-hidden" style={{ height: '456', width: '460', paddingLeft: '0px'}}>
              <img src="/images/aboutus1.jpeg" width={'450px'}/>
            </div>
            <div
              className="col-lg-3 col-md-6 overflow-hidden text-center"
              style={{ height: '456', width: '442', paddingLeft: '0px'}}
            >
              <img src="/images/aboutus2.jpeg" width={'450px'}/>
            </div>
          </div>
        </section>

        <footer className="container-fluid">
          <div className="row info justify-content-center align-content-center text-center">
            {/*<div className="col-lg-4 col-sm-12">
              <div className="title">OUR STORE</div>
              <div className="list">
                <ul>
                  <li>Address: 1250 Chartwell Dr</li>
                  <li>Street West Vancouver, BC V7S 2R2</li>
                  <li>Phone: 604-368-6927</li>
                  <li>Email: kristina.m.carroll@gmail.com</li>
                </ul>
              </div>
            </div>*/}
            <div className="col-lg-4 col-offset-4 col-sm-12">
              <div className="title">CONTACT US</div>
              <div className="list">
                <ul>

                  <li>Email: kristina.m.carroll@gmail.com</li>
                  <li>Phone: 604-368-6927</li>
                  <a href={'https://www.impactinitiative.net/herb-package-sale'} target={'_blank'} style={{color: 'white', textDecoration: 'none'}}>impactinitiative.net/herb-package-sale</a>
                </ul>
              </div>
            </div>
            {/*<div className="col-lg-4 col-sm-12">
              <div className="title">OUR STORE</div>
              <div className="list">
                <ul>
                  <li>Address: 1250 Chartwell Dr</li>
                  <li>Street West Vancouver, BC V7S 2R2</li>
                  <li>Phone: 604-368-6927</li>
                  <li>Email: kristina.m.carroll@gmail.com</li>
                </ul>
              </div>
            </div>*/}
            <div className="socialMedia text-center">
              <a href="#">
                <img src="/images/facebook.webp" height="24" width="24" />
              </a>
              <a href="#">
                <img src="/images/pinterest.webp" height="24" width="24" />
              </a>
              <a href="#">
                <img src="/images/instagram.webp" height="24" width="24" />
              </a>
            </div>
          </div>
          <div className="row copyright">
            <div className="col text-center">
              Copyright ©2021 by Prickles & Co. Proudly created by Henry Yi
            </div>
          </div>
        </footer>
      </>
    );
  }
}

export default GreenPage;
