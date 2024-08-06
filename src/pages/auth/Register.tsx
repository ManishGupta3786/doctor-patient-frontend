import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { CustomInput } from "../../components/atoms/Input";
import { Button } from "../../components/atoms/Button";
import { Link } from "react-router-dom";

const Register: React.FC = () => {
  const { error, handleChange, handle_D_Change, handleProfileChange, userRegister, doctorRegister, loading } = useAuth();
  const [role, setRole] = useState('USER');

  const handleRole = (data:string)=>{
    // const {name, value} = e.target;
    // setRole(value);
    // data==='USER'?console.log("user"):console.log('doctor');
    data === 'USER' ? handleChange('role', data) : handle_D_Change('role', data)
  }
  return (
    <div className="my-auto">
      <h3 className="text-[30px] font-bold leading-[44.8px] mt-2 text-center">
        Sign Up
      </h3>
      <div style={{ textAlign: 'center' }}><h1>Please select your role first</h1></div>
      <div className="flex items-center space-x-4" style={{ display: 'flex', justifyContent: 'center' }}>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="role"
            value="USER"
            // checked={selectedRole === 'patient'}
            onChange={(e)=>{setRole(e.target.value); handleRole('USER')}}
            className="form-radio text-blue-600 h-5 w-5"
          />
          <span className="text-lg">Patient</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="role"
            value="DOCTOR"
            // checked={selectedRole === 'doctor'}
            onChange={(e)=>{setRole(e.target.value); handleRole('DOCTOR')}}
            // onChange={(e) => { setRole('DOCTOR'); role === 'USER' ? handleChange('role', e.target.value) : handle_D_Change('role', e.target.value) }}
            className="form-radio text-blue-600 h-5 w-5"
          />
          <span className="text-lg">Doctor</span>
        </label>
      </div>
      {role === 'USER' ? (
        <div className="space-y-[1rem]">
          <CustomInput
            onChange={(e) => { handleChange('name', e.target.value) }}
            error={error?.name}
            // value={form?.name}
            label="Full name"
            placeholder="Enter full name"
          />
          <CustomInput
            onChange={(e) => { handleChange('email', e.target.value) }}
            error={error?.email}
            // value={form?.email}
            label="Email address"
            placeholder="Enter email address"
          />
          <CustomInput
            onChange={(e) => { handleChange('phoneNo', e.target.value) }}
            error={error?.phoneNo}
            // value={form?.phoneNo}
            label="Phone number"
            placeholder="Enter your phone number"
          />
          <CustomInput
            onChange={(e) => { handleChange('password', e.target.value) }}
            error={error?.password}
            // value={form?.password}
            label="Password"
            placeholder="Enter your password"
            type="password"
          />
          <Button
            label={loading ? "Please wait..." : "Sign Up"}
            isDisabled={loading}
            activeClass
            onClick={userRegister}
          />
        </div>
      ) : (
        <div className="space-y-[1rem]">
          <CustomInput
            onChange={(e) => { handle_D_Change('name', e.target.value) }}
            error={error?.name}
            // value={ doctorForm?.name}
            label="Full name"
            placeholder="Enter full name"
          />
          <CustomInput
            onChange={(e) => { handle_D_Change('email', e.target.value) }}
            error={error?.email}
            // value={doctorForm?.email}
            label="Email address"
            placeholder="Enter email address"
          />
          <CustomInput
            onChange={(e) => { handle_D_Change('phoneNo', e.target.value) }}
            error={error?.phoneNo}
            // value={doctorForm?.phoneNo}
            label="Phone number"
            placeholder="Enter your phone number"
          />
          <CustomInput
            onChange={(e) => { handle_D_Change('password', e.target.value) }}
            error={error?.password}
            // value={doctorForm?.password}
            label="Password"
            placeholder="Enter your password"
            type="password"
          />
          <div style={{ marginBottom: '-14px' }}>About</div>
          <div>
            <textarea
              id="description"
              name="description"
              // value={doctorForm?.about}
              onChange={(e) => handle_D_Change('about', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your description here..."
            ></textarea>
          </div>
          <div style={{ marginBottom: '-14px' }}>Address</div>
          <div>
            <input
              type="text"
              id="address"
              name="address"
              // value={doctorForm?.address}
              onChange={(e) => handle_D_Change('address', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your address"
            />
          </div>
          <div style={{ marginBottom: '-14px' }}>Qualification</div>
          <div>
            <input
              type="text"
              id="qualification"
              name="qualification"
              // value={doctorForm?.profileInfo.qualification}
              onChange={(e) => handleProfileChange("qualification", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your qualification"
            />
          </div>
          <div style={{ marginBottom: '-14px' }}>
            Years of Experience
          </div>
          <div>
            <input
              type="number"
              id="experience"
              name="experience"
              // value={doctorForm?.profileInfo.experience}
              onChange={(e) => handleProfileChange('experience', e.target.value)}
              min="0"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your experience in years"
            />
          </div>
          <div style={{ marginBottom: '-14px' }}>Specialty</div>
          <div>
            <input
              type="text"
              id="specialty"
              name="specialty"
              // value={doctorForm?.specialty}
              onChange={(e) => handle_D_Change('specialty', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your specialty"
            />
          </div>
          <div style={{ marginBottom: '-14px' }}>
            Success rate
          </div>
          <div>
            <input
              type="number"
              id="successRate"
              name="successRate"
              // value={doctorForm?.profileInfo.successRate}
              onChange={(e) => handleProfileChange('successRate', parseInt(e.target.value))}
              min="0"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your success rate"
            />
          </div>
          <div style={{ marginBottom: '-14px' }}>
            Patient story
          </div>
          <div>
            <input
              type="number"
              id="patientStories"
              name="patientStories"
              // value={doctorForm?.profileInfo.patientStories}
              onChange={(e) => handleProfileChange('patientStories', parseInt(e.target.value))}
              min="0"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your patient story"
            />
          </div>
          <div style={{ marginBottom: '-14px' }}>
            Rating
          </div>
          <div>
            <input
              type="number"
              id="rating"
              name="rating"
              // value={doctorForm?.profileInfo.ratings}
              onChange={(e) => handleProfileChange("ratings", parseFloat(e.target.value))}
              min="0"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your rating"
            />
          </div>
          <Button
            label={loading ? "Please wait..." : "Sign Up"}
            isDisabled={loading}
            activeClass
            onClick={doctorRegister}
          />
        </div>
      )}
      <p className="mt-2 text-center">
        Already have an account{" "}
        <Link to="/login" className="text-[#1818A6]">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
