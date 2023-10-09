import Select, { StylesConfig, components } from 'react-select';
import chroma from "chroma-js";
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SelectColorEdit = ({ bgColor, setBgColor }) => {
    const [ isMenuOpen, setIsMenuOpen ] = useState(false);
    const colorOptions = [ 
        { value: '#ff89bb', label: 'Barbie', color: '#ff89bb' },
        { value: '#BA68C8', label: 'Scorpio', color: '#BA68C8' },
        { value: '#FFD54F', label: 'Leo', color: '#FFD54F' },
        { value: '#4FC3F7', label: 'Gemini', color: '#4FC3F7' },
        { value: '#AED581', label: 'Taurus', color: '#AED581' },
        { value: '#f25c54', label: 'Chronos', color: '#f25c54' }
    ];
    const dot = (color = 'transparent') => ({
        alignItems: 'center',
        display: 'flex',

        ':before': {
            backgroundColor: color,
            borderRadius: 20,
            content: '" "',
            display: 'block',
            marginRight: 8,
            height: 15,
            width: 15,
        },
    });
    const colourStyles = {
        menu: (styles) => ({
            ...styles,
            position: 'absolute', 
            zIndex: 9999,
            // marginTop: 0,
            borderRadius: 15,
            fontWeight: 'bold',
            backgroundColor: '#161a1d'
        }),
        control: (styles) => ({ ...styles, borderRadius: 15, paddingLeft: 20 }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            const color = chroma(data.color);
            return {
                ...styles,
                backgroundColor: isDisabled
                    ? undefined
                    : isSelected
                        ? data.color
                        : isFocused
                            ? color.alpha(0.2).css()
                            : undefined,
                color: isDisabled
                    ? '#ccc'
                    : isSelected
                        ? chroma.contrast(color, 'white') > 1
                            ? 'white'
                            : 'black'
                        : data.color,
                    borderRadius: 10,
                cursor: isDisabled ? 'not-allowed' : 'default',

                ':active': {
                    ...styles[':active'],
                    backgroundColor: !isDisabled
                        ? isSelected
                            ? data.color
                            : color.alpha(0.3).css()
                        : undefined,
                },
            };
        },
        input: (styles) => ({ ...styles, ...dot() }),
        placeholder: (styles) => ({ ...styles, ...dot('#ccc') }),
        singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
    };

    const handleOpenMenu = () => {
        setIsMenuOpen(true);
    }
    const handleCloseMenu = () => {
        setIsMenuOpen(false);
    }
    useEffect(() => {
        if (isMenuOpen) {
            let MenuScroll = document.querySelector(".selectColor");
            MenuScroll.style.marginBottom = "240px"
            window.scroll({ top: document.body.scrollHeight, behavior: "smooth" })
        } else if (isMenuOpen === false) {
            let MenuScroll = document.querySelector(".selectColor");
            MenuScroll.style.marginBottom = "20px";
            window.scroll({ top: document.body.scrollHeight, behavior: "smooth" });
        };
    }, [isMenuOpen])
    return (
        <>
            <div style={{ padding: "10px 10px 10px 40px", marginTop: "20px", backgroundColor: "#f56565", borderRadius: "20px" }}>
                <h3>Pilih warna dengan tekan <strong style={{ color: "#333" }}>panah</strong> atau <strong style={{ color: "#333" }}>cari</strong></h3>
            </div>
            <motion.div
                className="selectColor"
                onClick={() => handleOpenMenu()}
                onBlur={() => handleCloseMenu()}
            >
                <Select
                    options={colorOptions}
                    className='selectColor'
                    value={colorOptions.find((options) => options.value === bgColor)}
                    onChange={(e) => setBgColor(e.value)}
                    styles={colourStyles}
                    placeholder="Buat warna notemu"
                    components={{
                        // Menggunakan AnimatePresence untuk mengendalikan opsi yang muncul atau menghilang
                        Menu: ({ children, ...rest }) => (
                            <AnimatePresence>
                                {isMenuOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ 
                                            type: "spring",
                                            stiffness: 300,
                                        }}
                                    >
                                        <components.Menu {...rest}>{children}</components.Menu>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        ),
                    }}
                />
            </motion.div>
        </>
    );
}

export default SelectColorEdit;