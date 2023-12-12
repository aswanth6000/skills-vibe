// 'use client'
import { useState, useEffect } from 'react';

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  req?: string;
  phone?: string | number; // Updated to allow both string and number
}

interface FormValidationHook {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  phone: string;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  confirmPassword: string;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  errors: FormErrors;
  isFormValid: boolean;
}

const useFormValidation = (): FormValidationHook => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errors, setErrors] = useState<FormErrors>({ req: '' });
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>(''); // Changed to string

  const validateForm = (): void => {
    let newErrors: FormErrors = {
      req: '',
    };

    if (!name) {
      newErrors.req = 'Name is required.';
    } else if (name.length < 1 || name.length > 30) {
      newErrors.name = 'Name must be between 1 and 30 characters.';
    } else if (!/^[a-zA-Z0-9._]+$/.test(name)) {
      newErrors.name = 'Name can only contain letters, numbers, periods, and underscores.';
    }

    if (!email) {
      newErrors.req = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid.';
    }

    if (!password) {
      newErrors.req = 'Password is required.';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }
    if (!confirmPassword) {
      newErrors.req = '';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords not matching';
    }
    if (!phone) {
      newErrors.req = '';
    } else if (!/^[789]\d{9}$/.test(phone)) {
      newErrors.phone = 'Phone number is not valid';
    }

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  useEffect(() => {
    validateForm();
  }, [name, email, password, confirmPassword, phone]);

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    errors,
    isFormValid,
    confirmPassword,
    setConfirmPassword,
    phone,
    setPhone,
  };
};

export default useFormValidation;
