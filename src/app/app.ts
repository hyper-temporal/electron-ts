import {IpcService} from "./IpcService";
import {OSData} from "@/types/OSData";
//import {ReflectionToString} from "@/shared/StringExtension";

const ipc = new IpcService();

document
  .getElementById('request-os-info')
  .addEventListener('click', async () => 
{
  const t = await ipc.send<OSData>('system-info');
  let str = "" + t.cpus+t.hostname+t.platform+t.availableParallelism
  document.getElementById('os-info').innerHTML = str ;
});
