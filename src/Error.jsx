function Error({ message }) {
  return (
    <p className="error">
      <span>💥</span> There was an error <p>⛔{message}X</p>
    </p>
  );
}

export default Error;
