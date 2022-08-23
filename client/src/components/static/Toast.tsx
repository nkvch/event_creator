import React from 'react';

function Toast({ text }: { text: string }) {
  return <div id="snackbar" {...(text && { className: 'show' })}>{text}</div>;
}

export default Toast;
