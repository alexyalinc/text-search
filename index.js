/**
 * Find in text
 * @example
 * // returns 2
 * initFinder({
 * input // html input element
 * className // class name of text for search
 * replaceFunc, // replacement of found text
 * flags: 'img', // regexp flag
 * })
 */
function initFinder(opts) {
  // configure opts
  opts = configOpts(opts);
  // add event to input
  opts.input.addEventListener('input', (e) => eventFind(e, opts));
}

/**
 * Get elements and backup html
 * @param {string} className
 * @returns {Array<any>} [html, elements]
 */
function getHtmlContents(className) {
  elements = Array.from(document.getElementsByClassName(className));
  return [elements.map((el) => el.innerHTML), elements];
}

/**
 * Get elements and backup html
 * @param {string} search
 * @returns {string} `<span class="found">${text}</span>`
 */
function replaceFunc(search) {
  return `<span class="found">${search}</span>`;
}

function configOpts(opts) {
  // required options
  if (opts.input == undefined) {
    throw new Error('Required property "input"');
  }
  if (opts.className == undefined) {
    throw new Error('Required property "className"');
  }
  // default options
  opts = Object.assign(
    {
      replaceFunc,
      flags: 'img',
    },
    opts
  );
  // backup html and pointer to elements dom
  [opts.html, opts.elements] = getHtmlContents(opts.className);
  return opts;
}

function eventFind(e, opts) {
  for (const [i, el] of opts.elements.entries()) {
    const defaultHtml = opts.html[i];
    if (e.target.value.length === 0) {
      el.innerHTML = defaultHtml;
      continue;
    }
    const regExp = new RegExp(e.target.value, opts.flags);
    el.innerHTML = defaultHtml.replace(regExp, opts.replaceFunc);
  }
}

// init script
initFinder({
  input: document.getElementById('findInput'),
  className: 'find-this',
});
