/**
 * 
 *   字段组
 *  字段组拥有除了Value外的所有字段的属性
 * 
 *   <Network.Group name={}>
  *     {({title,enable,visible,readonly,help})=>{
 *         return <Card visibale={visible} readonly={readonly}>
 *              <Network.Field></Network.Field>
 *              <Network.Field></Network.Field>
 *              <Network.Field></Network.Field>
 *              <Button onClick=(()=>update(field=>field.enable=true))>禁用</Button>
 *              <Button onClick=(()=>update(field=>field.enable=true))>隐藏</Button>
 *              <Button onClick=(()=>update(field=>field.enable=true))>隐藏</Button>
 *          </Card>
 *      }
 *   </Network.Group>
 * 
 * 
 */


import { ReactNode, useCallback,useState,useEffect } from "react";
import { DefaultFieldPropTypes } from "./field";
import { Dict } from "./types";
import { getVal } from "@helux/utils";
import React from "react";
import { assignObject } from "flex-tools/object/assignObject";
import type { FormOptions } from "./form";


export type DefaultFieldGroupPropTypes = Omit<DefaultFieldPropTypes,'value' | 'oldValue' | 'defaultValue' | 'validate'>

export type FieldGroupRenderProps<PropTypes extends Dict>= Required<DefaultFieldGroupPropTypes & PropTypes> & {
    update: (fn: (group: Required<DefaultFieldGroupPropTypes & PropTypes> )=>void)=>void	   	   
  } 

export type FieldGroupRender<PropTypes extends Dict>= (props: FieldGroupRenderProps<PropTypes>) => ReactNode
export type FieldGroupProps<PropTypes extends Dict = Dict> = {
	name: string | string[]
	children: FieldGroupRender<PropTypes> | FieldGroupRender<PropTypes>[];
} 
  
export type FieldGroupComponent = React.FC<FieldGroupProps>;
  
function useFieldGroupUpdater(valuePath:string[],setState:any){
    return useCallback((updater:(group:any)=>void)=>{
        setState((draft:any)=>{
            updater.call(draft,getVal(draft,valuePath))
        })
    },[])
}
function createFieldGroupProps(name:string,value:any,fieldGroupUpdater:any){  
    return assignObject({
        name,
        help       : "",
        visible    : true,
        required   : false,
        readonly   : false,
        validate   : true,        
        enable     : true,
        update     : fieldGroupUpdater
    },value)

}
export function createFieldGroupComponent(this:FormOptions,store: any) {
    const self = this
    return React.memo(function FieldGroup<T extends Dict=Dict>(props: FieldGroupProps<T>):ReactNode{
        const { name } = props;  	       
        const [state,setState] = store.useState()
        const valuePath = Array.isArray(name) ? name : name.split(".")  
        const groupValue = getVal(state, valuePath)        
        // 更新当前组信息，如update(group=>group.enable=true)
        const fieldGroupUpdater = useFieldGroupUpdater(valuePath,setState)
        const [fieldGroupProps,setfieldGroupProps] = useState(()=>createFieldGroupProps(self.getFieldName(valuePath),groupValue,fieldGroupUpdater))

        useEffect(()=>{
            setfieldGroupProps(createFieldGroupProps(self.getFieldName(valuePath),groupValue,fieldGroupUpdater))
          },[groupValue])
 
        // 执行渲染
        return Array.isArray(props.children) ? 
            props.children.map((children:any)=>children(fieldGroupProps))
            : props.children(fieldGroupProps as any)

    },(oldProps:any, newProps:any)=>{
        return oldProps.name === newProps.name
    }) as (<T extends Dict=Dict>(props: FieldGroupProps<T>)=>ReactNode)
}