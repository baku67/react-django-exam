function Button(props) {
  return (
    <button
      type={props.htmlType}
      style={{ backgroundColor: props.color ?? "" }}
      onClick={props.onClick}
    >
      {props.label}
    </button>
  );
}

export default Button;
