import { BrProps } from '@bloomreach/react-sdk';
import React from 'react';
import { Icon } from '../Icon';

const BobsMattressFeatures = ({ component, page }: BrProps): React.ReactElement | null => {
  const { document: documentRef } = component.getModels();
  const document = documentRef && page.getContent(documentRef);

  if (!document) {
    return page.isPreview() ? <div>Please select a document</div> : null;
  }

  const {
    backgroundColor,
    textColor,
    features,
  } = document.getData();

  return (
    <section className='mattress-features' style={{ backgroundColor, color: textColor }}>
      <div className='mattress-features__inner'>
        { features.map((feature: any, index: number) => {
          console.log('feature', feature);
          return (
            <div key={index} className='feature'>
              <div className='feature__icon'>
                <Icon />
              </div>
              <p>{ feature.description }</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export { BobsMattressFeatures };
