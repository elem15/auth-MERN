import { UseFormRegisterReturn } from "react-hook-form";


export const RadioGroup = ({ fieldRegister, radioList }: RadioGroupProps<UseFormRegisterReturn>) => {
  return (
    <fieldset className="flex flex-col mb-4 content-start flex-wrap">
      <legend className="text-left font-semibold mb-1 text-green-900">Select a gender</legend>
      {radioList.map((radioItem) => <div key={radioItem} className='text-start'>
        <input type="radio" value="male" {...fieldRegister} />
        <label htmlFor={radioItem} className='ml-2 capitalize'>{radioItem}</label>
      </div>)}
    </fieldset>
  )
}
