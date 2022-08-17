const Notification = ({ message }) => {
  const { content, isSuccess } = { ...message };

  if (content === null) {
    return null;
  }
  if (isSuccess) {
    return <div className="msjSuccess">{content}</div>;
  }
  return <div className="msjNoSuccess">{content}</div>;
};

export default Notification;