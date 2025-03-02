import React from 'react'
import InputField from '../../atoms/InputField/InputField';

function UserDetailsForm({user, setUser, verified = false}) {
    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
    };

  return (
    <div>
        {
            !!verified && (
                <h1 style={{ textAlign: 'center' }}>
                    {user.isVerified ? "✅ This user is verified!" : "❌ This user is not verified"}
                </h1>
            )
        }
        <div>
            <label>Full Name:</label>
            <InputField type="text" name='fullName' value={user.fullName} onChange={handleChange} />

            <label>Email Address:</label>
            <InputField type="email" name='emailAddress' value={user.emailAddress} onChange={handleChange} />

            <label>Contact Number:</label>
            <InputField type="number" name='contactNumber' value={user.contactNumber} onChange={handleChange} />

            <label>Position:</label>
            <InputField type="text" name='position' value={user.position} onChange={handleChange} readOnly />
        </div>
    </div>
  )
}

export default UserDetailsForm