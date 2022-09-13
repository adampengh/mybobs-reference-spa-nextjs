import { BrPageContext } from '@bloomreach/react-sdk';
import React, { ReactElement, useContext } from 'react';
import { Container } from '../../uikit';

const VisualNavigation = ({ categories }: any) => {
  console.log('categories: ', categories);
  return (
    <section className='visual-navigation'>
      <div className='visual-navigation__inner'>
        { categories?.map((categoryRef: any, index: number) => {
          return (
            <CategoryCard key={index} categoryRef={categoryRef} />
          );
        })}
      </div>
    </section>
  );
};

const CategoryCard = ({ categoryRef }: any): ReactElement | null => {
  const page = useContext(BrPageContext);
  const document = categoryRef && page?.getContent(categoryRef);
  console.log('document', document);

  if (!document) {
    return null;
  }

  const {
    buttons,
    content,
    image,
  } = document?.getData();

  const {
    altText,
    desktopImageUrl,
    ctaLink,
  } = image;

  return (
    <div className='visual-navigation__card'>
      <div className='visual-navigation__img'>
        <img src={desktopImageUrl} alt={altText} />
      </div>
      { content && page
        && <div className='visual-navigation__text'
          dangerouslySetInnerHTML={{ __html: page.rewriteLinks(page.sanitize(content.value)) }} /> }
    </div>
  );
};

export default VisualNavigation;
