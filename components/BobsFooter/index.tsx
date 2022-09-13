import React from 'react';

import styles from './BobsFooter.module.scss';

const BobsFooter = (): React.ReactElement => {
  return (
    <footer className="bobs-footer bsf-js__bobs-footer wrapper">
      {/* <div className="bobs-footer__container">
        <div className="yCmsContentSlot">
          <div className="content">
            <div className="bobs-footer__container_section bobs-footer__container_section_divider bobs-screen">
              <div className="bobs-footer__container_section_list" role="contentinfo">
                <div className="bobs-footer__container_section_list-items">
                  <h5>Customer Support</h5>
                  <ul role="group">
                    <li><a href="/bobs-faq">FAQs</a></li>
                    <li><a href="/contact-us">Contact Us</a></li>
                    <li><a href="#" id="footer-feedback-link">Provide Feedback</a></li>
                    <li><a href="/delivery-information">Delivery Information</a></li>
                    <li><a href="/returns-and-exchanges">Returns &amp; Exchanges</a></li>
                    <li><a href="/financing-options">Financing Options</a></li>
                    <li><a href="/gift-card">Gift Cards</a></li>
                    <li><a href="/goof-proof">Bob's Goof Proof Plan</a></li>
                    <li><a href="/anchor-it">Child Safety</a></li>
                    <li><a href="/privacy-policy">Privacy Policy</a></li>
                    <li><a href="/privacyrequest">Do Not Sell My Information</a></li>
                    <li><a href="/terms-of-use">Terms of Use</a></li>
                    <li><a href="/sitemap">Sitemap</a></li>
                  </ul>
                </div>
              </div>
              <div className="bobs-footer__container_section_list" role="contentinfo">
                <div className="bobs-footer__container_section_list-items">
                  <h5>About Bob's</h5>
                  <ul role="group">
                    <li><a href="/about">About</a></li>
                    <li><a href="/stores">Store Locations</a></li>
                    <li><a href="/bobs-discount-furniture-reviews">Bob's Discount Furniture Reviews</a></li>
                    <li><a href="/careers">Careers</a></li>
                    <li><a href="/bobs-for-business">Bob's For Business</a></li>
                    <li><a href="/social-responsibility">Social Responsibility</a></li>
                    <li><a href="/radio">Bob's Sports Radio</a></li>
                    <li><a href="/heart-of-bobs">Heart of Bob's</a></li>
                    <li><a href="/newsroom">Newsroom</a></li>
                  </ul>
                </div>
              </div>
              <div className="bobs-footer__container_section_list" role="contentinfo">
                <div className="bobs-footer__container_section_list-items">
                  <h5>Community Giving</h5>
                  <ul role="group">
                    <li><a href="http://www.bobscares.org/">Bob's Charitable Foundation</a></li>
                    <li><a href="/bobs-outreach">Bob's Outreach </a></li>
                    <li><a href="https://blog.mybobs.com/category/community-outreach/" target="_blank">Community Giving</a>
                    </li>
                  </ul>
                  <h5>Inspiration</h5>
                  <ul role="group">
                    <li><a href="/shop-the-look">Shop the Look</a></li>
                    <li><a href="https://blog.mybobs.com/" target="_blank">Blog</a></li>
                    <li><a href="/room-designer">3D Room Designer</a></li>
                    <li><a href="/app"><img
                          className="bobs-header__secondary-nav__right-container_items_ar-container_wrapper_icon ls-is-cached"
                          src="/_ui/desktop/common/bobs/images/icons/ar-icon-desktop.svg"
                          alt="AR icon" width="22" height="23" /> View In Your Room</a></li>
                  </ul>
                </div>
              </div>
              <div className="bobs-footer__container_section_list" role="contentinfo">
                <div className="bobs-footer__container_section_list-items">
                  <h5>Follow Us</h5>
                  <div className="bobs-footer__container_section_list-items_social" role="group">
                    <a href="https://www.facebook.com/mybobs" title="Facebook social media" target="_blank">
                      <img className="bobs-footer__container_icon bobs-footer__facebook"
                        src="/_ui/desktop/common/bobs/images/icons/Facebook.svg" alt="Facebook"
                        width="23" height="23" />
                    </a>
                    <a href="https://www.pinterest.com/mybobs/" title="Pinterest social media" target="_blank">
                      <img
                        className="bobs-footer__container_icon bobs-footer__pinterest"
                        src="/_ui/desktop/common/bobs/images/icons/Pinterest.svg"
                        alt="Pinterest" width="24" height="24"/>
                    </a>
                    <a href="https://twitter.com/mybobs" title="Twitter social media" target="_blank">
                      <img
                        className="bobs-footer__container_icon bobs-footer__twitter"
                        src="/_ui/desktop/common/bobs/images/icons/Twitter.svg" alt="Twitter"
                        width="27" height="23"/>
                    </a>
                    <a href="https://www.instagram.com/mybobs/" title="Instagram social media" target="_blank">
                      <img
                        className="bobs-footer__container_icon bobs-footer__instagram"
                        src="/_ui/desktop/common/bobs/images/icons/Instagram.svg"
                        alt="Instagram" width="22" height="22" />
                    </a>
                    <a href="https://www.youtube.com/user/mybobsvideo" title="YouTube social media" target="_blank">
                      <img
                        className="bobs-footer__container_icon bobs-footer__youtube"
                        src="/_ui/desktop/common/bobs/images/icons/Youtube.svg" alt="YouTube"
                        width="24" height="16" />
                    </a>
                    <a href="https://www.linkedin.com/company/bob%27s-discount-furniture/" title="LinkedIn social media" target="_blank"> <img
                        className="bobs-footer__container_icon bobs-footer__linked-in"
                        src="/_ui/desktop/common/bobs/images/icons/LinkedIn.svg" alt="LinkedIn"
                        width="23" height="23" />
                    </a>
                  </div>
                  <div className={`${styles.ty}`}> <a href="/whybobs"> <img
                        src="https://contentimages.mybobs.com/bobs-content-assets/content-pages/00LandinGPageS/2021/LandingPages/why-bobs/30th-Logo-v2.svg"
                        alt="Why Bob's" srcSet="" width="156" height="109" /> </a> </div>
                </div>
              </div>
            </div>
            <div className="bobs-footer__container_section bobs-footer__container_section_divider" role="contentinfo">
              <div className="bobs-footer__container_section_bobs">
                <div className="bobs-footer__container_section_bobs_helpline">
                  <h5>Need help now?</h5>
                  <div className="bobs-footer__container_section_bobs_helpline_number">
                    <div id="sales-callc"
                      style={{ margin: '0px auto', padding: '0.5rem 0', width: '100%', fontSize: '1.6rem', fontFamily: 'arsMaquetteProregular, Helvetica, Arial, sans-serif' }}>
                      Sales or Product Questions:<br />
                      <a className="bobs-footer__container_section_bobs_helpline_number-value" type="button">Chat with Us</a><br /><a
                        href="tel:+1-860-812-1111"
                        className="bobs-footer__container_section_bobs_helpline_number-value">1-860-812-1111</a><br /><a
                        href="/stores" className="bobs-footer__container_section_bobs_helpline_number-value"
                        target="_blank">Schedule a Store Appointment</a>
                    </div>
                    <span id="footerCallHeader">Customer Support</span><br />
                    <a href="/contact-us" className="bobs-footer__container_section_bobs_helpline_number-value">Contact Us</a>
                  </div>
                </div>
                <div className="bobs-footer__container_section_bobs_logo"><img
                    className="bobs-footer__container_section_bobs_logo_image" alt="Bobs footer logo"
                    src="/_ui/desktop/common/bobs/images/logo.svg" width="207" height="25" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </footer>
  )
}

export default BobsFooter;
