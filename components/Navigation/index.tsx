import React, { useEffect, useState } from 'react';
import { MenuItem, Menu as BrMenu, Reference, isMenu, TYPE_LINK_EXTERNAL } from '@bloomreach/spa-sdk';
import { BrComponent, BrComponentContext, BrManageMenuButton, BrPageContext, BrProps } from '@bloomreach/react-sdk';
// import { ReactComponent as MenuIcon } from '../../assets/icons/menu.svg';
// import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';
// import { ReactComponent as ArrowDownIcon } from '../../assets/icons/arrow-down.svg';

interface MenuModels {
  menu: Reference;
}

interface MenuLinkProps {
  item: MenuItem;
  topLevel?: boolean;
}

const getMegaMenuImagesArray = (page: any): any => {
  if (!page) {
    return [];
  }

  const header = page?.getComponent('header');
  const children = header?.getChildren();
  const megaMenuImagesComponent = children?.filter((child: any) => child.getName() === 'mega-menu-images');
  const megaMenuImagesRef = megaMenuImagesComponent.length > 0
    ? megaMenuImagesComponent?.[0]?.getModels().pagination
    : undefined;
  const document = megaMenuImagesRef && page?.getContent(megaMenuImagesRef);
  const ref = document && document?.getItems()?.[0];
  const item = ref && page?.getContent(ref);

  const {
    megaMenuImageGroup,
  } = item?.getData() || [];

  return megaMenuImageGroup;
};

const Navigation = (): React.ReactElement | null => {
  const [menuOpen, setMenuOpen] = useState(false);
  const component = React.useContext(BrComponentContext);
  const page = React.useContext(BrPageContext);

  // Get Mega Menu Images
  const megaMenuImages = getMegaMenuImagesArray(page);

  useEffect(() => {
    document.body.setAttribute('data-menu-open', String(menuOpen));
  });

  // const setMenuStatus = (status: any): void => {
  //   document.body.setAttribute('data-menu-open', String(status));
  //   setMenuOpen(status);
  // };

  if (!component || !page) {
    return null;
  }

  const { menu: menuRef } = component.getModels<MenuModels>();
  const menu = menuRef && page.getContent<BrMenu>(menuRef);

  if (!isMenu(menu)) {
    return null;
  }

  return (
    <nav className={`${page!.isPreview() ? 'has-edit-button' : ''}`} role="navigation" data-menu-open={menuOpen}>
      <BrManageMenuButton menu={menu} />
      <div className='header__menu-toggle'>
        {/* <button onClick={() => setMenuStatus(!menuOpen)}>
          { menuOpen ? <CloseIcon /> : <MenuIcon /> }
        </button> */}
      </div>

      <ul
        className='navigation'
        data-menu-open={menuOpen}>
        { menu.getItems().map((item, index) => {
          const images = megaMenuImages && megaMenuImages?.filter((image: any) => image.menuName === item.getName())[0];
          return (
            <MegaMenu
              key={index}
              item={item}
              category={item.getName()}
              images={images}
            />
          );
        })}
      </ul>
    </nav>
  );
};

const MegaMenu = ({ item, images }: any): any => {
  const [showSecondLevel, setShowSecondLevel] = useState(false);
  return (
    <li
      className={`navigation__item ${item.isSelected() ? 'active' : ''}`}
      onClick={() => setShowSecondLevel(!showSecondLevel)}
      data-show-second-level={showSecondLevel}
    >
      <div className="navigation__link">
        <NavigationLink item={item} topLevel={true} />
        {/* { item.getChildren().length > 0 && <ArrowDownIcon /> } */}
      </div>
      { item.getChildren().length !== 0
        && <div className='mega-menu' data-show-menu={showSecondLevel}>
          <button className='back-button' onClick={() => setShowSecondLevel(false)}>
            {/* <ArrowDownIcon /> */}
            <span>Back</span>
          </button>
          <ul className='columns'>
            { item.getChildren().map((child: MenuItem, index: number) => (
              <li className='column' key={index}>
                <Column item={child} />
              </li>
            )) }
            { images
              && <li className='banners'>
                <MegaMenuImages images={images} />
              </li>
            }
          </ul>
        </div>
      }
    </li>
  );
};

const Column = ({ item }: MenuLinkProps): any => {
  return (
    <>
      { item.getChildren().map((child: MenuItem, index: number) => (
        <SecondLevelMenu item={child} key={index} />
      ))}
    </>
  );
};

const SecondLevelMenu = ({ item }: MenuLinkProps): any => {
  const [accordionOpen, setAccordionOpen] = React.useState(false);

  const setAccordionStatus = (e: any): void => {
    e.stopPropagation();
    setAccordionOpen(!accordionOpen);
  };

  const ColumnHeading = (): any => {
    if (item.getLink()) {
      return (
        <h2 data-accordion-open={accordionOpen}>
          {item && <a href={item?.getUrl()?.toString() || ''}>{item.getName()}</a> }
        </h2>
      );
    }

    return <h2 data-accordion-open={accordionOpen}>{ item.getName() }</h2>;
  };

  return (
    <div className="second-level">
      <div
        className='second-level__heading'
        data-accordion-open={accordionOpen}
        onClick={(e) => setAccordionStatus(e)}
      >
        <ColumnHeading />
        { item.getChildren().length > 0
          && <span className="second-level__icon">
            {/* <ArrowDownIcon /> */}
          </span>
        }
      </div>

      <ul className='second-level__list' data-accordion-open={accordionOpen}>
        { item.getChildren().map((child: any, index: number) => (
          <li className='second-level__item' key={index}>
            <NavigationLink item={child} topLevel={false} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const NavigationLink = ({ item, topLevel }: MenuLinkProps): React.ReactElement => {
  const url = item.getUrl();
  const classString = `navigation-link ${topLevel && item.getName().toLowerCase() === 'outlet' ? 'text-red' : ''}`;

  if (!url) {
    return <a href={'/'} className={classString}>{item.getName()}</a>;
  }

  if (item.getLink()?.type === TYPE_LINK_EXTERNAL) {
    return <a href={url} className={classString}>{item.getName()}</a>;
  }

  return <a href={url} className={classString}>{item.getName()}</a>;
};

const MegaMenuImages = ({ images }: any): React.ReactElement => {
  const page = React.useContext(BrPageContext);

  const {
    imageCards,
    layout: layoutDropdown,
  } = images;
  const layout = layoutDropdown?.selectionValues?.[0]?.key;

  return (
    <div className='mega-menu-images'>
      <div className={`mega-menu-images__layout ${layout}`}>
        { imageCards && imageCards.map((imageRef: any, index: number) => {
          const document = page?.getContent(imageRef);
          const {
            buttons,
            content,
            image,
          } = document?.getData<any>();

          const {
            altText,
            ctaLink,
            desktopImageUrl,
            mobileImageUrl,
            overlayText,
          } = image;

          return (
            <div className='mega-menu-images__content' key={index}>
              <div className='mega-menu-images__img'>
                <img src={desktopImageUrl} alt={altText} />
              </div>
              { content && page && <div className='mega-menu-images__text'
                  dangerouslySetInnerHTML={{ __html: page?.rewriteLinks(page?.sanitize(content?.value)) }} />
              }
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { Navigation };
