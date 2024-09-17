/**
 * @license
 * Copyright (c) TechAurelian {@link https://techaurelian.com}
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getImageUrl } from './utils.js';

/**
 * Adds the mimageUrl filter to Eleventy.
 * @param {object} eleventyConfig The Eleventy configuration object.
 * @param {object} options The options for the shortcode.
 */
export function addMimageUrlFilter(eleventyConfig, options) {
  /**
   * Returns the image URL with the correct path for the provided image source.
   * @param {string} src The image source.
   * @returns {string} The image URL.
   */
  const mimageUrl = function(src) {
    return getImageUrl(src, options.imageMaps);
  };

  // Add the filter to Eleventy
  eleventyConfig.addFilter("mimageUrl", mimageUrl);
}
