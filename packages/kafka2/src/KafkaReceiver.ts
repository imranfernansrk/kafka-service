export function kafkaReceiver(eventData: any) {
    const event = JSON.parse(eventData);
    let type = event.eventType;
    let data = event.data;

    if (type == 'postMedia') {
        console.log('====================================');
        console.log(`Successfully got the ${type} event data --->`, data);
        console.log('====================================');
    }
}