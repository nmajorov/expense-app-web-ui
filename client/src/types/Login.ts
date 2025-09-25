export interface UserProfile {
    token?: string;
    email: string;
    username?: string;
    firstname?: string;
    lastname?: string;   
}


/**
 * define login 
 */
export interface Login {
    username: string;
    password: string;
    
}
