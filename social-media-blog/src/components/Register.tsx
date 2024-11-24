import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface RegisterProps {
  onRegister: (userData: {
    username: string;
    email?: string;
    phone?: string;
    password: string;
  }) => void;
  onToggleLogin: () => void;
}

function Register({ onRegister, onToggleLogin }: RegisterProps) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [contactMethod, setContactMethod] = useState<'email' | 'phone'>('email');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    // Contact method validation
    if (contactMethod === 'email') {
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }
    } else {
      if (!formData.phone) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
        newErrors.phone = 'Please enter a valid phone number';
      }
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        await onRegister({
          username: formData.username,
          email: contactMethod === 'email' ? formData.email : undefined,
          phone: contactMethod === 'phone' ? formData.phone : undefined,
          password: formData.password,
        });
      } catch (err) {
        setErrors({ submit: 'Registration failed. Please try again.' });
      }
    }
  };

  return (
    <motion.div 
      className="register-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="register-card">
        <h1>Create Account</h1>
        <p className="register-subtitle">Join our community today</p>

        {errors.submit && <div className="error-message">{errors.submit}</div>}

        <form onSubmit={handleSubmit} className="register-form">
          {/* Username field */}
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              placeholder="Username"
              required
            />
            {errors.username && <div className="error-message">{errors.username}</div>}
          </div>

          {/* Contact method selection */}
          <div className="form-group">
            <label htmlFor="contact-method">Contact Method</label>
            <select
              id="contact-method"
              name="contact-method"
              value={contactMethod}
              onChange={(e) => setContactMethod(e.target.value as 'email' | 'phone')}
              required
            >
              <option value="email">Email</option>
              <option value="phone">Phone</option>
            </select>
          </div>

          {/* Email or phone field */}
          {contactMethod === 'email' && (
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Email"
                required
              />
              {errors.email && <div className="error-message">{errors.email}</div>}
            </div>
          )}

          {contactMethod === 'phone' && (
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Phone"
                required
              />
              {errors.phone && <div className="error-message">{errors.phone}</div>}
            </div>
          )}

          {/* Password fields */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Password"
              required
            />
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              placeholder="Confirm Password"
              required
            />
            {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
          </div>

          <button type="submit" className="register-button">Register</button>
        </form>

        <p className="register-login-link" onClick={onToggleLogin}>
          Already have an account? Login
        </p>
      </div>
    </motion.div>
  );
}

export default Register; 