import { BrProps } from '@bloomreach/react-sdk';
import React from 'react';

const BobsAccountDrawer = ({ component, page }: BrProps): React.ReactElement | null => {
  const { document: documentRef } = component.getModels();
  const document = documentRef && page.getContent(documentRef);

  if (!document) {
    return page.isPreview() ? <div /> : null;
  }

  const {
    description,
    links,
    signInButtonText,
    signOutButtonText,
    signUpButtonText,
    title,
    titleIcon,
  } = document.getData();

  return (
    <section className='account-drawer'>
      <div className='account-drawer__top'>
        <h3>{ title }</h3>
        <p>{ description }</p>
      </div>
      <div className='account-drawer__links'>
        {links.map((link: any, index: number) => {
          return (
            <div key={index} className='account-drawer__link'>
              <div className='account-drawer__link-img'>
                <img src='https://via.placeholder.com/32x32.jpg' alt='placeholder' />
              </div>
              <div className='account-drawer__link-text'>
                <p>{ link.linkTitle }</p>
                <p className='description'>{ link.linkDescription }</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export { BobsAccountDrawer };
