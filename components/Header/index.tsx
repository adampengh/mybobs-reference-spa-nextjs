import Image from 'next/image';
import React from 'react';
import { BrComponent } from '@bloomreach/react-sdk';
import { Navigation } from '../Navigation';

const Header = (): React.ReactElement => {
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
            <Image
              src='/_ui/desktop/common/bobs/images/logo.svg'
              alt='logo'
              width={207}
              height={25}
            />
          </div>
          <div className='header__primary-search'>
            <BrComponent path="search" />
            {/* <input type='search' placeholder='What can we help you find?'/> */}
          </div>
          <div className='header__primary-store'>
            Stores
          </div>
          <div className='header__primary-icons'>Icons</div>
        </div>
      </section>
      <section className='header__nav'>
        <div className='header__nav-inner'>
          <BrComponent path="menu">
            <Navigation />
          </BrComponent>
        </div>
      </section>
    </header>
  );
};

export default Header;
