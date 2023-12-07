/**
    
    createStore({
        state:{
            user:{
                id:'2123',
                firstName:'tom',
                lastName:'zhang',
                fullname:(state)=>state.user.firstName+state.user.lastName,
                age:18,                
                addresss:[
                    {city:'北京',street:'朝阳区'},
                    {city:'上海',street:'浦东区'},
                    {city:'广州',street:'天河区'},
                ]        
            },
            books:[
                {name:'张三',price:18,author:'tom'},
                {name:'李四',price:19,author:'jack'},
                {name:'王五',price:20,author:'bob'}                
            ],
            orders:[],
            sales:{
                total:0,
            }              
        },
        computed:{
            // 同步计算属性
            "user.fullname":()=>{ 
                doSomething()
                return (state)=>state.user.firstName+state.user.lastName
            },
            // 异步计算属性,需要指定依赖
            "sales.total":[
                async ()=>{ 
                    await getOrders()
                    return (state)=>state.books.reduce((total,book)=>total+book.price,0)
                },["books"]
            ]
        },
        actions:{
            add(arg1,arg2){
                return state=>state.count++
            },
            async addAsync(arg1,arg2){
                await doSomething()
                return state=>state.count++
            }
        }

    
    } as const) 
 */

import { model } from "helux" 
import { createActions } from './action';
import { Actions, ComputedState } from "./types";
import { createComputed } from "./computed";
 

export interface StoreOptions<State>{    
    state:State
    computed?:Record<string,any>
    actions?:Actions<State>
}

 

export function createStore<T extends StoreOptions<any>>(options:T){
    
    return  model((api) => { // api对象 有详细的类型提示 
        const stateCtx = api.shareState<ComputedState<T['state']>>(options.state as any,{
            stopArrDep: true,
            enableDraftDep:true             
        })
        const { state, setState,syncer,useState,reactive,sync } = stateCtx

        // 1. 创建Actions        
        const actions = createActions<T>(options.actions,state,api) 

        // 2. 处理Computed属性 
        createComputed<T['state']>(options.computed,state,stateCtx,api)!
        
        return { 
          actions,               
          ...stateCtx
        }  
      });
      
}



 