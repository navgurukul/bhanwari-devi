// @ts-nocheck
import TrieSearch from 'trie-search';

/**
 * SearchService - Responsible for all the search operations
*/
class SearchService{
    /**
     * IData - The data that is to be searched into
     * @typedef {Object[]} IData
    */
    
    /**
     * Instantiate a new SearchService
     * @param {IData} data 
     */
    constructor(data){
        /**
         * Creates an array of object having two properties
         * keywords - joint string of all the values in dataRow
         * dataRow - object
         * @type {Array<{keywords: string, dataRow: IData}>}
        */
        const keywordRowPairs = data.map((dataRow) => ({ keywords: Object.values(dataRow).join(" "), dataRow }));
        const trie = new TrieSearch("keywords");
        trie.addAll(keywordRowPairs);
        this.trie = trie;
    }

    /**
     * Searches a keyword in the trie, against the set of joint string of all the attributes
     * @param {string} keyword 
     * @returns {IData} result
    */
    search(keyword){
        const result = this.trie.search(keyword);
        return result;
    }
}

export default SearchService;