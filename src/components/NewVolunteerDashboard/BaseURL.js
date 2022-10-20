export class BaseURL{
    URL = `${process.env.REACT_APP_MERAKI_URL}/volunteers`;

    setDates(fromStart, toEnd){
        this.URL = this.URL.concat(`?${fromStart}&to=${toEnd}`);
    }

    setFilterSearch(statusFilter, searchTerm, langFilter){
        switch(true){
            case (statusFilter !== "" && searchTerm !== "" && langFilter !== ""):
                this.URL = this.URL.concat(`?status=${statusFilter}&name=${searchTerm}&lang=${langFilter}`);
                break;
            case (statusFilter !== "" && searchTerm !== ""):
                this.URL = this.URL.concat(`?status=${statusFilter}&name=${searchTerm}`);
                break;
            case (searchTerm !== "" && langFilter !== ""):
                this.URL = this.URL.concat(`?name=${searchTerm}&lang=${langFilter}`);
                break;
            case (statusFilter !== "" && langFilter !== ""):
                this.URL = this.URL.concat(`?status=${statusFilter}&lang=${langFilter}`);
                break;
            case (statusFilter !== ""):
                this.URL = this.URL.concat(`?status=${statusFilter}`);
                break;
            case (searchTerm !== ""):
                this.URL = this.URL.concat(`?name=${searchTerm}`);
                break;
            case (langFilter !== ""):
                this.URL = this.URL.concat(`?lang=${langFilter}`);
                break;
        }
    }

    setAmpersand(){
        this.URL = this.URL.concat("&")
    }
}