/**
 * @license
 * Copyright (c) TechAurelian {@link https://techaurelian.com}
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { getImageUrl, getImageData } = require('./utils.js');

/**
 * Adds the mimage shortcode to Eleventy.
 * @param {object} eleventyConfig The Eleventy configuration object.
 * @param {object} options The options for the shortcode.
 */
function addMimageShortcode(eleventyConfig, options) {

  /**
   * Returns the content for the mimage shortcode, which is a HTML image tag with attributes
   * computed from the provided arguments.
   * @param {object} args The arguments for the shortcode.
   * @returns {string} The HTML image tag.
   */
  const mimage = function(args) {
    // Compute the class attribute for the image tag
    const cClass = args.class ? `class="${args.class}"` : '';

    // Get the image url by replacing the prefix with the correct images directory path
    if (!args.src) throw new Error('mimage requires a src prop for the image src attribute.');
    const cSrc = getImageUrl(args.src, options.imageMaps);

    // Get the image width and height from props or from the corresponding image map
    const { width: mWidth, height: mHeight } = getImageData(args.src, options.imageMaps);
    const cWidth = args.width ?? mWidth;
    const cHeight = args.height ?? mHeight;

    // Get the image alt and title from args
    const cAlt = args.alt;
    if (!cAlt) throw new Error(`mimage requires an alt prop for the image alt text.\nsrc: ${args.src}`);
    const cTitle = args.title ? `title="${args.title}"` : '';

    return `<img ${cClass} src="${cSrc}" width="${cWidth}" height="${cHeight}" alt="${cAlt}" ${cTitle} />`;
  };

  // Add the shortcode to Eleventy
  eleventyConfig.addShortcode("mimage", mimage);
}

module.exports = {
  addMimageShortcode,
};