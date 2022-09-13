import { BrManageContentButton, BrProps } from '@bloomreach/react-sdk';
import React from 'react';
import HeroCarousel from './HeroCarousel';
import HeroCompound from './HeroCompound';
import { VideoCompound } from '../../compounds';

const BobsHero = ({ component, page }: BrProps): React.ReactElement | null => {
  const { document: documentRef } = component.getModels();
  const document = documentRef && page.getContent(documentRef);

  if (!document) {
    return page.isPreview() ? <div /> : null;
  }

  const { heroCompounds } = document?.getData();

  return (
    <section className={`hero ${page.isPreview() ? 'has-edit-button' : ''}`}>
      <BrManageContentButton content={document} />
      { heroCompounds && heroCompounds.length === 1
        && heroCompounds?.[0]?.imageUrl
        && <HeroCompound compound={heroCompounds[0]} />
      }
      { heroCompounds && heroCompounds.length === 1
        && heroCompounds?.[0]?.videoId
        && <VideoCompound compound={heroCompounds[0]} />
      }
      { heroCompounds && heroCompounds.length > 1
        && <HeroCarousel>
          { heroCompounds.map((compound: any, index: number) => (
            <HeroCompound key={index} compound={compound} />
          ))}
        </HeroCarousel>
      }
    </section>
  );
};

export { BobsHero };
