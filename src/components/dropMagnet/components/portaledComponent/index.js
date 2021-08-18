import { createPortal } from 'react-dom';

const PortaledComponent = ({modal}) => {
    const portalElement = document.querySelector('#portal');
    return (portalElement && createPortal(modal, portalElement)) || null;
}

export default PortaledComponent;