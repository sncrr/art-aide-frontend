import ReactDOM from 'react-dom';
import { BsCheckCircle } from 'react-icons/bs';
import LoadingPage from '../pages/LoadingPage';

const clearMessage = (timer) => {
  clearInterval(timer);
  ReactDOM.render(
    null,document.getElementById('message_container')
  );
}

export const closeModal = () => {
  ReactDOM.render(
    null,document.getElementById('modal_container')
  );
}

export const showSuccessMessage = ({title, content}) => {

  let timer = setInterval(() => {
    clearMessage(timer)
  }, 4000);

  ReactDOM.render(
    <div className="bg-green-100 border-t-4 border-green-500 rounded-b text-green-900 px-4 py-3 shadow-md animate-fade">
      <div className="flex">
        <div className="py-1 pr-2">
          <BsCheckCircle size={24} />
        </div>
        <div>
          <p className="font-bold">{title}</p>
          <p className="text-sm">{content}</p>
        </div>
      </div>
    </div>
  ,document.getElementById('message_container'));
}

export const showErrorMessage = ({title, content}) => {
  let timer = setInterval(() => {
    clearMessage(timer)
  }, 4000);

  ReactDOM.render(
    <div className="bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md animate-fade">
      <div className="flex">
        <div className="py-1 pr-2">
          <BsCheckCircle size={24} />
        </div>
        <div>
          <p className="font-bold">{title}</p>
          <p className="text-sm">{content}</p>
        </div>
      </div>
    </div>
  ,document.getElementById('message_container'));
}

export const showWarningMessage = ({title, content}) => {
  let timer = setInterval(() => {
    clearMessage(timer)
  }, 4000);

  ReactDOM.render(
    <div className="bg-yellow-100 border-t-4 border-yellow-500 rounded-b text-yellow-900 px-4 py-3 shadow-md animate-fade">
      <div className="flex">
        <div className="py-1 pr-2">
          <BsCheckCircle size={24} />
        </div>
        <div>
          <p className="font-bold">{title}</p>
          <p className="text-sm">{content}</p>
        </div>
      </div>
    </div>
  ,document.getElementById('message_container'));
}

export const showConfirmDialog = ({onClick, title, content}) => {
  
  ReactDOM.render(
    <div className="fixed inset-0 z-50 overflow-auto flex" style={{ backgroundColor: "#70707022" }}>
      <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg">
        <div>
          <h2 className="text-xl">{title}</h2>
          <div className="py-5">{content}</div>
          <div className="flex justify-end">
            <div className="p-1">
              <button
                onClick={() => {
                  if(onClick) onClick();
                  closeModal();
                }}
              >
                Yes
              </button>
            </div>
            <div className="p-1">
              <button
                onClick={() => {closeModal()}}
                className="bg-secondary hover:bg-secondary-light"
              >
                No
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  ,document.getElementById('modal_container'));
}

export const clearLoading = () => {
  closeModal();
}

export const showLoadingMessage = ({content}) => {

  ReactDOM.render(
    <div className="fixed inset-0 z-50 overflow-auto flex" style={{ backgroundColor: "#70707022" }}>
      <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg">
        <div>
          <LoadingPage />
          {content ? <div className="py-5 text-center">{content}</div> : null}
        </div>
      </div>
    </div>
  ,document.getElementById('modal_container'))
}