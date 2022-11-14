/* eslint-disable camelcase */



type  EventBody = {
    timestamp: number,
    user_id: number,
    event_name: string
    event_data: {}
}


/**
 * represent Expense types in backend
 */
 export type AzureEvent = {
    body: EventBody
 }
  