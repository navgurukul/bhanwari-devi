import TrieSearch from 'trie-search';

class SearchService{
    
    constructor(data){
        const keywordRowPairs = data.map((dataRow) => ({ keywords: Object.values(dataRow).join(" "), dataRow }));
        const trie = new TrieSearch("keywords");
        trie.addAll(keywordRowPairs);
        this.trie = trie;
    }

    search(keyword){
        const result = this.trie.search(keyword);
        return result;
    }
}

export default SearchService;