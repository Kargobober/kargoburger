// Хочу получить доступ к кастомной css-переменной (прописана в библиотеке Практикума, в файле common.css для :root)
const body = document.querySelector('.body');
export const colorInterfaceAccent = getComputedStyle(body!).getPropertyValue('--colors-interface-accent');

export const REPONAME = 'kargoburger';
export const BASENAME = process.env.NODE_ENV === 'development' ? "" : `/${REPONAME}`;
