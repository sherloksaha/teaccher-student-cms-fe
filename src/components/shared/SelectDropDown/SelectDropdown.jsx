import { ChevronDown } from "lucide-react";
import { useEffect } from "react";

export default function SelectDropdown({ value, options, placeholder, label, onSelect, isOpen, onToggle, onClose }) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (!event.target.closest('.auth-page__dropdown')) {
        onClose();
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <div className={`auth-page__dropdown${isOpen ? ' auth-page__dropdown--open' : ''}`}>
      <button
        type="button"
        className="auth-page__dropdown-trigger"
        onClick={onToggle}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={`auth-page__dropdown-value${value ? '' : ' auth-page__dropdown-value--placeholder'}`}>
          {value || placeholder}
        </span>
        <ChevronDown className="auth-page__dropdown-icon" />
      </button>

      {isOpen ? (
        <div className="auth-page__dropdown-menu" role="listbox" aria-label={label}>
          {options.map((option) => (
            <button
              key={option}
              type="button"
              role="option"
              aria-selected={value === option}
              className={`auth-page__dropdown-option${value === option ? ' auth-page__dropdown-option--active' : ''}`}
              onClick={() => onSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}