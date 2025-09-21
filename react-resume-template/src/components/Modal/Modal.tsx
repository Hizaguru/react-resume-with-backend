import React, {useCallback, useEffect, useRef} from 'react';
import {CSSTransition} from 'react-transition-group';
import ReactPortal from './ReactPortal';

type Props = {
  isOpen: boolean;
  children: React.ReactNode;
  handleClose: () => void;
  showCloseButton?: boolean;
  ariaLabel?: string;
};

const Modal: React.FC<Props> = ({isOpen, children, handleClose, showCloseButton = true, ariaLabel}) => {
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  // Close on escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, handleClose]);

  // Scroll lock + restore focus
  useEffect(() => {
    if (isOpen) {
      previousFocus.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';
      // focus after paint
      requestAnimationFrame(() => {
        closeBtnRef.current?.focus();
      });
    } else {
      document.body.style.overflow = '';
      previousFocus.current?.focus?.();
    }
  }, [isOpen]);

  // Simple focus trap
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== 'Tab') return;
    const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
    );
    if (!focusable || focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }, []);

  // Backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) handleClose();
  };

  return (
    <ReactPortal wrapperId="react-portal-container">
      <CSSTransition in={isOpen} timeout={{enter: 250, exit: 300}} unmountOnExit classNames="modal" nodeRef={nodeRef}>
        <div ref={nodeRef} className="modal" onMouseDown={handleBackdropClick} role="presentation">
          <div
            ref={dialogRef}
            className="modal-content"
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel}
            onKeyDown={handleKeyDown}>
            {showCloseButton && (
              <button
                ref={closeBtnRef}
                type="button"
                aria-label="Close modal"
                className="close-btn "
                onClick={handleClose}>
                <span aria-hidden="true">&times;</span>
              </button>
            )}
            {children}
          </div>
        </div>
      </CSSTransition>
    </ReactPortal>
  );
};
export default Modal;
