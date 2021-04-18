import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'

import HeaderBar from '../../components/elements/HeaderBar/HeaderBar'
import CategoryMenu from '../../components/elements/CategoryMenu/CategoryMenu'

const FixedHeader = (props) => {
    const [selectedDropdownDate, setSelectedDropdownDate] = useState(1617985941);
    const [detailView, setDetailView] = useState(false);
    const [mainMenuOpen, setMainMenuOpen] = useState(false);

    const history = useHistory();
    return (
        <div className="fixed-container">
            <HeaderBar openHome={() => history.push("/")}
                openMenu={() => setMainMenuOpen(true)}
                openDateMenu={() => setMainMenuOpen(true)}
                selectedDropdownDate={selectedDropdownDate}
                datePickerVisible={detailView ? false : true}
                userLoggedIn={props.userLoggedIn}
                userImage={props.userDetails.image}
                userImageVisible={true} />
        </div>
    )
};

export default FixedHeader;