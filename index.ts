import { io } from 'socket.io-client';
import Call from "./models/Call";
import {createRoom, handlingMessage} from "./utils/elevenlabs";
import WebSocket from "ws";

const token = '<wavoip token>'

const socket = io('https://devices.wavoip.com', {
  transports: ['websocket'],
  path: `/${token}/websocket`
});

const call = new Call(socket);

socket.on('signaling', async ({tag}) => {
  if (tag === 'offer') call.acceptCall().catch(console.error);
});

socket.on('audio_transport:create', async ({room, ip, port}: {room: string, ip: string, port: string}) => {
  const user = io(`${ip}:${port}/call-${room}`, {
    transports: ['websocket'],
    path: `/${token}/websocket`,
    forceNew: true,
  });

  const agent = new WebSocket(await createRoom(), {
    perMessageDeflate: true,
    handshakeTimeout: 10000,
    maxPayload: 1024 * 1024
  });

  handlingMessage(agent, user);
});

socket.on('connect', async () => {
  console.log('connected');
  await call.callStart({
   whatsappid: '<destination number>'
  });
})