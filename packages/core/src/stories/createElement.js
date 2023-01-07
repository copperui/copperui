export const createElement = (name, attributes) => {
  const el = document.createElement(name);

  for (const [key, value] of Object.entries(attributes)) {
    el.setAttribute(key, value);
  }

  return el.outerHTML;
};
