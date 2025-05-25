import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Form.module.css';

const countries = {
  India: ['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad'],
  USA: ['New York', 'San Francisco', 'Chicago'],
  UK: ['London', 'Manchester', 'Liverpool'],
};

export default function Form() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phone: '',
    country: '',
    city: '',
    pan: '',
    aadhar: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    let error = '';
    switch (name) {
      case 'email':
        if (!/\S+@\S+\.\S+/.test(value)) error = 'Invalid email';
        break;
      case 'phone':
        if (!/^\+\d{1,3}\d{10}$/.test(value)) error = 'Phone must be like +91XXXXXXXXXX';
        break;
      case 'password':
        if (value.length < 6) error = 'Minimum 6 characters';
        break;
      case 'pan':
        if (!/[A-Z]{5}[0-9]{4}[A-Z]/.test(value)) error = 'Invalid PAN format';
        break;
      case 'aadhar':
        if (!/^\d{12}$/.test(value)) error = 'Aadhar must be 12 digits';
        break;
      default:
        if (!value) error = `${name} is required`;
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const hasErrors = Object.values(errors).some((err) => err !== '');
    const hasEmpty = Object.values(formData).some((val) => val === '');

    if (!hasErrors && !hasEmpty) {
      navigate('/success', { state: formData });
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <h2>Registration Form</h2>

        {[
          ['First Name', 'firstName'],
          ['Last Name', 'lastName'],
          ['Username', 'username'],
          ['Email', 'email'],
        ].map(([label, name]) => (
          <div className={styles.inputGroup} key={name}>
            <label>{label}</label>
            <input
              name={name}
              value={formData[name]}
              onChange={handleChange}
              placeholder={`Enter ${label}`}
              required
            />
            {errors[name] && <span className={styles.error}>{errors[name]}</span>}
          </div>
        ))}

        <div className={styles.inputGroup}>
          <label>Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter Password"
            required
          />
          <button
            type="button"
            className={styles.toggleBtn}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
          {errors.password && <span className={styles.error}>{errors.password}</span>}
        </div>

        <div className={styles.inputGroup}>
          <label>Phone No. (+Country Code)</label>
          <input
            name="phone"
            placeholder="+91XXXXXXXXXX"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          {errors.phone && <span className={styles.error}>{errors.phone}</span>}
        </div>

        <div className={styles.inputGroup}>
          <label>Country</label>
          <select name="country" value={formData.country} onChange={handleChange} required>
            <option value="">Select Country</option>
            {Object.keys(countries).map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {errors.country && <span className={styles.error}>{errors.country}</span>}
        </div>

        <div className={styles.inputGroup}>
          <label>City</label>
          <select name="city" value={formData.city} onChange={handleChange} required>
            <option value="">Select City</option>
            {(countries[formData.country] || []).map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {errors.city && <span className={styles.error}>{errors.city}</span>}
        </div>

        {[
          ['PAN Number', 'pan'],
          ['Aadhar Number', 'aadhar'],
        ].map(([label, name]) => (
          <div className={styles.inputGroup} key={name}>
            <label>{label}</label>
            <input
              name={name}
              placeholder={`Enter ${label}`}
              value={formData[name]}
              onChange={handleChange}
              required
            />
            {errors[name] && <span className={styles.error}>{errors[name]}</span>}
          </div>
        ))}

        <button
          className={styles.submitBtn}
          type="submit"
          disabled={
            Object.values(formData).some((val) => val === '') ||
            Object.values(errors).some((err) => err !== '')
          }
        >
          Submit
        </button>
      </form>
    </div>
  );
}
