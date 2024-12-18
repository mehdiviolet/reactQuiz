function Button({ onClick, className, children, disabled }) {
  return (
    <button
      onClick={onClick}
      className={`btn ${className ? className : ""}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
