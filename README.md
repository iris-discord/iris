# Iris JS

```js
import { Client, GatewayIntents, GatewayEvents } from "../index";

const client = new Client({
  intents: [
      GatewayIntents.Guilds
  ]
});
  
client.on(GatewayEvents.Ready, () => {
   console.log('Ready!');
});
 
client.on(GatewayEvents.MessageCreate, async (message: any) => {
   if (message.content === '!ping') {
     message.reply('Pong!')
   }
});
 
client.login('token');
```
