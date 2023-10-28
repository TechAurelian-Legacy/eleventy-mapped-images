/**
 * @license
 * Copyright (c) TechAurelian {@link https://techaurelian.com}
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const LOCAL_PREFIX = 'local://';
const EXTERNAL_PREFIX = 'external://';

/**
 * Determines whether the provided image is a local image or an external image, based on the prefix.
 *
 * @param {string} src The image path with a local:// or external:// prefix.
 * @returns {boolean} Whether the image is a local image or an external image.
 */
function isLocalImage(src) {
  let isLocal = false;
  if (src.startsWith(LOCAL_PREFIX)) {
    isLocal = true;
  } else if (src.startsWith(EXTERNAL_PREFIX)) {
    isLocal = false;
  } else {
    throw new Error(
      `mimage requires a src prop that starts with either ${LOCAL_PREFIX} or ${EXTERNAL_PREFIX}.\nsrc: ${src}`
    );
  }

  return isLocal;
}

/**
 * Returns the image data for the provided image from the appropriate image map.
 *
 * Currently the image width and height are returned.
 *
 * @param {string} src The image path with a local:// or external:// prefix.
 * @param {Map<string, object>} localImageMap The local image map.
 * @param {Map<string, object>} externalImageMap The external image map.
 * @returns {object} The image data.
 */
function getImageData(src, localImageMap, externalImageMap) {
  const isLocal = isLocalImage(src);

  // Remove the prefix from the src to get the key for the image map
  let cSrc = src.replace(isLocal ? LOCAL_PREFIX : EXTERNAL_PREFIX, '');

  // Get the correct image map based on the image type
  const map = isLocal ? localImageMap : externalImageMap;

  // Get the image data from the map
  let width, height;
  try {
    ({ width, height } = map[cSrc]);
  } catch (e) {
    throw new Error(`Unable to find valid map data for image:\n${src}`);
  }

  return { width, height };
}

/**
 * Returns the image URL by replacing the local:// or external:// prefix with the appropriate images directory urls.
 *
 * @param {string} src The image path with a local:// or external:// prefix.
 * @param {string} localImagesUrl The local images directory url.
 * @param {string} externalImagesUrl The external images directory url.
 * @returns {string} The absolute image URL.
 */
function getImageUrl(src, localImagesUrl, externalImagesUrl) {
  const isLocal = isLocalImage(src);

  return src.replace(
    isLocal ? LOCAL_PREFIX : EXTERNAL_PREFIX,
    isLocal ? localImagesUrl : externalImagesUrl
  );
}

module.exports = {
  getImageData,
  getImageUrl,
};