export function handleError(res) {
  console.log('Error: ' + res.error.message);
}

export const getTopCoords = (elem) => {
  let box = elem.getBoundingClientRect();
  return box.top + window.scrollY;
}
