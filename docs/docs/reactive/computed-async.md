---
group:
  title: 计算属性
  order: 2
order: 0  
title: 异步计算
demo:
  tocDepth: 5
---

## 介绍
 
异步计算属性是一个异步函数，当所依赖的状态值变化时，会自动重新计算。

异步计算属性具有以下特性：

- 异步计算属性是一个异步函数或者返回值是一个`Promise`对象。
- 异步计算属性的依赖收集需要手动显式指定。
- 异步计算属性会被替换为`AsyncComputedObject`对象，通过该对象可以读取到异步计算的进度以及结果等。

<Divider></Divider>

## 基本用法

异步计算属性使用`computed`进行声明，方式如下：

```tsx 
import { computed,createStore } from "@speedform/reactive"
import { api } from "speedform-docs"

const mygithub = {
  user:{
    repo:"https://api.github.com/users/zhangfisher/repos",
    projects:computed<Project[]>(async ([repoUrl])=>{
      await new Promise(resolve=>setTimeout(resolve,2000))
        return await api.getProjects(repoUrl) 
     },
     ["user/repo"],
     {
      scope:"depends"
     })
  }
}

const store = createStore<typeof mygithub>({state:mygithub})

export default ()=>{
  const [state] = store.useState()
  globalThis.MyGithub=state
  return <div>
      <p><b>修改仓库地址将触发重新加载该仓库项目列表</b></p>
      仓库地址：<input value={state.user.repo} onChange={store.sync(["user","repo"])}/>
      <button onClick={()=>store.state.user.projects.run()}>重试</button> 
      <button onClick={()=>store.state.user.repo = "https://api.github.com/users/zhangfisher/repos"}>恢复</button>    

      <table className="projects-list">
          <thead><tr><td colSpan="3">以下是我的开源项目，感谢支持！</td></tr>
          <tr><td><b>项目名称</b></td><td><b>说明</b></td><td><b>星</b></td></tr></thead>                    
          <tbody>
          {
              state.user.projects.loading ? 
              (<tr><td colSpan={3}>正在加载...:</td></tr>)
              :
              (
                  state.user.projects.error? (<tr><td colSpan={2}>加载错误:{state.user.projects.error}</td></tr>)
                  : (
                    state.user.projects && state.user.projects.result.map((project,index)=>{
                          return <tr key={index}>
                            <td><a href={project.url} target="__blank">{project.name}</a></td>
                            <td>{project.description}</td>
                            <td>{project.stars}</td>
                            </tr>
                      })
                  )
              )
          }
          </tbody>
      </table>
  </div>

}

```

**说明**

- 使用`computed`函数声明异步计算属性，`computed`参数：
  - 第一个参数是一个异步函数，或者返回值是一个`Promise`对象,可以在此函数中编写业务逻辑，在本例中从`github`加载项目列表。
  - 第二个参数是一个字符串数组，用来指定依赖的状态路径。可以指定多个依赖路径。
  - 第三个参数是一个`ComputedOptions`对象，用来指定计算属性的一些选项。

:::info
**重点：经过`createStore`处理后，`state.user.projects`转换为一个`AsyncComputedObject`对象，通过该对象可以读取到异步计算的进度以及结果等信息。**
:::

**在上例中`state.user.projects`值为**

```js
  {
    "loading":false,  // 是否正在计算
    "timeout":0,
    "retry":0,
    "error":null,
    "progress":0,
    "result":/**此处就是异步计算函数的返回值**/
  }
```

<Divider></Divider>

## computed

`computed`函数用来声明一个异步计算属性或异步计算属性，其签名如下：

```ts | pure 
// 异步计算属性
function computed<R = any,ExtraAttrs extends Dict = {}>( 
  getter: AsyncComputedGetter<R>,
  depends?:ComputedDepends,
  options?: ComputedOptions<R,ExtraAttrs>): ComputedDescriptor<R & ExtraAttrs>;

// 也可以用来声明一个同步计算属性，此时不需要指定`depends`参数

export function computed<R = any,ExtraAttrs extends Dict = {}>( 
  getter: ComputedGetter<R>, 
  options?: ComputedOptions<R,ExtraAttrs>): R

```

**computed支持三个参数：**

-  `getter`：异步计算函数，或者返回值是一个`Promise`对象。
- `depends`：可选，依赖收集，用来指定依赖的状态路径。当用来声明同步计算时不需要指定。
- `options`：可选，计算属性的一些选项。

**computed支持2泛型类型：**
- `R`：计算函数的返回值类型。
- `ExtraAttrs`：额外属性类型，被合并到`AsyncComputedObject`的额外属性。

<Divider></Divider>

## 计算函数

`computed`函数的第一个参数，当依赖的状态值变化时，会自动重新计算的函数，可以是同步的，也可以是异步的，其签名如下：

- **异步计算函数**

```ts | pure  
type AsyncComputedGetter<R = any> = (scope: any, options: AsyncComputedGetterOptions) => R | Promise<R>;
```

**注意：**`computed`内部使用`isAsync`来判断传入的是否是一个异步函数，以采取不同的处理逻辑。由于在某个情况下，这个判断可能会有误，需要显式指定`options.async=true`。
-  如果传入的是一个返回`Promise`的同步函数，需要显式指定`options.async=true`，否则会被认为是同步函数。 
- 由于有使用`babel`等转译为`es5`等时，异步函数有可能会被转译为同步函数，此时需要也显式指定`options.async=true`。


- **同步计算函数**

```ts | pure 
export type ComputedGetter<R,Scope=any> = (scope: Scope) => Exclude<R,Promise<any>>
```
<Divider></Divider>

## 指定依赖

不同于同步计算,异步计算属性的依赖收集需要在`computed`的第二个参数中手动**显式指定**.

```ts | pure {3}
export function computed<R = any,ExtraAttrs extends Dict = {}>( 
  getter: AsyncComputedGetter<R>,
  depends?:ComputedDepends,   // 声明依赖
  options?: ComputedOptions<R,ExtraAttrs>): ComputedDescriptor<R & ExtraAttrs>;
```

依赖参数是一个`ComputedDepends`类型.

```ts | pure
export type ComputedDepends =Array<string | Array<string>> 
```

依赖取值是提定其在状态对象的路径，可以是一个字符串或字符串数组。

- **绝对路径**

当依赖是一个字符串数组时，代表其在对象中的绝对路径。如`depends=[["a","b","c"],["x",1]]`代表其依赖对象中的`a.b.c`，和`x.1(x是一个数组，依赖其第1项)`

同样的依赖也可以使用字符串形式，使用`/`作为分割符，`depends=["a/b/c","x/1"]`


- **相对路径**

依赖也可以是指定相对路径，就如同文件夹路径一样，使用`./`代表当前路径，`../`代表父路径。

重点在于这个相对是相对谁，我们用一个例子来说明。

```tsx {10,11,20,21,32,33}
import { createStore,computed,ComputedScopeRef } from "@speedform/reactive" 

const user = {
  user:{
    firstName:"zhang",
    lastName:"fisher",
    fullName: computed(async ([first,last])=>{ 
      return first + last
    },[
      "user/firstName",
      "user/lastName"
    ],{  
      // 默认scope指向的是current，即fullName所在的对象
      // 这里指定scope为Depends，这样就可以传入
      scope:ComputedScopeRef.Depends
    }),    
    fullName1: computed(async ([first,last])=>{ 
      return first + last
    },[// 使用相对依赖,./指的是当前对象user
      "./firstName",
      "./lastName"
    ],{   
      scope:ComputedScopeRef.Depends
    })
  },
  other:{ 
    fullName2: computed(async ([first,last])=>{ 
      return first + last
    },[
    // 使用相对依赖，../父对象指向的是other的父对象
    // ../user就指向user对象
      "../user/firstName",
      "../user/lastName"
    ],{   
      scope:ComputedScopeRef.Depends
    })
  }

}

const store = createStore({state:user})

export default ()=>{
  const [state]=store.useState()
  return (<div>
      <div>firstName={state.user.firstName}</div>
      <div>lastName={state.user.lastName}</div>
      <div>fullName={state.user.fullName.result}</div>
      <div>fullName1={state.user.fullName1.result}</div>
      <div>fullName2={state.other.fullName2.result}</div>
    </div> )
}


```


**注意：**

- 相对路径的相对指的是**相对使用`computed`声明的数据项所在的对象**，而不是使用`computed`声明的数据项
- 依赖分割符推荐使用`/`
- 如果异步计算没有指定依赖，则该计算属性不会被触发重新计算，会在控制台给出一个警告，也可以手动执行。

<Divider></Divider>


## 异步计算对象

不同于同步计算属性，每一个便用`computed`声明的异步计算属性均会被替换成`AsyncComputedObject`对象（原地移花接木），通过该对象：
- 可以读取到异步计算的进度以及结果等
- 提供超时、重试等功能
- 提供异步计算进度等功能

`AsyncComputedObject`对象声明如下：

```ts
export type AsyncComputedObject<Result= any,ExtAttrs extends Dict = {}> ={
  loading? : boolean;               // 是否正在计算
  progress?: number;                // 进度值    
  timeout? : number ;               // 超时时间，单位ms，当启用超时时进行倒计时
  error?   : any;                   // 执行出错时的错误信息
  retry?   : number                 // 重试次数，当执行重试操作时，会进行倒计时，每次重试-1，直到为0时停止重试
  result   : Result;                // 计算函数的返回值保存到此处
  run      : (options?:RuntimeComputedOptions) => {};    // 重新执行任务
} & ExtAttrs                        // 额外的属性
```

以下是一个例子，`state.user.fullName`是一个`AsyncComputedObject`对象，通过该对象可以读取到异步计算的进度以及结果等。

```ts {13-20}

const state = {
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    fullName: async (user)=>{
      // await some async code
      return user.firstName+user.lastName
    } 
  }
}  
const store = createStore<typeof state>({state})
// 经createStore处理后的fullName是一个AsyncComputedObject对象
store.state.user.fullName=={
  loading:false,          // 是否正在计算
  error:null,             // 计算错误信息
  timout:0,               // 超时计算相关
  retry:0,                // 重试次数
  result:"ZhangFisher",   // 计算结果
  progress:0,             // 计算进度
  run:()=>{},             // 重新执行计算
}
```

 
<Divider></Divider>

## 加载状态

异步计算属性的加载状态保存在`AsyncComputedObject`对象的`loading`属性中，当`loading`为`true`时，代表异步计算正在进行中。

以下是一个异步计算加载状态的例子：

```tsx {25,26,27}
import { createStore,computed,ComputedScopeRef,getSnap } from '@speedform/reactive';
import { useRef,useEffect } from "react"
import { delay } from "speedform-docs"
import { Box} from "@speedform/demo-components"

const state = {
  user:{
    firstName:"Zhang",
    lastName:"Fisher",
    fullName: computed(async (user)=>{
      await delay() 
      return user.firstName+user.lastName  
    },["user/firstName","user/lastName"]) 
  }
}  
const store = createStore<typeof state>({state})

export default ()=>{
  const count = useRef(0)
  const [state,setState] = store.useState()
  useEffect(()=>{count.current++},[])
  return (<Box><div>
    <div>FirstName:{state.user.firstName}</div>
    <div>LastName:{state.user.lastName}</div> 
    <div>FullName:{
      state.user.fullName.loading ? '正在计算...' : (
        state.user.fullName.error ? `ERROR:${state.user.fullName.error}`: 
        state.user.fullName.result
      )}</div>
    {/* <div>error:{state.user.fullName.error}</div> */}
    <button onClick={()=>setState((state)=>state.user.firstName='ZHANG '+count.current++)}>修改FirstName</button>
    <button onClick={()=>setState((state)=>state.user.lastName='FISHER'+count.current++)}>修改LastName</button>
    <button onClick={()=>state.user.fullName.run()}>重新计算</button>
  </div>
  <div>
    {JSON.stringify(state.user.fullName)}
  </div>
  </Box>
  )
}
```
 
<Divider></Divider> 

## 执行进度

异步计算属性的执行进度保存在`AsyncComputedObject`对象的`progress`属性中，当`progress`为`0-100`时，代表异步计算的进度。开发者可以根据进度值来展示进度条等。

使用方法如下：

```tsx {25,26,27}
import { createStore,computed,ComputedScopeRef,getSnap } from '@speedform/reactive';
import { useRef,useEffect } from "react"
import { delay } from "speedform-docs"
import { Box} from "@speedform/demo-components"

const shop = {
  order:{
    bookName:"ZhangFisher",
    price:100,
    count:1,
    total: computed(async ([count,price],{getProgressbar})=>{
      const progressbar = getProgressbar()
      return new Promise(async (resolve)=>{
        for(let i=1;i<=100;i++){
          await delay(20)
          progressbar.value(i)
        }
        progressbar.end()
        resolve(count*price)
      }) 
    },
    ["order/count","order/price"],
    {scope:ComputedScopeRef.Depends}) 
  }
}  
const store = createStore({state:shop})

export default ()=>{
  const [state,setState] = store.useState()
  return (<Box>
    <table>
      <thead><tr><td colSpan="2">订单信息</td></tr></thead>
      <tbody>
        <tr><td><b>书名</b></td><td>{state.order.bookName}</td></tr>
        <tr><td><b>价格</b></td><td>{state.order.price}</td></tr>
        <tr><td><b>数量</b></td><td>
          <button onClick={()=>setState(draft=>draft.order.count=draft.order.count-1)}>-</button>
          <input value={state.order.count} onChange={store.sync(to=>to.order.count)}/>
          <button  onClick={()=>setState(draft=>draft.order.count=draft.order.count+1)}>+</button>
        </td></tr>        
      </tbody>
      <tfoot>
        <tr><td><b>总价</b></td><td>
         {
        state.order.total.loading ? `正在计算...${state.order.total.progress}%`  
        : (
          state.order.total.error ? `ERROR:${state.order.total.error}`: state.order.total.result
        )}
        </td></tr>
        </tfoot>
      </table>
    
    <div>
      {JSON.stringify(state.order.total)}
    </div>
  </Box>)
}
```
<Divider></Divider>

## 超时处理

在创建`computed`时可以指定超时参数(单位为`ms`)，实现**超时处理**和**倒计时**功能。基本过程是这样的。

1. 指定`options.timeout=超时时间`
2. 当异步计算开始时，会启动一个定时器时，并更新`AsyncComputedObject`对象的`timeout`属性。
3. 当超时触发时会触发`TIMEOUT`错误，将错误更新到`AsyncComputedObject.error`属性中。


```tsx {25,26,27}
import { createStore,computed,ComputedScopeRef,getSnap } from '@speedform/reactive';
import { useRef,useEffect } from "react"
import { delay } from "speedform-docs"
import { Box} from "@speedform/demo-components"

const shop = {
  order:{
    bookName:"ZhangFisher",
    price:100,
    count:1,
    total: computed(async ([count,price])=>{
        await delay(2000)    // 模拟长时间计算
        return count*price
    },
    ["order/count","order/price"],
    {
      timeout:1000 ,
      scope:ComputedScopeRef.Depends
    })
  }
}  
const store = createStore({state:shop})

export default ()=>{
  const [state,setState] = store.useState()
  return (<Box>
    <table>
      <thead><tr><td colSpan="2">订单信息</td></tr></thead>
      <tbody>
        <tr><td><b>书名</b></td><td>{state.order.bookName}</td></tr>
        <tr><td><b>价格</b></td><td>{state.order.price}</td></tr>
        <tr><td><b>数量</b></td><td>
          <button onClick={()=>setState(draft=>draft.order.count=draft.order.count-1)}>-</button>
          <input value={state.order.count} onChange={store.sync(to=>to.order.count)}/>
          <button  onClick={()=>setState(draft=>draft.order.count=draft.order.count+1)}>+</button>
        </td></tr>        
      </tbody>
      <tfoot>
        <tr><td><b>总价</b></td><td>
         {
        state.order.total.loading ? `正在计算...(超时:${state.order.total.timeout})`  
        : (
          state.order.total.error ? `ERROR:${state.order.total.error}`: state.order.total.result
        )}
        </td></tr>
        </tfoot>
      </table>
    
    <div>
      {JSON.stringify(state.order.total)}
    </div>
  </Box>)
}
```

<Divider></Divider>

## 倒计时

在`超时`功能中不会自动更新`timeout`属性，可以通过`timeout=[超时时间,间隔更新时长]`来启用倒计时功能。

基本过程如下：

1. 指定`options.timoeut=[超时时间,间隔更新时长]`
2. 当异步计算开始时，会启动一个定时器，更新`AsyncComputedObject`对象的`timeout`属性。
3. 然后每隔`间隔更新时长`的，就更新一次`AsyncComputedObject.timoeut`
4. 当超时触发时会触发`TIMEOUT`错误，将错误更新到`AsyncComputedObject.error`属性中。

**例如：`options.timoeut=[5*1000,5]`代表超时时间为5秒，每1000ms更新一次`timeout`属性，倒计时`5`次。**


```tsx  
import { createStore,computed,ComputedScopeRef,getSnap } from '@speedform/reactive';
import { useRef,useEffect } from "react"
import { delay } from "speedform-docs"
import { Box} from "@speedform/demo-components"

const shop = {
  order:{
    bookName:"ZhangFisher",
    price:100,
    count:1,
    total: computed(async ([count,price])=>{
        await delay(100000)    // 模拟长时间计算
        return count*price
    },
    ["order/count","order/price"],
    {
      timeout:[5*1000,5] ,
      scope:ComputedScopeRef.Depends
    })
  }
}  
const store = createStore({state:shop})

export default ()=>{
  const [state,setState] = store.useState()
  return (<Box>
    <table>
      <thead><tr><td colSpan="2">订单信息</td></tr></thead>
      <tbody>
        <tr><td><b>书名</b></td><td>{state.order.bookName}</td></tr>
        <tr><td><b>价格</b></td><td>{state.order.price}</td></tr>
        <tr><td><b>数量</b></td><td>
          <button onClick={()=>setState(draft=>draft.order.count=draft.order.count-1)}>-</button>
          <input value={state.order.count} onChange={store.sync(to=>to.order.count)}/>
          <button  onClick={()=>setState(draft=>draft.order.count=draft.order.count+1)}>+</button>
        </td></tr>        
      </tbody>
      <tfoot>
        <tr><td><b>总价</b></td><td>
         {
        state.order.total.loading ? `正在计算...(倒计时:${state.order.total.timeout})`  
        : (
          state.order.total.error ? `ERROR:${state.order.total.error}`: state.order.total.result
        )}
        </td></tr>
        </tfoot>
      </table>
    
    <div>
      {JSON.stringify(state.order.total)}
    </div>
  </Box>)
}
```

<Divider></Divider>

## 重试

在创建`computed`时可以指定重试参数，实现**出错重试执行**的功能。基本过程是这样的。

- 指定`options.retry=[重试次数,重试间隔ms]`
- 当开始执行异步计算前，会更新`AsyncComputedObject.retry`属性。
- 当执行出错时，会同步更新`AsyncComputedObject.retry`属性为重试次数。


```tsx  
import { createStore,computed,ComputedScopeRef,getSnap } from '@speedform/reactive';
import { useRef,useEffect } from "react"
import { delay } from "speedform-docs"
import { Box } from "@speedform/demo-components"
let count = 0
const shop = {
  order:{
    bookName:"ZhangFisher",
    price:100,
    count:1,
    total: computed(async ([count,price])=>{ 
        ++count
        await delay()
        throw new Error("计算出错"+(count))
    },
    ["order/count","order/price"],
    {
      retry:[5,1000] ,// 重试5次，每次间隔1秒
      scope:ComputedScopeRef.Depends
    })
  }
}  
const store = createStore({state:shop})

export default ()=>{
  const [state,setState] = store.useState()
  return (<Box>
    <table>
      <thead><tr><td colSpan="2">订单信息</td></tr></thead>
      <tbody>
        <tr><td><b>书名</b></td><td>{state.order.bookName}</td></tr>
        <tr><td><b>价格</b></td><td>{state.order.price}</td></tr>
        <tr><td><b>数量</b></td><td>
          <button onClick={()=>setState(draft=>draft.order.count=draft.order.count-1)}>-</button>
          <input value={state.order.count} onChange={store.sync(to=>to.order.count)}/>
          <button  onClick={()=>setState(draft=>{count=0;draft.order.count=draft.order.count+1})}>+</button>
        </td></tr>        
      </tbody>
      <tfoot>
        <tr><td><b>总价</b></td><td>
         {
        state.order.total.loading ? `正在计算...`  
        : (
          state.order.total.error ? `ERROR:${state.order.total.error}`: state.order.total.result
        )}
        {state.order.total.retry >0 ? `重试:${state.order.total.retry}` : ''}
        </td></tr>
        </tfoot>
      </table>
    
    <div>
      {JSON.stringify(state.order.total)}
    </div>
  </Box>)
}
```

**说明**

- 重试期间`loading`会保持为`true`
- 重试次数为0时，不会再次重试。重试次数为`N`时，实际会执行`N+1`次。
- 重试期间`error`会更新为最后一次错误信息。

<Divider></Divider>

## 取消

在创建`computed`时可以传入一个`abortSignal`参数，该参数返回一个`AbortSignal`，用来取消计算操作。

基本操作方法是：

- 在`computed`中传入`abortSignal`参数，该参数是一个`AbortSignal`，可用来订阅`abort`信号或者传递给`fetch`或`axios`等。
- 取消时可以调用`AsyncComputedObject.cancel()`方法来触发一个`AbortSignal`信号。如下例中调用`state.order.total.cancel()`
  
 
```tsx  

import { createStore,computed,ComputedScopeRef,getSnap } from '@speedform/reactive';
import { useRef,useEffect } from "react"
import { delay } from "speedform-docs"
import { Box} from "@speedform/demo-components"

const shop = {
  order:{
    bookName:"ZhangFisher",
    price:100,
    count:1,
    total: computed(async ([count,price],{abortSignal})=>{
        return new Promise<number>((resolve,reject)=>{
					setTimeout(()=>{
						resolve(count*price)
					},10 *1000)
					abortSignal.addEventListener("abort",()=>{
						reject("cancelled")
					})
				})	
    },
    ["order/count","order/price"],
    {
      timeout:[10*1000,10] ,
      scope:ComputedScopeRef.Depends
    })
  }
}  
const store = createStore({state:shop})

export default ()=>{
  const [state,setState] = store.useState()
  return (<Box>
    <table>
      <thead><tr><td colSpan="2">订单信息</td></tr></thead>
      <tbody>
        <tr><td><b>书名</b></td><td>{state.order.bookName}</td></tr>
        <tr><td><b>价格</b></td><td>{state.order.price}</td></tr>
        <tr><td><b>数量</b></td><td>
          <button onClick={()=>setState(draft=>draft.order.count=draft.order.count-1)}>-</button>
          <input value={state.order.count} onChange={store.sync(to=>to.order.count)}/>
          <button  onClick={()=>setState(draft=>{draft.order.count=draft.order.count+1})}>+</button>
        </td></tr>        
      </tbody>
      <tfoot>
        <tr><td><b>总价</b></td><td>
          
         {
        state.order.total.loading ? `正在计算...${state.order.total.timeout}`  
        : (
          state.order.total.error ? `ERROR:${state.order.total.error}`: state.order.total.result
        )}
        {state.order.total.loading ? <button  onClick={()=>state.order.total.cancel()}>取消</button> : ''  }
        </td></tr>
        </tfoot>
      </table>
    
    <div>
      {JSON.stringify(state.order.total)}
    </div>
  </Box>)
}
```
**注意**：

- `abortSignal`参数是一个`AbortSignal`对象，可以用来订阅`abort`信号或者传递给`fetch`或`axios`等。
- 需要注意的，当调用`AsyncComputedObject.cancel()`时，计算函数如果订阅并接收到`abort`信号时，应该主动结束退出计算函数。如果计算函数没有订阅`abort`信号，调用`AsyncComputedObject.cancel()`是不会生效的。


<Divider></Divider>

## 不可重入

默认情况下，每当依赖发生变化时均会执行异步计算函数，在连续变化时就会重复执行异步计算函数。

在声明时，允许指定`options.noReentry=true`来防止重入，如果重入则只会在控制台显示一个警告。

<Divider></Divider>

## 简写异步计算

一般情况下，异步计算属性均应该使用`computed`进行声明，但是在某些情况下，也可以直接使用一个异步函数。

```ts | pure 
const order = {
    bookName:"ZhangFisher",
    price:100,
    count:3,
    total:async (order)=>{
      return order.price*order.count
    }
} 
```

上述简单的异步声明方式等效于以下方式：

```tsx
import { createStore,computed} from "@speedform/reactive"
const order = {
    bookName:"ZhangFisher",
    price:100,
    count:3,
    total:computed(async (order)=>{
      return order.price*order.count
    },[]) // 依赖是空的
}
 
const store = createStore({state:order})

export default ()=>{
  const [state] = store.useState()
  return (<div>
    <div>书名:{state.bookName}</div>
    <div>价格:{state.price}</div>
    <div>数量:{state.count}</div>
    <div>总价:{state.total.result}</div>
  </div>)
}
```

当不使用`computed`进行异步计算属性声明时，需要注意以下几点：

- 默认`scope`指向的是`current`，即`total`所在的对象。
- 其依赖是空，所以不会自动收集依赖，也不会自动重新计算。也就是说上例中的`price`和`count`变化时，`total`不会自动重新计算。但是在会在第一次访问时自动计算一次。

:::warning
**特别注意**：由于在不同的构建环境下，比如使用babel转码时，可能会将异步函数转码为同步函数，导致无法识别为异步函数而出现问题。
:::

看看以下例子：

```tsx
import { createStore} from "@speedform/reactive"
const order = {
    bookName:"ZhangFisher",
    price:100,
    count:3,
    total:async (order)=>{
      return order.price*order.count
    }
}   

const store = createStore({state:order})

export default ()=>{
  const [state] = store.useState()
  return (<div>
    <div>书名:{state.bookName}</div>
    <div>价格:{state.price}</div>
    <div>数量:{state.count}</div>
    <div>总价:{state.total.result}</div>
    <div>state.total={String(state.total)}</div>
  </div>)
}
```

**为什么不能正常工作，正确计算出`total`的值？**

可以看到上述例子中`state.total`的值是`[object Promise]`。
这是因为在本站使用的构建工具`webpack`使用`babel`进行转码，以上的异步函数被转码为同步函数，类似这样的形式：

```js
total(_x15) {
  return _total.apply(this, arguments);
}
```

这导致`Speedform`将其识别为异步函数，也就不能相应地创建异步`AsyncComputedObject`，而只是将其当作一个普通的同步计算属性。



















