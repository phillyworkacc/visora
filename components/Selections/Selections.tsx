"use client"
import "./Selections.css"
import { useState } from "react";

type SelectionProps = {
   selections: string[];
   onSelect: (option: string, optionIndex?: number) => void;
   defaultStartOption?: number;
}

export default function Selections ({ selections, onSelect, defaultStartOption }: SelectionProps) {
   const [selectedOption, setSelectedOption] = useState<number>(defaultStartOption || 0);

   return (
      <div className="selections">
         {selections.map((selection, index) => (
            <div className={`selection ${(selectedOption == index) && 'selected'}`} key={index} onClick={() => {
               setSelectedOption(index);
               onSelect(selections[index], index);
            }}>{selection}</div>
         ))}
      </div>
   )
}
