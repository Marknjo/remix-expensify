import type { ReactNode } from 'react'

interface IModalProps {
  children: ReactNode
  onClose: () => void
}

function Modal({ children, onClose }: IModalProps) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <dialog className="modal" open onClick={event => event.stopPropagation()}>
        {children}
      </dialog>
    </div>
  )
}

export default Modal
