/**
 * default Build representation
 * 
 */
export class Build {
    branch: string;
    buildnum: Number;
    projectdir:string;
    projectid:string;
    start:Date;
    end:Date;
    status:string;
    id:string;
   
    constructor(id:string,branch:string, buildnum:Number,projectdir:string,
        protectid:string, start:Date, end:Date,status:string){
            this.id =id
            this.branch = branch;
            this.buildnum = buildnum;
            this.projectdir = projectdir;
            this.projectid = protectid;
            this.start  = start;
            this.end = end;
            this.status = status;
    }


}