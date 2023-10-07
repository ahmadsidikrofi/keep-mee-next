import Select, { StylesConfig } from 'react-select';
import chroma from "chroma-js";

const SelectColorEdit = ({ bgColor, setBgColor }) => {
    const colorOptions = [
        { value: '#F06292', label: 'Pink', color: '#F06292' },
        { value: '#BA68C8', label: 'Purple', color: '#BA68C8' },
        { value: '#FFD54F', label: 'Yellow', color: '#FFD54F' },
        { value: '#4FC3F7', label: 'Blue', color: '#4FC3F7' },
        { value: '#AED581', label: 'Green', color: '#AED581' },
    ];
    const dot = (color = 'transparent') => ({
        alignItems: 'center',
        display: 'flex',

        ':before': {
            backgroundColor: color,
            borderRadius: 10,
            content: '" "',
            display: 'block',
            marginRight: 8,
            height: 10,
            width: 10,
        },
    });
    const colourStyles = {
        control: (styles) => ({ ...styles, backgroundColor: '#eaeaea', borderRadius: 15 }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            const color = chroma(data.color);
            return {
                ...styles,
                backgroundColor: isDisabled
                    ? undefined
                    : isSelected
                        ? data.color
                        : isFocused
                            ? color.alpha(0.1).css()
                            : undefined,
                color: isDisabled
                    ? '#ccc'
                    : isSelected
                        ? chroma.contrast(color, 'white') > 2
                            ? 'white'
                            : 'black'
                        : data.color,
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

    return (
        <div className="selectColor">
            <Select
                options={colorOptions}
                value={colorOptions.find((options) => options.value === bgColor)}
                onChange={(e) => setBgColor(e.value)}
                styles={colourStyles}
            />
        </div>
    );
}

export default SelectColorEdit;