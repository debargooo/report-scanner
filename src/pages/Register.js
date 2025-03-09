import { useState } from "react";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dob: "",
    age: "",
    gender: "",
    contact: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = "";
    if (name === "name" && (!value || value.trim().length < 3)) {
      error = "Name must be at least 3 characters long.";
    } else if (name === "email" && (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))) {
      error = "Please enter a valid email address.";
    } else if (name === "password" && (!value || value.length < 8 || !/(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(value))) {
      error = "Password must be at least 8 characters long, include an uppercase letter, a number, and a special character.";
    } else if (name === "confirmPassword" && value !== formData.password) {
      error = "Passwords do not match.";
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const isFormValid = () => {
    return Object.values(errors).every((error) => !error) &&
           Object.values(formData).every((value) => value.trim() !== "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    
    if (!isFormValid()) {
      return;
    }
    
    try {
      const response = await fetch("http://127.0.0.1:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage("Registration successful!");
        setFormData({ name: "", email: "", dob: "", age: "", gender: "", contact: "", password: "", confirmPassword: "" });
        setErrors({});
      } else {
        setErrors({ form: result.message || "Registration failed." });
      }
    } catch (error) {
      setErrors({ form: "An error occurred. Please try again later." });
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      {errors.form && <p className="text-red-500 mb-2">{errors.form}</p>}
      {successMessage && <p className="text-green-500 mb-2">{successMessage}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="p-2 border rounded" />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="p-2 border rounded" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="p-2 border rounded" />
        
        <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} className="p-2 border rounded" />
        
        <select name="gender" value={formData.gender} onChange={handleChange} className="p-2 border rounded">
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        
        <input type="text" name="contact" placeholder="Contact" value={formData.contact} onChange={handleChange} className="p-2 border rounded" />
        
        <div className="relative">
          <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="p-2 border rounded w-full" />
          <button type="button" className="absolute right-2 top-2 text-sm" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} className="p-2 border rounded" />
        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}

        <button type="submit" className="p-2 bg-blue-500 text-white rounded" disabled={!isFormValid()}>Register</button>
      </form>
    </div>
  );
}
