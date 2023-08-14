import clsx from "clsx";

interface InputProps {
  isError?: boolean;
  messageError?: string;
  value: string | number;
  id: string;
  name: string;
}

const InputText: React.FC<
  InputProps & React.InputHTMLAttributes<HTMLInputElement>
> = ({ messageError, isError = false, value, ...props }) => {
  return (
    <section>
      <input
        // value={value}
        className={clsx(`w-full h-8 border px-2`, {
          'border-red-500': isError,
          'border-blue-500': !isError
        })}
        {...props}
      />
      {isError ? (
        <p className="text-red-500 font-bold">{messageError}</p>
      ) : (
        <></>
      )}
    </section>
  );
};

export default InputText;
