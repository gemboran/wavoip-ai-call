import { checkResponseResult } from '../utils/functions.js';
import type {Socket} from 'socket.io-client'

class Call {
  private Socket: Socket;

  constructor(Socket: Socket) {
    this.Socket = Socket;
  }

  callStart({ whatsappid }: { whatsappid: string }) {
    return new Promise((resolve, reject) => {
      try {
        this.Socket.emit('calls:start', whatsappid, (response: any) => {
          try {
            if (checkResponseResult(response)) {
              resolve(response);
            } else {
              resolve(response);
            }
          } catch (error) {
            reject(error);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  endCall() {
    return new Promise((resolve, reject) => {
      this.Socket.emit('calls:end', {}, (response: any) => {
        if (checkResponseResult(response)) {
          resolve(response);
        } else {
          reject(response);
        }
      });
    });
  }

  acceptCall() {
    return new Promise((resolve, reject) => {
      this.Socket.emit('calls:accept', {}, (response: any) => {
        if (checkResponseResult(response)) {
          resolve(response);
        } else {
          reject(response);
        }
      });
    });
  }

  rejectCall() {
    return new Promise((resolve, reject) => {
      this.Socket.emit('calls:reject', {}, (response: any) => {
        if (checkResponseResult(response)) {
          resolve(response);
        } else {
          reject(response);
        }
      });
    });
  }

  mute() {
    return new Promise((resolve, reject) => {
      this.Socket.emit('calls:mute', {}, (response: any) => {
        if (checkResponseResult(response)) {
          resolve(response);
        } else {
          reject(response);
        }
      });
    });
  }

  unMute() {
    return new Promise((resolve, reject) => {
      this.Socket.emit('calls:unmute', {}, (response: any) => {
        if (checkResponseResult(response)) {
          resolve(response);
        } else {
          reject(response);
        }
      });
    });
  }
}

export default Call;