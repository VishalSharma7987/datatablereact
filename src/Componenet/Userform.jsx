import { useState } from "react";
import PropTypes from "prop-types";
import "./UserForm.css"; // Adjust the import path accordingly

const UserForm = ({ user, isEditing, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    username: `USER-${user?.username || ''}`,
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    companyName: user?.company?.name || '',
    website: user?.website || '',
  });
  
  const [error, setError] = useState(''); // State for error message

  // Handle changes to form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError(''); // Clear error message when input changes
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    const { name, email, phone, street, city, companyName } = formData;
    if (!name || !email || !phone || !street || !city || !companyName ) {
      setError("Please fill in all required fields."); // Set error message
      return; // Stop the submission if fields are missing
    }

    // Call the onSubmit prop to handle user creation
    onSubmit(formData);
    setFormData({ // Clear the form after submission
      name: '',
      email: '',
      phone: '',
      username: `USER-`,
      street: '',
      city: '',
      companyName: '',
      website: '',
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        readOnly
      />
      <input
        type="text"
        name="street"
        placeholder="Street"
        value={formData.street}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="companyName"
        placeholder="Company Name"
        value={formData.companyName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="website"
        placeholder="Website-url"
        value={formData.website}
        onChange={handleChange}
        
      />
      {error && <p className="error-message">{error}</p>} {/* Display error message */}
      <button className="button" type="submit">{isEditing ? 'Update' : 'Create'} User</button>
    </form>
  );
};

// Define PropTypes for the component
UserForm.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    username: PropTypes.string,
    address: PropTypes.shape({
      street: PropTypes.string,
      city: PropTypes.string,
    }),
    company: PropTypes.shape({
      name: PropTypes.string,
    }),
    website: PropTypes.string,
  }),
  isEditing: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

// Set default values for props if necessary
UserForm.defaultProps = {
  user: {},
};

export default UserForm;
