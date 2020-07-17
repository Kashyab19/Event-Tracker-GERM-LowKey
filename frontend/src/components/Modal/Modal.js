import React from 'react';
import './Modal.css';
import {Modal,Button} from 'react-bootstrap';

const modal = props => (
  <div>
    <Modal.Dialog id="dialog-box">
      <Modal.Header>
        <header className="modal__header">
          <h5>{props.title}</h5>
        </header>
        </Modal.Header>

      <Modal.Body>
          <h3 className="modal__content">{props.children}</h3>
              {props.canCancel && (
                <Button  variant="secondary" onClick={props.onCancel}>
                  Cancel
                </Button>
              )}

              {props.canConfirm && (
                <Button  variant="primary" onClick={props.onConfirm}>
                 {props.confirmText}
                </Button>
              )}
    </Modal.Body>
    </Modal.Dialog>
  </div>
  
);

export default modal;