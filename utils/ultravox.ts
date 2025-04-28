import type {Socket} from "socket.io-client";
import WebSocket from "ws";

export const createRoom = async (): Promise<string> => {
  const response = await fetch('https://api.ultravox.ai/api/calls', {
    method: 'POST',
    headers: {
      'X-API-Key': '<ultravox api key>',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      systemPrompt: "You are a helpful assistant...",
      model: "fixie-ai/ultravox",
      voice: "Mark",
      medium: {
        serverWebSocket: {
          inputSampleRate: 16000,
          outputSampleRate: 16000,
        }
      }
    })
  });

  const { joinUrl } = await response.json();

  return joinUrl;
}
  
export const handlingMessage = (agent: WebSocket, user: Socket) => {
  agent.onopen = () => {
    user.on('audio_buffer', (message: any) => {
      agent.send(message);
    });
  };

  user.on('connect', () => {
    agent.on('message', (message: any) => {
      user.emit('microphone_buffer', message);
    });
  })

  user.on('disconnect', () => {
    agent.close();
  });
}