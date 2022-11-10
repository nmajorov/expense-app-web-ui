import { AzureEvent } from "../types/AzureEvent";
const { EventHubProducerClient } = require("@azure/event-hubs");

const connectionString = "Endpoint=sb://event-hub-ns-ai-driven-testing.servicebus.windows.net/;SharedAccessKeyName=SendEventsSharedAccessKey;SharedAccessKey=PE17XDjEEdxshQKWjMIKpxnbFbqZaR0f4uVAkV16oJE=";
const eventHubName = "user-events";

export async function sendEvent( event: AzureEvent) {

    // Create a producer client to send messages to the event hub.
    const producer = new EventHubProducerClient(connectionString, eventHubName);

    // Prepare a batch of three events.
    const batch = await producer.createBatch();
    // existing event
    batch.tryAdd(event);
    /** 
    batch.tryAdd({body: {
        timestamp: 1667218888,
        user_id: 11,
        event_name: "click_remove_expense",
        event_data: {}
    }});
    // unknown event
    batch.tryAdd({body:{
        timestamp: 1667218889,
        user_id: 11,
        event_name: "click_mysterious_new_button",
        event_data: {}
    }});
*/
    // Send the batch to the event hub.
    await producer.sendBatch(batch);

    // Close the producer client.
    await producer.close();

    console.log("A batch of events have been sent to the event hub");
}

