import { useId, RefObject } from 'react';

type InputWithLabel = {
    label: string,
    type: string,
    onChange?(e: React.ChangeEvent<HTMLInputElement>): void,
    placeholder: string,
    inputRef?: RefObject<HTMLInputElement>,
}

export default function InputWithLabel({label='', type='', onChange, placeholder='', inputRef }: InputWithLabel) {
    const id = useId();
    return (
        <>
        <label htmlFor={id}>
            {label}
            <input className='w-full'
              id={id}
              type={type}
              onChange={onChange}
              placeholder={placeholder}
              ref={inputRef}  
            />
        </label>

       </>
    )
}
