export function handleError(err) {
  console.log(err);
}

export const getTopCoords = (elem) => {
  let box = elem.getBoundingClientRect();
  return box.top + window.scrollY;
}
