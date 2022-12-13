// @ts-check
import TrieSearch from 'trie-search';

/**
 * SearchService - Responsible for all the search operations
*/
class SearchService{
    /**
     * IDataRow - A single row of search data
     * @typedef {Object} IDataRow
     */
     
    /**
     * IData - An Array of search data rows
     * @typedef {IDataRow[]} IData
     */   
    
    /**
     * Instantiate a new SearchService
     * @param {IData} data 
     */
    constructor(data){
        /**
         * Creates an array of object having two properties
         * keywords {string} - joint string of all the values in dataRow
         * dataRow {IDataRow} - a row of data to search through
         * @type {Array<{keywords: string, dataRow: IDataRow}>}
        */
        const keywordRowPairs = data.map((dataRow) => ({ keywords: Object.values(dataRow).join(" "), dataRow }));
        const trie = new TrieSearch("keywords");
        trie.addAll(keywordRowPairs);
        this.trie = trie;
    }

    /**
     * Searches for keywords against the set of joint string of all the attributes
     * @param {string} keywords - the search keywords
     * @returns {IData} result - the resulting rows containing all search keywords
     */
    search(keywords) {
      const result = this.trie.search(keywords);
        return result;
    }
}

export default SearchService;