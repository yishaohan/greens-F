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
            <h2>PRICKLES & CO</h2>
          </div>
          <div className="row subtitle2">
            <h4>BRING NATURE INDOOR</h4>
          </div>
        </header>

        <section className="container-fluid order">
          <div className="row">
            <div className="col">
              <div
                id="carouselExampleFade"
                className="carousel slide carousel-fade"
                data-bs-ride="carousel"
                data-bs-interval="5000"
              >
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img src="/images/plant.webp" className="d-block w-80" alt="..." />
                  </div>
                  <div className="carousel-item">
                    <img src="/images/cacti.webp" className="d-block w-80" alt="..." />
                  </div>
                  <div className="carousel-item">
                    <img src="/images/succulents.webp" className="d-block w-80" alt="..." />
                  </div>
                </div>
                <button
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
                </button>
              </div>
            </div>
            <div className="col text-center text-block">
              <h4 className="title-2">ABOUT THE KIT</h4>
              <hr />
              <p>
                I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click
                “Edit Text” or double click me to add your own content and make changes to the font.
                Feel free to drag and drop me anywhere you like on your page. I’m a great place for
                you to tell a story and let your users know a little more about you. his is a great
                space to write long text about your company and your services. You can use this
                space to go into a little more detail about your company. Talk about your team and
                what services you provide.
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
            <div className="col-lg-6 col-sm-12 text-center text-block">
              <h4 className="title-2">ABOUT US</h4>
              <div className="slash"></div>
              <p>
                I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click
                “Edit Text” or double click me to add your own content and make changes to the font.
                Feel free to drag and drop me anywhere you like on your page. I’m a great place for
                you to tell a story and let your users know a little more about you. his is a great
                space to write long text about your company and your services.
              </p>
            </div>
            <div className="col-lg-3 col-sm-6 " style={{ height: '456', width: '460' }}>
              <img src="/images/leave.webp" />
            </div>
            <div
              className="col-lg-3 col-sm-6 overflow-hidden"
              style={{ height: '456', width: '442' }}
            >
              <img src="/images/workspace.webp" />
            </div>
          </div>
        </section>

        <footer className="container-fluid">
          <div className="row info justify-content-center">
            <div className="col-4">
              <div className="title">OUR STORE</div>
              <div className="list">
                <ul>
                  <li>Address: 1250 Chartwell Dr</li>
                  <li>Street West Vancouver, BC V7S 2R2</li>
                  <li>Phone: 604-992-9366</li>
                  <li>Email: henryyi2005@gmail.com</li>
                </ul>
              </div>
            </div>
            <div className="col-4">
              <div className="title">OUR STORE</div>
              <div className="list">
                <ul>
                  <li>Address: 1250 Chartwell Dr, West Vancouver, BC V7S 2R2</li>
                  <li>Phone: 604-992-9366</li>
                  <li>Email: henryyi2005@gmail.com</li>
                </ul>
              </div>
            </div>
            <div className="col-4">
              <div className="title">OUR STORE</div>
              <div className="list">
                <ul>
                  <li>Address: 1250 Chartwell Dr, West Vancouver, BC V7S 2R2</li>
                  <li>Phone: 604-992-9366</li>
                  <li>Email: henryyi2005@gmail.com</li>
                </ul>
              </div>
            </div>
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
