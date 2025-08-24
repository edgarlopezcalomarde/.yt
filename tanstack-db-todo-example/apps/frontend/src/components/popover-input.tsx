import type React from "react"
import {
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverForm,
  PopoverLabel,
  PopoverRoot,
  PopoverSubmitButton,
  PopoverTextarea,
  PopoverTrigger,
} from "./ui/popover"

interface PopoverInputProps {
    icon:  React.ReactNode
    title:string
    onSubmit:(note:string)=> void
}
 
export default function PopoverInput({ onSubmit, icon, title }:PopoverInputProps) {

 
  return (
    <PopoverRoot>
      <PopoverTrigger className="cursor-pointer">{icon}</PopoverTrigger>
      <PopoverContent>
        <PopoverForm onSubmit={onSubmit}>
          <PopoverLabel>{title}</PopoverLabel>
          <PopoverTextarea />
          <PopoverFooter>
            <PopoverCloseButton />
            <PopoverSubmitButton />
          </PopoverFooter>
        </PopoverForm>
      </PopoverContent>
    </PopoverRoot>
  )
}