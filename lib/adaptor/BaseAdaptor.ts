import { SendTarget, onCallback } from "types/index";

export abstract class BaseAdaptor {
  abstract onMessage(callback: onCallback): void;
  abstract sendMessage<T extends object>(o: T, targets: SendTarget): void;
  abstract onSendMessageError(callback: onCallback): void;
  abstract close(): void;
}