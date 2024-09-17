/**
 * @license
 * Copyright (c) TechAurelian {@link https://techaurelian.com}
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Returns the prefix for the provided image path.
 * 
 * @param {string} src The image path with a prefix.
 * @returns {string} The image prefix.
 */
function getImagePrefix(src) {
  return src.split('://')[0];
}

/**
 * Returns the image data for the provided image from the appropriate image map.
 *
 * Currently the image width and height are returned.
 *
 * @param {string} src The image path with a prefix.
 * @param {object} imageMaps The image maps.
 * @returns {object} The image data.
 */
export function getImageData(src, imageMaps) {

  // Get the correct image map based on the prefix
  const prefix = getImagePrefix(src);
  const map = imageMaps[prefix].map;

  // Remove the prefix from the src to get the key for the image map
  const cSrc = src.replace(`${prefix}://`, '');

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
 * Returns the image URL by replacing the prefix with the appropriate images directory urls.
 *
 * @param {string} src The image path with a prefix.
 * @param {object} imageMaps The image maps.
 * @returns {string} The absolute image URL.
 */
export function getImageUrl(src, imageMaps) {
  const prefix = getImagePrefix(src);
  return src.replace(`${prefix}://`, imageMaps[prefix].url);
}
