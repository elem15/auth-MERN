import s from './FileInput.module.css'
export const FileInput = ({ onChange, labelText }: FileInputProps) => {
  return (
    <div className="flex flex-col mb-4">
      <label className="text-left font-semibold mb-1 text-green-900">{labelText}</label>

      <label htmlFor="images" className={s.dropContainer}>
        <span className={s.dropTitle}>Drop files here</span>
        or
        <input onChange={onChange} name="img" type="file" id="images" accept="image/jpeg, image/png" />
      </label>
    </div>
  )
}
