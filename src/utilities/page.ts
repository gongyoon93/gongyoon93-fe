export const sliceArrayByLimit = (totalPage: number, limit: number) => {
  const totalPageArray = [...new Array(totalPage)].map((_, i) => i + 1);
  return [...new Array(Math.ceil(totalPage / limit))].map(() => totalPageArray.splice(0, limit));
};
