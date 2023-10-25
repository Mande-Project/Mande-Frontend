import { toast } from 'react-toastify';


export const renderToast = (id, type, message, onSucess) => {
  if (type === 'error') {
    showToast('promise_error', message, id);
  } else {
    onSucess();
    showToast('promise_success', message, id);
  }
};

export const showToast = (type, message, idPromise, position) => {
  switch (type) {
    case 'warning':
      toast.warn(message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      break;
    case 'info':
      toast.info(message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      break;
    case 'success':
      toast.success(message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      break;
    case 'error':
      toast.error(message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      break;
    case 'promise_success':
      toast.update(idPromise, {
        render: `${message}`,
        type: 'success',
        isLoading: false,
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      break;

    case 'promise_error':
      toast.update(idPromise, {
        render: `${message}`,
        type: 'error',
        isLoading: false,
        // position: 'top-right',
        position: position || 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      break;
    default:
      toast.error(message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      break;
  }
};
