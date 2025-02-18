import React, { useState } from 'react'
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import FormField from '../../molecules/FormField/FormField';
import CityAutocomplete from '../../../testing/CityAutoComplete';

const ModalForm = ({title, onClose, onSubmit, fields}) => {
    const [formData, setFormData] = useState(
        fields.reduce((acc, field) => {
        acc[field.name] = '';
        return acc;
        }, {})
    );

    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = () => {
        onSubmit(formData);
        onClose();
    };

  return (
    // <Modal title={title} onClose={onClose} onSave={handleSubmit}>
    //     {/* {
    //         fields.map((field, index) => (
    //             <FormField
    //                 key={index}
    //                 label={field.label}
    //                 type={field.type}
    //                 name={field.name}
    //                 value={formData[field.name]}
    //                 onChange={handleChange}
    //             />
    //         ))
    //     } */}

    //     {
    //         fields.map((field, index) => {
    //             if (field.section) {
    //                 return (
    //                     <h3 key={index} className="form-section">
    //                         {field.section}
    //                     </h3>
    //                 );
    //             } else {
    //                 return (
    //                     <FormField
    //                         key={index}
    //                         label={field.label}
    //                         type={field.type}
    //                         name={field.name}
    //                         value={formData[field.name]}
    //                         onChange={handleChange}
    //                     />
    //                 );
    //             }
    //         })
    //     }
    // </Modal>

    <Modal title={title} onClose={onClose} onSave={handleSubmit}>
        {
            fields.map((field, index) => {
                if (field.section) {
                    return <h3 key={index} className="form-section">{field.section}</h3>;
                } else if (field.type === 'autocomplete') {
                    //hndle city autocomplete separately
                    return (
                        <CityAutocomplete
                            key={index}
                            label={field.label}
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleChange}
                        />
                    )
                } else {
                    //render normal fields
                    return (
                        <FormField
                            key={index}
                            label={field.label}
                            type={field.type}
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleChange}
                        />
                    )
                }
            })
        }
    </Modal>
  )
}

ModalForm.propTypes = {
    title: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    fields: PropTypes.arrayOf(
        PropTypes.shape({
        name: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        section: PropTypes.string, 
        })
    ).isRequired,
}

export default ModalForm
