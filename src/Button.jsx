function Button({ children, onClick, className, disabled }) {
  return (
    <button
      onClick={onClick}
      className={`btn ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
