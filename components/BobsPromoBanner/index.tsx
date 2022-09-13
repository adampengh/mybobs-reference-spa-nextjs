import { BrManageContentButton, BrProps } from '@bloomreach/react-sdk';
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const BobsPromoBanner = ({ component, page }: BrProps): React.ReactElement | null => {
  const { document: documentRef } = component.getModels();
  const document = documentRef && page.getContent(documentRef);

  if (!document) {
    return page.isPreview() ? <div /> : null;
  }

  const {
    backgroundColor,
    content,
    textColor,
  } = document.getData();

  const data = document.getData();
  return (
    <Container className={`${page.isPreview() ? 'has-edit-button' : ''}`}>
      <BrManageContentButton content={document} />
      <Row>
        <Col style={{ backgroundColor, color: textColor }}>
          <div dangerouslySetInnerHTML={{ __html: page.rewriteLinks(content.value) }} />
        </Col>
      </Row>
    </Container>
  );
};

export { BobsPromoBanner };
