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
  /*  Total varialbles = n = 3
        Number of cases = nC3 + nC2 + nC1 = 1 + 3 + 3 = 7
    */
  setFilterSearch(statusFilter, searchTerm, langFilter) {
    switch (true) {
      /*All 3 are present*/
      case isValid(statusFilter) && isValid(searchTerm) && isValid(langFilter):
        this.URL = this.URL.concat(
          `?status=${statusFilter}&name=${searchTerm}&lang=${langFilter}`
        );
        break;
      /*Only status and search present*/
      case isValid(statusFilter) && isValid(searchTerm):
        this.URL = this.URL.concat(
          `?status=${statusFilter}&name=${searchTerm}`
        );
        break;
      /*Only search and language present*/
      case isValid(searchTerm) && isValid(langFilter):
        this.URL = this.URL.concat(`?name=${searchTerm}&lang=${langFilter}`);
        break;
      /*Only status and language present*/
      case isValid(statusFilter) && isValid(langFilter):
        this.URL = this.URL.concat(
          `?status=${statusFilter}&lang=${langFilter}`
        );
        break;
      /*Only status present*/
      case isValid(statusFilter):
        this.URL = this.URL.concat(`?status=${statusFilter}`);
        break;
      /*Only search present*/
      case isValid(searchTerm):
        this.URL = this.URL.concat(`?name=${searchTerm}`);
        break;
      /*Only language present*/
      case isValid(langFilter):
        this.URL = this.URL.concat(`?lang=${langFilter}`);
        break;
    }
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
