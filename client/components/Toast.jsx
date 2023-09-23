import { toast } from 'react-toastify';

const showToast = (type, message, promise, successPromise, errorPromise) => {
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
    case 'promise':
      toast.promise(promise, {
        pending: 'Loading',
        success: `${successPromise} 👌`,
        error: `${errorPromise} 🤯`,
      });
  }
};

export default showToast;
