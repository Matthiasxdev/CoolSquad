import React from 'react';
import styles from './InputForms.module.css';

type InputFormsProps = {
  title: string;
  placeholder?: string;
  isSpecial?: boolean;
  textareaRows?: number;
  type?: string;
};

const InputForms: React.FC<InputFormsProps> = ({ title,placeholder='', isSpecial, textareaRows, type='text'}) => {
  const boxClassName = isSpecial ? `${styles.box} ${styles.specialbox}` : styles.box;
  const inputElement = isSpecial ? (
    <textarea className={boxClassName} rows={textareaRows} />
  ) : (
    <input className={boxClassName} type={type} placeholder={placeholder}  />
  );
  return (
    <div>
      <label htmlFor={title}>{title}</label>
      {inputElement}
    </div>
  );
};

export default InputForms;