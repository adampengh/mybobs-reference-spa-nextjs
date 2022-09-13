import Image from 'next/image';
import React, { useState } from 'react';
import { BrComponent } from '@bloomreach/react-sdk';
import { Navigation } from '../Navigation';

const Header = (): React.ReactElement => {
  const [showDrawer, setShowDrawer] = useState(false);

  const [, updateState] = useState({});
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const handleShow = () => {
    setShowDrawer(true);
    forceUpdate();
  };

  const handleHide = () => {
    setShowDrawer(false);
    forceUpdate();
  };

  return (
    <header className='header'>
      <section className='header__top'>
        <div className='header__top-inner'>
          <div className='header__top-left'>Need help? Call the <a href="#">Bob&apos;s Squad</a></div>
          <div className='header__top-right'>
            <ul>
              <li>
                <a href="#">Find A Store</a>
              </li>
              <li>
                <a href="#">Orders</a>
              </li>
              <li>
                <a href="#">In-Store Quotes</a>
              </li>
              <li>
                <a href="#">Financing</a>
              </li>
              <li>
                <a href="#">Help</a>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className='header__primary'>
        <div className='header__primary-inner'>
          <div className='header__primary-logo'>
            <a href='/'>
              <Image
                src='/_ui/desktop/common/bobs/images/logo.svg'
                alt='logo'
                width={207}
                height={25}
              />
            </a>
          </div>
          <div className='header__primary-search'>
            {/* <BrComponent path="search" /> */}
            <input type='search' placeholder='What can we help you find?'/>
          </div>
          <div className='header__primary-store'>
            Stores
          </div>
          <div className='header__primary-icons'>
            <button onClick={() => handleShow()}>
              <img src='/_ui/desktop/common/bobs/images/icons/user.jpg' alt='user' />
            </button>
            <button>
              <img src='/_ui/desktop/common/bobs/images/icons/wishlist.jpg' alt='wishlist' />
            </button>
            <button>
              <img src='/_ui/desktop/common/bobs/images/icons/cart.jpg' alt='cart' />
            </button>
          </div>
        </div>
      </section>
      <section className='header__nav'>
        <div className='header__nav-inner'>
          <BrComponent path="menu">
            <Navigation />
          </BrComponent>
        </div>
      </section>
      <BrComponent path="account-drawer">
        <section
          className='drawer'
          data-show-drawer={showDrawer}
        >
          <div
            className='drawer__inner'
            data-show-drawer={showDrawer}
          >
            <button className='drawer__close' onClick={() => handleHide()}>&times;</button>
            <BrComponent />
          </div>
          <div
            className='drawer__overlay'
            data-show-drawer={showDrawer}
            onClick={() => handleHide()} />
        </section>
      </BrComponent>
    </header>
  );
};

export default Header;
