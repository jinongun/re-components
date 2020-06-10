import React from 'react';

interface InputPINProps{
  type?: string;
  inputMode?: string;
  length?: number;
  defaultValue?: string;
  onChange?: (e: any) => void;
  onComplete?: () => void;
  render?: () => React.ReactNode;
  [key: string]: any;  
}

function initialValues({length, value}:any){
  console.log(length);
  console.log(value.length);
  const t = length - value.length;
  if(t > 0){
    return [...value.split(''), ...Array(t).fill('')];
  }else{
    return value.split('').slice(0, length);
  }
}
function InputPIN({length =4, type='text',defaultValue, value, onChange, className, onComplete, focused  }:InputPINProps){
  console.log('InputPIN rendered')
  const inputRefs:any = React.useMemo(()=> Array(length).fill(0).map(i => React.createRef()), [length]);
  const values = React.useMemo(()=>{
    console.log('useMemo!')
    const res = initialValues({ length, value:  value});
    return res;
  },[value, length]);


  React.useEffect(()=>{
    if(focused){
      inputRefs[0].current.focus();
    }
  },[focused, inputRefs]);
  function handleChange(e:any, index:number){
    const typed = e.target.value.toString();
    onChange?.(() => {
      return values.map((i:any, jndex:number)=>{
        if(index === jndex) return typed[typed.length-1] || ''
        return i || '';
      }).join('');
    });

    if (typed !=='' &&  inputRefs[index + 1]) inputRefs[index + 1].current.focus();
    else if(typed !== ''){
      console.log('onCompleted?')
      onComplete?.();
      //inputRefs[index].current.blur();
    }
    
  }
  function handleBackspace(e:any, index:number) {
    if(e.keyCode === 8){
      if((e.target.value === '') &&inputRefs[index-1]){
        inputRefs[index - 1].current.focus();
      }
    }
  }
  return (
    <label className={`InputPIN ${className}`}>
      {
        new Array(length).fill(0).map((i,index)=>(
        <input key={index} 
              value={values[index] } 
              onKeyDown={(e)=>handleBackspace(e,index)} 
              type={type} 
              ref={inputRefs[index]} 
              onChange={(e)=>handleChange(e,index)}   />))
      }
    </label>
  )
}
export default InputPIN;