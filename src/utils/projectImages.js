import variants from '../data/imageVariants';

export function getImageProps(source, { detail = false } = {}) {
  const image = variants[source];
  if (!image) return { src: source, decoding: 'async' };
  return {
    src: detail ? image.large : image.medium,
    srcSet: image.srcSet,
    sizes: detail ? '(max-width: 940px) calc(100vw - 40px), 900px' : '(max-width: 760px) calc(100vw - 40px), (max-width: 1240px) calc((100vw - 128px) / 3), 370px',
    width: image.width, height: image.height, decoding: 'async',
  };
}

export function getSocialImage(source) {
  return variants[source]?.social;
}
