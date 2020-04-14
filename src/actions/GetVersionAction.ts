import {constants as C} from "../utils"

import { ActionType ,action} from 'typesafe-actions';
import { Version } from "../types/Version";


export const  GetVersionActions = {

	getVersionSuccess : (version:Version) => action(C.SHOW_VERSION,version),
	hideVersion: (showModal:boolean) => action(C.HIDE_VERSION,(false))
}
	  
export type GetVersionAction = ActionType<typeof GetVersionActions>;
  

  
	


	/**
		axios.get(backEndUrl + "/version")
		.then(resp => {
		
			//console.log("data",resp.data)
			// eslint-disable-next-line no-lone-blocks
			{
				// eslint-disable-next-line no-labels
				type: C.SHOW_VERSION,
				 (show:true,
				 version:"")
			}  
			
		})
		.catch(error =>{
			console.error("error at getting version",error)
			{
				type: C.CANCEL_FETCHING,
				{show:false,version:""}
			}
		})
	
 */
