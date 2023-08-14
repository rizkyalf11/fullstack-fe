interface LabelProps {
  htmlFor: string;
  isRequired?: boolean;
  title:string
} 


const Label: React.FC<
LabelProps & React.LabelHTMLAttributes<HTMLLabelElement>
> = ({ htmlFor, isRequired = false, title }) => {
  return (
    <label htmlFor={htmlFor} className="flex" >
      {title}

      {isRequired && (
        <span className="text-red-500">*</span>
      )}
    </label>
  )
}

export default Label