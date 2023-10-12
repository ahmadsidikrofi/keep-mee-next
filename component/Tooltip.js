import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Icon } from '@iconify/react';

const toolTipVariants = {
    'hidden': { y: 150, opacity: 0 },
    'visible': { 
        y: 0, 
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 120
        }
    },
}

const Tooltip = ({ isTooltipVisible, setIsTooltipVisible, handleDeleteButton }) => {
    const handleCloseToolTip = (e) => {
        const tooltip = document.querySelector('.tooltip');
        tooltip.style.visibility = 'hidden';
        e.preventDefault();
        setIsTooltipVisible(false);
    }

    return (
        <motion.div className="tooltip"
            variants={toolTipVariants}
            initial="hidden"
            animate={isTooltipVisible ? "visible" : "hidden"}
        >
            <div className='tooltipBody'>
                <button className="tooltipBtn"
                    onClick={handleDeleteButton}>Hapus</button>
                <Icon icon="material-symbols:close" onClick={handleCloseToolTip} className="closeTooltip" />
            </div>
        </motion.div>
    )
}

export default Tooltip;