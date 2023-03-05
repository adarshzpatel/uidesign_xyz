import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";
import { Command } from "cmdk";
import { Tag } from "@prisma/client";
import { Badge } from "@tremor/react";


/*
autocomplete=yes will show suggestions , select tags from suggestions
autocompleteO = wont' show suggestion , behave as normal tags input , add new tags by pressing Enter
*/

interface TagsInputProps {
  suggestions?:Tag[]
  tags:Tag[] 
  setTags:Dispatch<SetStateAction<Tag[]>>
  placeholder?:string
  autocomplete?:boolean
  className?:string
}

interface TagProps {
  text: string;
  removeTagFn?: () => void;
}

export const TagSelectInput = ({ className,suggestions,placeholder,tags,setTags,autocomplete,...props }: TagsInputProps) => {
  const [filteredItems,setFilteredItems] = useState<Tag[]>(suggestions ?? []); 
  const [value, setValue] = useState<string>("");
  const [open,setOpen] = useState<boolean>(false)

  const addItem = (val:Tag) => {
    setValue("")
    setTags(tags=>([...tags,val]))
    if(autocomplete){
      setFilteredItems(filteredItems => filteredItems.filter(it => it !== val))
    }
    setOpen(false)
  }

  const removeTag = (t:Tag) =>{
    setTags(tags.filter(item => item.id !== t.id))
    setFilteredItems(state =>[...state,t])
  }

  useEffect(()=>{
    if(value) setOpen(true)
  },[value])
  
  const styles = {
    root:"group relative",
    input:"border-[1px] focus:outline-none w-full focus:border-black border-gray-400 block focus:shadow-xl py-2 px-4 rounded-lg " + className,
    list:"absolute max-h-40 z-50 overflow-y-scroll translate-y-2 divide-y bg-white w-full rounded-lg overflow-hidden py-2 shadow-2xl border border-gray-400 flex flex-col",
    empty:"text-gray-400 pl-3 ",
    item:"py-2 w-full px-4 text-gray-600 font-normal"
  }

  return (
    <div>
      <div className="flex gap-1 flex-wrap mb-2">
        {tags?.map((item) => (
          <Badge key={`tag-${item}`} text={item.name} tooltip=""/>
        ))}
      </div>
      <Command
        shouldFilter={true}
         label="Command Menu" className={styles?.root}>
        <Command.Input
        onFocus={()=>{
          setOpen(true)
        }}
          onBlur={()=>setOpen(false)}
          value={value}
          placeholder={placeholder}
          onValueChange={(search) => setValue(search)}
          className={styles?.input}
        />
       {value && <Command.List  className={styles?.list}>
        <Command.Empty className={styles?.empty}> 
        {"Nothing here !"}
          </Command.Empty>
          {autocomplete && filteredItems?.map((item, id) => (
            <Command.Item
              onClick={()=>addItem(item)}
              onSelect={()=>addItem(item)}
              className={styles?.item}
              key={`item-${item.id}`}
            >
              {item.name}
            </Command.Item>
          ))}
        </Command.List>}
      </Command>
    </div>
  );
};
