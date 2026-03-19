function Information(props) {
  return <p className={`message ${props.type ?? ""}`}>{props.message}</p>;
}

export default Information;
