import { debounce } from '@repo/utils/src/debounce';
import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

interface InlineEditProps {
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
}

const InlineEdit: React.FC<InlineEditProps> = ({
  value,
  onChange,
  multiline = false,
}) => {
  const [editedValue, setEditedValue] = useState(value);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const debouncedOnChange = useCallback(
    debounce((newValue: string) => onChange(newValue), 1000),
    [],
  );

  useEffect(() => {
    setEditedValue(value);
  }, [value]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const newValue = e.target.value;
    setEditedValue(newValue);
    debouncedOnChange(newValue);
  };

  const InputComponent = multiline ? 'textarea' : 'input';

  return multiline ? (
    <textarea
      ref={inputRef as React.Ref<HTMLTextAreaElement>}
      value={editedValue}
      onChange={handleChange}
      className="bg-transparent focus:outline-none w-full text-sm text-muted-foreground resize-none"
      rows={4}
    />
  ) : (
    <input
      ref={inputRef as React.Ref<HTMLInputElement>}
      value={editedValue}
      onChange={handleChange}
      className="bg-transparent focus:outline-none w-full text-lg font-semibold border-b border-transparent focus:border-primary"
    />
  );
};

export default InlineEdit;
