import { toast, Bounce } from 'react-toastify';

export const errorHandler = (error) => {
   return toast.warn(error.response.data.username[0], {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
    });
};

