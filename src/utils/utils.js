const visibleTitle = (title) => {
  if (!title) return 'Заголовок'
  const newTitle = title.split(' ').length > 7 ? `${title.slice(0, 7)} ...` : title
  return newTitle
}

export { visibleTitle }
