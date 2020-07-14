function setQuery(model, query) {
  let limit = 20;
  let page = 1;

  function setPage() {
    if (query.page) {
      if (Number(query.page) <= 1) {
        page = 1;
      } else {
        page = Number(query.page);
      }
    }
  }
  const setLimit = () => {
    setPage();
    if (query.limit) {
      return Math.max(Number(query.limit), limit);
    }
  };

  const skip = () => {
    if (page <= 1) {
      return 0;
    } else {
      return page * limit;
    }
  };
  const buildQuery = () => {
    const queryString = JSON.stringify(query);
    const queryObj = JSON.parse(
      queryString.replace(/gte|lte|lt|gt/gi, (val) => `$${val}`)
    );
    const barredProps = ["skip", "select", "sort", "limit", "page"];
    barredProps.forEach((item) => {
      if (queryObj[item]) {
        delete queryObj[item];
      }
    });
    return model.find(queryObj).limit(setLimit()).skip(skip());
  };
  return buildQuery();
}
module.exports = setQuery;
