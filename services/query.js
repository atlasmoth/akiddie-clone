function setQuery(model, query) {
  let limit = 20;
  let page = 1;

  const setLimit = () => {
    if (query.limit) {
      limit = Math.max(Number(query.limit), limit);
    }
  };
  const setPage = () => {
    if (query.page) {
      if (Number(query.page) <= 0) {
        page = 1;
      } else {
        page = Number(query.page);
      }
    }
  };
  const skip = () => {
    console.log(page, limit);
    return page * limit;
  };
  const buildQuery = () => {
    const queryString = JSON.stringify(query);
  };

  setLimit();

  console.log(skip());
}
module.exports = setQuery;
