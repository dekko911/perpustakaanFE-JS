import { cn } from "../../lib/utils";

export const Input = ({
  name = "",
  ref,
  type = "text",
  defaultValue,
  className = "",
  onKeyUp,
  placeholder,
  autoComplete,
  onChange,
  ...props
}) => {
  return (
    <input
      name={name}
      ref={ref}
      type={type}
      defaultValue={defaultValue}
      className={cn(
        "w-full border border-white rounded-md text-white px-3 my-2 h-10",
        className,
      )}
      onKeyUp={onKeyUp}
      placeholder={placeholder}
      autoComplete={autoComplete}
      onChange={onChange}
      {...props}
    />
  );
};

export const InputCreate = ({
  className = "",
  type = "text",
  name = "",
  onKeyUp,
  placeholder = "",
  ...props
}) => {
  return (
    <input
      className={cn(
        "w-full p-2 border border-zinc-500 rounded-md text-white focus:outline-2 focus:outline-zinc-200/20 mt-1.5 mb-2",
        className,
      )}
      type={type}
      name={name}
      onKeyUp={onKeyUp}
      placeholder={placeholder}
      {...props}
    />
  );
};

export const InputUpdate = ({
  className = "",
  type = "text",
  name = "",
  onKeyUp,
  placeholder = "",
  defaultValue,
  ...props
}) => {
  return (
    <input
      className={cn(
        "w-full p-2 border border-zinc-500 rounded-md text-white focus:outline-2 focus:outline-zinc-200/20 mt-1.5 mb-2",
        className,
      )}
      type={type}
      name={name}
      onKeyUp={onKeyUp}
      placeholder={placeholder}
      defaultValue={defaultValue}
      {...props}
    />
  );
};

// export const CheckboxPermissions = ({
//   value,
//   className = "",
//   checked,
//   onChange,
//   children,
// }) => {
//   return (
//     <div className="flex items-center gap-x-2">
//       <input
//         type="checkbox"
//         value={value}
//         checked={checked}
//         className={cn("mt-2 mb-2 w-4 h-4 cursor-pointer", className)}
//         onChange={onChange}
//       />
//       {children}
//     </div>
//   );
// };

export const InputCreateFile = ({ name = "", className = "", onChange }) => {
  return (
    <input
      type="file"
      name={name}
      className={cn(
        "block border border-zinc-500 w-full p-2 rounded-md mt-1 mb-2 cursor-pointer",
        className,
      )}
      onChange={onChange}
    />
  );
};

export const InputUpdateFile = ({ name = "", className = "", onChange }) => {
  return (
    <input
      type="file"
      name={name}
      className={cn(
        "block border border-zinc-500 w-full p-2 rounded-md mt-1 mb-2 cursor-pointer",
        className,
      )}
      onChange={onChange}
    />
  );
};

export const InputLogin = ({
  name = "",
  type = "text",
  placeholder = "",
  id = "",
  defaultValue,
  className = "",
  onKeyUp,
  onChange,
  ...props
}) => {
  return (
    <input
      name={name}
      type={type}
      defaultValue={defaultValue}
      placeholder={placeholder}
      id={id}
      onKeyUp={onKeyUp}
      onChange={onChange}
      className={cn(
        "focus:outline-2 focus:outline-zinc-400/20 w-full bg-transparent text-white rounded-lg py-1.5 border border-zinc-500/50 px-3 mb-5 mt-2",
        className,
      )}
      {...props}
    />
  );
};

export const InputSignUp = ({
  name = "",
  type = "text",
  placeholder = "",
  defaultValue,
  id = "",
  className = "",
  ...props
}) => {
  return (
    <input
      name={name}
      type={type}
      defaultValue={defaultValue}
      placeholder={placeholder}
      id={id}
      autoComplete="current-password"
      className={cn(
        "focus:outline-2 focus:outline-zinc-400/20 w-full bg-transparent text-white rounded-lg py-1.5 text-sm border border-zinc-500/50 px-3 mb-4 mt-1.5",
        className,
      )}
      required
      {...props}
    />
  );
};

export const InputSearch = ({
  name = "",
  onKeyUp,
  placeholder = "",
  className = "",
  ...props
}) => {
  return (
    <input
      type="search"
      name={name}
      className={cn(
        "w-50 border border-zinc-500 text-sm px-2 rounded-md focus:outline-0 py-0.5",
        className,
      )}
      placeholder={placeholder}
      onKeyUp={onKeyUp}
      {...props}
    />
  );
};
