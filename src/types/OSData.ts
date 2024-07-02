
export class OSData 
{
  hostname: string
  cpus : number
  availableParallelism : number
  arch : string
  platform : string
  
  public constructor(init?:Partial<OSData>) {
    Object.assign(this, init);}
    
}
