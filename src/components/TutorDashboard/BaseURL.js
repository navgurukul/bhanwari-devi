function isValid(val) {
  return val !== "";
}

export class BaseURL {
  URL = `${process.env.REACT_APP_MERAKI_URL}/volunteers`;

  /*Setting date range */
  setDates(fromStart, toEnd) {
    this.URL = this.URL.concat(`?from=${fromStart}&to=${toEnd}`);
  }

  /*Filters and Search */
  setFilterSearch(statusFilter, searchTerm, langFilter) {
    const filters = {
      status: statusFilter,
      lang: langFilter,
      name: searchTerm,
    };
    this.URL +=
      "?" +
      Object.entries(filters)
        .filter((keyValuePair) => isValid(keyValuePair[1]))
        .map((keyValuePair) => `${keyValuePair[0]}=${keyValuePair[1]}`)
        .join("&");
  }

  setPathway(pathway) {
    this.URL = this.URL.concat(`pathway=${pathway}`);
  }
  /*Joining & */
  setAmpersand() {
    this.URL = this.URL.concat("&");
  }

  /*Joining ? */
  setQuestion() {
    this.URL = this.URL.concat("?");
  }
}
