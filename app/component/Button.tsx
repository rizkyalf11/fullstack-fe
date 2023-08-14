'use client'
import clsx from "clsx";

type Variant = 'solid' | 'outline'
type ColorSchema = 'blue' | 'red' | 'green'

interface ButtonProps {
  title: string;
  isDisabled?: boolean;
  variant? : Variant,
  colorSchema : ColorSchema
}

const Button: React.FC<ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ title, isDisabled = false, variant = "solid", colorSchema, ...props }) => {
  return (
    <button
      disabled={isDisabled}
      className={clsx(`px-3 py-1 text-white rounded-sm mx-1 border`, {
        'bg-blue-500 border-blue-500': colorSchema === 'blue' && variant === 'solid',
        'bg-red-500 border-red-500': colorSchema === 'red' && variant === 'solid',
        'bg-green-500 border-green-500': colorSchema === 'green' && variant === 'solid',
        'opacity-50': isDisabled === true,
        'bg-white text-blue-500 border-blue-500': variant === 'outline' && colorSchema === 'blue',
        'bg-white text-green-500 border-green-500': variant === 'outline' && colorSchema === 'green',
        'bg-white text-red-500 border-red-500': variant === 'outline' && colorSchema === 'red',
      })}
      {...props}
    >
      {title}
    </button>
  );
};

export default Button;
