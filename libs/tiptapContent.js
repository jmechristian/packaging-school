/**
 * Optimizes Tiptap HTML content for performance:
 * - Adds width/height to unsized images (prevents CLS)
 * - Adds loading/fetchpriority for LCP and lazy loading
 * - Adds alt attribute if missing (accessibility)
 * - Adds decoding="async" for non-blocking decode
 */
export function optimizeTiptapImages(content, options = {}) {
  if (!content || typeof content !== 'string') return '';
  const { prioritizeFirstImage = true } = options;

  let firstImg = prioritizeFirstImage;

  return content.replace(/<img([^>]*)>/gi, (match, attrs) => {
    let extra = '';
    if (!/\bwidth\s*=/.test(attrs)) extra += ' width="800"';
    if (!/\bheight\s*=/.test(attrs)) extra += ' height="450"';
    if (!/\balt\s*=/.test(attrs)) extra += ' alt=""';
    if (firstImg) {
      firstImg = false;
      extra += ' fetchpriority="high" loading="eager" decoding="async"';
    } else {
      extra += ' loading="lazy" decoding="async"';
    }
    return '<img' + (attrs.trim() ? ' ' + attrs : '') + extra + '>';
  });
}
