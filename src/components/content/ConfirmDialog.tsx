import React, { ReactElement, ReactNode, useState } from "react";
import {
    Button,
    Modal,
} from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";

export const useConfirmDialog = (
    props: ConfirmDialogProps
): [() => void, () => ReactElement] => {
    const [show, setShow] = useState(false);

    function toggleDialog() {
        setShow((show) => !show);
    }

    const Dialog = () => (
        <ConfirmDialogModal
            key="confirmDialog"
            {...props}
            open={show}
            toggleDialog={toggleDialog}
        />
    );
    return [toggleDialog, Dialog];
};


export type ButtonVariant = 'info'
| 'primary'
| 'secondary'
| 'success'
| 'danger'
| 'warning'
| 'dark'
| 'light'
| 'link'
| 'outline-primary'
| 'outline-secondary'
| 'outline-success'
| 'outline-danger'
| 'outline-warning'
| 'outline-info'
| 'outline-dark'
| 'outline-light';



export interface ConfirmDialogModalProps extends ConfirmDialogProps {
    open: boolean;
    toggleDialog: () => void;
}

export type ConfirmDialogProps = {
    titleKey: string;
    messageKey?: string;
    cancelButtonLabel?: string;
    continueButtonLabel?: string;
    continueButtonVariant?: ButtonVariant;
    onConfirm: () => void;
    onCancel?: () => void;
    children?: ReactNode;
};

export const ConfirmDialogModal = ({
    titleKey,
    messageKey,
    cancelButtonLabel,
    continueButtonLabel,
    continueButtonVariant,
    onConfirm,
    onCancel,
    children,
    open = true,
    toggleDialog,
}: ConfirmDialogModalProps) => {

    return (
        <Modal
            title={titleKey}
            show={open}
            onHide={toggleDialog}
        //  variant={ModalVariant.small}
        >
            <ModalHeader translate closeButton>

            {titleKey}

            </ModalHeader>
            <Modal.Body>
                {messageKey}
                {!messageKey && children}
            </Modal.Body>

            <Modal.Footer>
            <Button
                    id="modal-cancel"
                    key="cancel"
                     variant="secondary"
                    onClick={() => {
                        if (onCancel) onCancel();
                        toggleDialog();
                    }}
                >
                    {(cancelButtonLabel || "cancel")}
                </Button>

                <Button
                    id="modal-confirm"
                    key="confirm"
                    variant={continueButtonVariant || "info"}
                    onClick={() => {
                        onConfirm();
                        toggleDialog();
                    }}
                >
                    {(continueButtonLabel || "continue")}
                </Button>
                 
            </Modal.Footer>
        </Modal>
    );
};
