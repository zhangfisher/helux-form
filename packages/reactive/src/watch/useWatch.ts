import { useEffect } from "react"
import { ComputedScopeRef, IStore, Dict } from "../types"
import { sharex } from "helux"
import { installWatch } from "./install"
import { WatchDescriptorDefine,  WatchDependParams, WatchListener, WatchOptions } from "./types" 
import { normalizedWatchFilter } from "./utils"
import { IReactiveReadHookParams } from "../reactives/types"
/**
 * createWatch的hook版本 
 * 
   let { dd } = store.useWatch(()=>{

   },[])



 * 
 * 
 * @returns 
 */
export function createUseWatch<T extends Dict>(store:IStore<T>){
    return <Value = any,Result=Value>(listener:WatchListener<Value,Result>,depends:WatchDependParams<Value>,options?:WatchOptions<Result>)=>{
        useEffect(() => { 
            const params = {
                path: ['value'], 
                parent: undefined,
                value: () => {
                    const descr = {
                        listener,
                        options: Object.assign({
                            depends: normalizedWatchFilter(depends),
                            context : sharex({value: 0 }),
                            selfPath: ['value'],
                            initial : 0,
                            enable  : true,
                            scope   : ComputedScopeRef.Depends         
                        },options)
                    } as WatchDescriptorDefine 
                    return descr
                }
            } as unknown as IReactiveReadHookParams
            // 安装
            const watchObject = installWatch(params,store)
            return ()=>{ 
                store.watchObjects.delete(watchObject.id)
            }             
        },[depends])        
    }
}
