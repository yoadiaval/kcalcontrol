

function Button({
  children,
  variant = 'primary',
  onClick,
  disabled = false,
  className = '',
  ...props
}) {
  const styleBase = 'px-4 py-2 rounded-md font-semibold transition-colors duration-200 cursor-pointer';

  const variants = {
    primary: 'bg-blue-400 text-white hover:bg-blue-500',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };

  const variantStyle = variants[variant] || '';

  const disabledStyle = disabled ? 'opacity-50 cursor-not-allowed' : '';

  const combinedClassName = `${styleBase} ${variantStyle} ${disabledStyle} ${className}`.trim();

  return (
    <button
      className={combinedClassName}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;