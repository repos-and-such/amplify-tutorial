import { observer } from 'mobx-react-lite'
import { InputFieldProps } from '../Types'
import './InputField.css'

const InputField = observer(({ placeHolder, value, updateFunc }: InputFieldProps) => {
    return (
      <input
        type="text"
        maxLength={100}
        spellCheck="false"
        placeholder={placeHolder}
        onChange={(e) => updateFunc(e.target.value)}
        value={value}
      />
    )
})

export default InputField