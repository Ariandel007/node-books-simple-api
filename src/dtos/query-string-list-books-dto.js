class QueryStringListBooksDto {
    constructor(query) {
        this.skip = 0;
        this.limit = 20;
        this.sortBy = 'createdAt';
        this.typeSorting = -1;//-1 descendente, 1 ascendente

        if(query) {
            if (query.skip != null) {
                this.skip = parseInt(query.skip.trim());
            }
            if (query.limit != null) {
                this.limit = parseInt(query.limit.trim()) < 30 ? parseInt(query.limit.trim()) : 30;
            }
            if (query.sortBy) {
                this.sortBy = query.sortBy.trim();
            }
            if (query.typeSorting) {
                this.typeSorting = parseInt(query.typeSorting.trim());
            }    
        }
    }
}

module.exports = QueryStringListBooksDto;