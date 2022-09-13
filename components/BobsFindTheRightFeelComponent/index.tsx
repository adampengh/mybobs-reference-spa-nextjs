import { BrProps } from '@bloomreach/react-sdk';
import React, { useState } from 'react';

const BobsFindTheRightFeelComponent = ({ component, page }: BrProps): React.ReactElement | null => {
  const [activeTab, setActiveTab] = useState(4);
  const { document: documentRef } = component.getModels();
  const document = documentRef && page.getContent(documentRef);

  if (!document) {
    return page.isPreview() ? <div /> : null;
  }

  const {
    description,
    scaleTitle,
    sections,
    title,
  } = document.getData();

  return (
    <section className='find-the-right-feel'>
      <div className='find-the-right-feel__inner'>
        <div className='find-the-right-feel__top'>
          { title && <h2>{ title }</h2>}
          { description && <p>{ description }</p> }
        </div>
        <div className="find-the-right-feel__bottom">
          <div className="tabs">
            { sections.map((section: any, index: number) => (
              <button
                key={index}
                className={`tab ${activeTab === index ? 'tab-active' : ''}`}
                onClick={() => setActiveTab(index)}
              >
                <img src={section.firmIcon} alt='icon' />
                <p>{ section.firmName }</p>
              </button>
            ))}
          </div>
          <div className="tabs-content">
            { sections.map((section: any, index: number) => {
              return (
                <div
                  key={index}
                  className={`tabs-panel ${activeTab === index ? 'tabs-panel-active' : ''}`}
                >
                  <h4>{ scaleTitle }</h4>
                  <div className='scale'>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, i) => {
                      const scaleValues = section?.firmScaleValue?.split(',');
                      return (
                        <>
                          <p
                            className={`scale-item ${scaleValues.includes(item.toString()) ? 'active' : ''}`}
                          >{ item }</p>
                          { item !== 10 && <span className='scale-separator' /> }
                        </>
                      );
                    })}
                  </div>
                  <div className='section-content'>
                    <div className='section-content__left'>
                      <div dangerouslySetInnerHTML={{ __html: page.rewriteLinks(section?.firmDescription.value) }} />
                      <a className='btn btn-dark' href={section.shopButtonUrl}>{ section.shopButtonText }</a>
                    </div>
                    <img src={section.firmImageUrl} alt='Firm Image' />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export { BobsFindTheRightFeelComponent };
