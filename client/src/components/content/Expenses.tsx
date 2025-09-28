import { useParams, redirect } from "react-router-dom";
import { ExpensesForm } from "./ExpensesForm.tsx";

export const AddExpense=() =>{
    const { id } = useParams();
    const reportID =Number(id);

    if (isNaN(reportID)) {
        // If the ID is not a number, redirect to a "Not Found" page
         return (<>
         <p>
             Can´t find report number

         </p>
         </>);
         
    }



    return(<ExpensesForm id= {undefined} isEdit={false} reportId={reportID} />);
}

export const EditExpense=() =>{
    const { id } = useParams();
    const ID =Number(id);

    if (isNaN(ID)) {
        // If the ID is not a number, redirect to a "Not Found" page
         return (<>
         <p>
            Error  Can´t find report number

         </p>
         </>);
         
    }



    return(<ExpensesForm id= {ID} isEdit />);
}