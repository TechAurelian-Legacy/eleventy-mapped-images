/**
 * @license
 * Copyright (c) TechAurelian {@link https://techaurelian.com}
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getImageUrl, getImageData } from './utils.js';

/**
 * Constructs an attribute string with the provided key and value (e.g. class="my-class")
 * @param {string} key The attribute key.
 * @param {string} value The attribute value.
 * @returns {string} The attribute string or an empty string if the value is undefined.
 */
function getAttr(key, value) {
  return value ? `${key}="${value}"` : '';
}

/**
 * Adds the mimage shortcode to Eleventy.
 * @param {object} eleventyConfig The Eleventy configuration object.
 * @param {object} options The options for the shortcode.
 */
export function addMimageShortcode(eleventyConfig, options) {

  /**
   * Returns the content for the mimage shortcode, which is a HTML image tag with attributes
   * computed from the provided arguments.
   * @param {object} args The arguments for the shortcode.
   * @returns {string} The HTML image tag.
   */
  const mimage = function(args) {
    // Get the image url by replacing the prefix with the correct images directory path
    if (!args.src) throw new Error('mimage requires a src prop for the image src attribute.');
    const cSrc = getImageUrl(args.src, options.imageMaps);

    // Get the image width and height from props or from the corresponding image map
    const { width: mWidth, height: mHeight } = getImageData(args.src, options.imageMaps);
    const cWidth = args.width ?? mWidth;
    const cHeight = args.height ?? mHeight;

    // The alt text is required
    if (args.alt == null || args.alt == undefined) { 
      throw new Error(`mimage requires an alt prop for the image alt text.\nsrc: ${args.src}`);
    }

    return `<img ${getAttr('class', args.class)} ${getAttr('src', cSrc)} ${getAttr('width', cWidth)} ${getAttr('height', cHeight)} alt="${args.alt}" ${getAttr('title', args.title)} />`;
  };

  // Add the shortcode to Eleventy
  eleventyConfig.addShortcode("mimage", mimage);
}
