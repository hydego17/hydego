const allowedSrc = ['https://apis.google.com', '*.hydego.id'].join(' ');

const allowedStyleSrc = ['https://fonts.googleapis.com'].join(' ');

const allowedFontSrc = ['https://fonts.gstatic.com'].join(' ');

const allowedImageSrc = [].join(' ');

const allowedMediaSrc = ['*.googlevideo.com', '*.hydego.id'].join(' ');

const allowedFrameSrc = ['*.hydego.id'].join(' ');

/**
 * Genereate Content Security Policy headers
 */
const generateCsp = () => {
  const production = process.env.NODE_ENV === 'production';

  const envPolicy = production ? "'unsafe-inline'" : "'unsafe-eval' 'unsafe-inline'";

  let csp = ``;
  csp += `base-uri 'self';`;
  csp += `form-action 'self';`;
  csp += `default-src 'self';`;
  csp += `connect-src 'self' ${allowedSrc};`;
  csp += `style-src 'self' ${allowedStyleSrc} 'unsafe-inline' data:;`;
  csp += `script-src 'self' ${allowedSrc} ${envPolicy};`;
  csp += `font-src 'self' ${allowedFontSrc} data:;`;
  csp += `img-src 'self' ${allowedImageSrc} data:;`;
  csp += `media-src 'self' ${allowedMediaSrc};`;
  csp += `frame-src 'self' ${allowedFrameSrc};`;

  return csp;
};

export default generateCsp;
