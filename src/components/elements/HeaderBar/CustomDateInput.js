import { divide } from 'lodash';
import React, { forwardRef } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const CustomDateInput = forwardRef(({ value, onClick }, ref) => (
    <div className="date-ip" onClick={onClick} ref={ref}>
      <p>{value}</p>
      <ExpandMoreIcon className="svg-icon"/>
    </div>
  ));

export default CustomDateInput
