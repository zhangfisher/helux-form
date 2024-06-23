import { ComputedScopeRef } from "../store/types";
import { isAsyncFunction } from "flex-tools/typecheck/isAsyncFunction";
import type { ComputedDescriptorCreator, Dict } from "../types";
import { AsyncComputedGetter, ComputedDepends, ComputedGetter, ComputedOptions } from "./types";
import { normalizeDeps } from "../utils/normalizeDeps";
 



/**
 * 用来封装状态的计算函数，使用计算函数的传入的是当前对象
 *
 *  类型声明：
 *   R: 计算函数的返回值类型,该值会回写入声明的计算属性中，如果是异步计算函数，会回写入AsyncComputedObject.value中
 *   ExtraAttrs: 额外的属性，会合并到AsyncComputedObject中
 *
 * @param getter
 * @param depends
 * @param options
 * @returns
 *
 */
export function computed<R = any,ExtraAttrs extends Dict = {}>( getter: AsyncComputedGetter<R>,depends?:ComputedDepends,options?: ComputedOptions<R,ExtraAttrs>): ComputedDescriptorCreator<R>;
export function computed<R = any,ExtraAttrs extends Dict = {}>( getter: ComputedGetter<R>, options?: ComputedOptions<R,ExtraAttrs>): R
export function computed<R = any,ExtraAttrs extends Dict = {}>( getter: any,depends?:any, options?: ComputedOptions<R,ExtraAttrs>):any {
	
  if (typeof getter != "function")  throw new Error("computed getter must be a function");
  
  // 解析参数：同时支持同步和异步计算函数两种方式声明
  let deps:ComputedDepends = []
  const opts : ComputedOptions<R,ExtraAttrs> = {
    async           : false,
    enable          : true,
    timeout         : 0,
    depends         : [],    
    immediate       : true,
  }

  if(arguments.length==1){
    deps = []    
  }else if(arguments.length==2){
    if(Array.isArray(arguments[1])){
      deps = arguments[1]
    }else if(typeof(arguments[1])=='object'){
      Object.assign(opts,arguments[1])
    }else{
      throw new Error("invalid arguments")
    }
  }else if(arguments.length>=3){
    deps = arguments[1]
    Object.assign(opts,arguments[2])
  }


  // 是否是异步计算函数
  const isAsync = opts.async === true 
        || isAsyncFunction(getter)
        || (arguments.length>=2 && Array.isArray(depends)) 


  opts.async = isAsync;  
  opts.depends = normalizeDeps(deps) ; 

  const descriptor:ComputedDescriptorCreator<R> = () => {
    return {
      getter,
      options: opts,
    };
  };

  // @ts-ignore
  descriptor.__COMPUTED__ = isAsync ? 'async' : 'sync';
  return descriptor  
}
 