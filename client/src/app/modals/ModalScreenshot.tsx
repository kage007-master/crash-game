import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { setScreenshot } from "app/store/modal.slice";
import { RootState } from "app/store";

Modal.setAppElement("body");

const ModalScreenshot = () => {
  const dispatch = useDispatch();
  const screenshot: any = useSelector(
    (state: RootState) => state.modal.screenshot
  );
  return (
    <Modal
      id="Screenshot"
      isOpen={!!screenshot}
      onRequestClose={() => {
        dispatch(setScreenshot(null));
      }}
      className="modal-fade modal-content text-sm md:text-base"
      overlayClassName="bg-[rgba(14,18,36,.7)] fixed w-full h-full top-0 left-0 backdrop-blur-xl z-50"
      contentLabel="Sign Up"
    >
      <img alt="screenshot" src={screenshot} id="#screen" className="bg-back" />
      <a
        href={screenshot}
        download={true}
        className="p-4 py-2 bg-border block text-center mt-4 hover:bg-card"
      >
        Download
      </a>
    </Modal>
  );
};

export default ModalScreenshot;
