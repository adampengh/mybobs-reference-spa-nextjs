import { BrManageContentButton, BrProps } from '@bloomreach/react-sdk';
import { BrRichTextContent } from 'components/BrRichTextContent';
import React from 'react';

export function BobsGuestOmniChannelBar({ component, page }: BrProps): React.ReactElement | null {
  if (!component || !page) { return null; }

  const { document: documentRef } = component.getModels();
  const document = documentRef && page.getContent(documentRef);

  if (!document) {
    return page.isPreview() ? <div /> : null;
  }

  const {
    enabled,
    messages,
  } = document.getData();

  console.log('document', document.getData());

  return (
    <section className="omni-channel-bar">
      <BrManageContentButton content={document} />
      { enabled && messages.map((message: any, index: number) => {
        return (
          <div
            key={index}
            style={{
              backgroundColor: message.backgroundColor,
              color: message.textColor,
            }}
          >
            <BrRichTextContent
              tagName="div"
              page={page}
              content={{ html: message?.message?.value }}
              className="omni-channel-bar__content"
            />
          </div>
        );
      })}
    </section>
  );
}
