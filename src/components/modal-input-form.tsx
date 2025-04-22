export const ModalInputForm = ({
  value,
  setValue,
  errorMessage,
  placeholder,
  autoFocus,
}: {
  value?: string;
  setValue: (val: string) => void;
  errorMessage?: string;
  placeholder: string;
  autoFocus?: boolean;
}) => {
  return (
    <div className="max-w-sm mx-auto">
      <input
        type="text"
        value={value ?? ''}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus || false}
        className={`mt-1 block w-full border p-2 text-black bg-white rounded-md shadow-sm ${!errorMessage ? 'border-gray-300' : 'border-red-500'}`}
      />
      {errorMessage && <p className="mt-1 text-sm text-red-500">{errorMessage}</p>}
    </div>
  );
};
