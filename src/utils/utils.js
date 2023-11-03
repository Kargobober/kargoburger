export function handleError(text, error = '') {
  console.log(text + error);
}

export const getTopCoords = (elem) => {
  let box = elem.getBoundingClientRect();
  return box.top + window.scrollY;
}
