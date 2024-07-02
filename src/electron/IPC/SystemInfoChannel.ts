import {IpcChannelInterface} from "./IpcChannelInterface";
import {IpcMainEvent} from 'electron';
import {IpcRequest} from "@/shared/IpcRequest";
import * as os from 'os';

export class SystemInfoChannel implements IpcChannelInterface {
  getName(): string {
    return 'system-info';
  }

  handle(event: IpcMainEvent, request: IpcRequest): void {
    if (!request.responseChannel) {
      request.responseChannel = `${this.getName()}_response`;
    }
    event.sender.send(
      request.responseChannel,
      {
        hostname: os.hostname(),
        cpus : os.cpus().length,
        availableParallelism : os.availableParallelism(),
        arch : os.arch(),
        platform : os.platform()
      })
    }
}
