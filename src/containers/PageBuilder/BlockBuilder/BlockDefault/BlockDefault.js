import React from 'react';
import { func, node, object, shape, string } from 'prop-types';
import classNames from 'classnames';

import Field, { hasDataInFields } from '../../Field';
import BlockContainer from '../BlockContainer';

import css from './BlockDefault.module.css';
import { H4 } from '../../Primitives/Heading';

const FieldMedia = props => {
  const { className, media, sizes, options } = props;
  const hasMediaField = hasDataInFields([media], options);
  return hasMediaField ? (
    <div className={classNames(className, css.media)}>
      <Field data={media} sizes={sizes} options={options} />
    </div>
  ) : null;
};

const BlockDefault = props => {
  let {
    blockId,
    className,
    rootClassName,
    mediaClassName,
    textClassName,
    ctaButtonClass,
    title,
    text,
    callToAction,
    media,
    responsiveImageSizes,
    options,
  } = props;
  const classes = classNames(rootClassName || css.root, className);
  const hasTextComponentFields = hasDataInFields([title, text, callToAction], options);
  if(blockId==="freelancer-1" || blockId==="freelancer-2" || blockId==="freelancer-3" || blockId==="press-1" || blockId==="press-2" || blockId==="press-3" || blockId==="project-desc"){
    ctaButtonClass = css.noStyle;
  }

  const subHeading = blockId==="hero-block"?<h4 className={css.header}>Your Go To Destination for</h4>:"";
  
  return (
   
    <BlockContainer id={blockId} className={classes}>
      <FieldMedia
        media={media}
        sizes={responsiveImageSizes}
        className={mediaClassName}
        options={options}
      />
      {hasTextComponentFields ? (
        <div className={classNames(textClassName, css.text)}>
          
          <Field className={css.heroHeader} data={title} options={options} />
          <Field data={text} options={options} />
          <Field data={callToAction} className={classNames(ctaButtonClass,css.bookACall) } options={options} />
        </div>
      ) : null}
    </BlockContainer>
  );
};

const propTypeOption = shape({
  fieldComponents: shape({ component: node, pickValidProps: func }),
});

BlockDefault.defaultProps = {
  className: null,
  rootClassName: null,
  mediaClassName: null,
  textClassName: null,
  ctaButtonClass: null,
  title: null,
  text: null,
  callToAction: null,
  media: null,
  responsiveImageSizes: null,
  options: null,
};

BlockDefault.propTypes = {
  blockId: string.isRequired,
  className: string,
  rootClassName: string,
  mediaClassName: string,
  textClassName: string,
  ctaButtonClass: string,
  title: object,
  text: object,
  callToAction: object,
  media: object,
  responsiveImageSizes: string,
  options: propTypeOption,
};

export default BlockDefault;
