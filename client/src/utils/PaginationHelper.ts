/**
 * helper to paginate the items
 * by giving amount items per  as input this class can calculate total pages and new array of element
 * with desired amount per page
 *
 */
export class PaginationHelper {
    pages:number = 0;
    elementsPerPage: number = 2;
    originalItems: Array<any>;
    // new array containing array of element per page
    paginatedArray:Array<Array<any>>;

    constructor(elementsPerPage,items:Array<any>) {
        this.elementsPerPage = elementsPerPage
        this.originalItems = items
        this.paginatedArray =[];
    }

    calculatePages(){
        if (this.originalItems.length ===0 ) {
            return 0
        }
        if (this.originalItems.length % this.elementsPerPage === 0){
            this.pages = (this.originalItems.length / this.elementsPerPage)
           for(let i=0;i< this.pages ;i++){
               this.paginatedArray.push(
                  this.originalItems.slice(i,this.elementsPerPage)
               )
           }
        }else{

        }

        return  this.pages
    }

    getPaginatedArray(){
        return this.paginatedArray
    }



}