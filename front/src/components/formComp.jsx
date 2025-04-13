function Input({
  type = 'text',
  placeholder = '',
  disabled = false,
  value,
  onChange,
  className = '',
  ...props
}){
    const baseClasses ='bg-[#F9FAFB] px-4 py-2 rounded-md border border-neutral-200 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 w-[100%]';
let combinedClassName = `${baseClasses} ${className}`
return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={combinedClassName}
      disabled={disabled}
      {...props}
    />
  )
}

function Select({
  value,
  onChange,
  options = [], 
  disabled = false,
  className = '',
  ...props
}) {
    const baseClasses = 'px-4 py-3 bg-[#F9FAFB] rounded-md border border-neutral-200 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 w-[100%]';

  const disabledStyle = disabled ? 'opacity-50 cursor-not-allowed' : '';

  const combinedClassName = `${baseClasses} ${disabledStyle} ${className}`.trim();

  return (
    <select
      value={value}
      onChange={onChange}
      className={combinedClassName}
      disabled={disabled}
      {...props}
    >
      <option value="0">Seleccione una opción</option>
      {options.map((option) => (
       
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
    
}

export {Input, Select}