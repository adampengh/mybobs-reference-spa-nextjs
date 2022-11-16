import { BrProps } from '@bloomreach/react-sdk';
import React from 'react';

const BobsBlog = ({ component, page }: BrProps): React.ReactElement | null => {
  const { document: documentRef } = component.getModels();
  const document = documentRef && page.getContent(documentRef);

  if (!document) {
    return page.isPreview() ? <div /> : null;
  }

  console.log('document', document.getData());
  const {
    sectionLinkText,
    sectionLinkUrl,
    sectionTitle,
    sections,
  } = document.getData();

  return (
    <section className='bobs-blog'>
      <div className='bobs-blog__heading'>
        { sectionTitle && <h3>{ sectionTitle }</h3>}
        <p>
          <a href={sectionLinkUrl}>{sectionLinkText}</a>
        </p>
      </div>

      <div className='bobs-blog__sections'>
        {sections.map((section: any, index: number) => {
          return (
            <div key={index} className='bobs-blog__section'>
              <div className='bobs-blog__section-img'>
                <img src={section.imageUrl} alt={section.topic} />
              </div>
              <div className='bobs-blog__section-text'>
                <p>{section.topic}</p>
                {/* <p>{section.description}</p> */}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export { BobsBlog };
