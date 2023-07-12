import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { setSetting } from "app/store/modal.slice";
import { RootState } from "app/store";

Modal.setAppElement("body");

const ModalSetting = () => {
  const dispatch = useDispatch();
  const setting = useSelector((state: RootState) => state.modal.setting);

  return (
    <Modal
      id="Setting"
      isOpen={setting}
      onRequestClose={() => {
        dispatch(setSetting(false));
      }}
      className="modal-fade modal-content text-sm md:text-base"
      overlayClassName="bg-[rgba(14,18,36,.7)] fixed w-full h-full top-0 left-0 backdrop-blur-xl z-50"
      contentLabel="Deposit"
    >
      Settings
    </Modal>
  );
};

export default ModalSetting;
