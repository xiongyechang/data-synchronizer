import { SendTarget, onCallback } from "types/index";

export abstract class BaseAdaptor {
  abstract onMessage(chan: string | string[], callback: onCallback): void;
  abstract sendMessage<T extends object>(chan: string | string[], o: T, targets: SendTarget): void;
  abstract onSendMessageError(chan: string | string[], callback: onCallback): void;
  abstract close(chan: string | string[]): void;
}