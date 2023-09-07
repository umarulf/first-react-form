import React, { useState } from 'react';
import List from './list'



const valuesOne = ["Supports ","Axis and HDFC bank cards only"]
const valuesTwo = ["Supports","All VISA and RUPAY cards"]


function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    brand: '',
    modelInterested: '',
    dealer: '',
    preferredDate: '',
  });

 const [savedId, setSavedId] = useState(null);
 const [data, setData] = useState({});
 
 

 const handleChange = (event) => {
  const { name, value} = event.target;
  setFormData((prevData) => ({
   ...prevData,
  [name]: value
  }));
 };

 const handleSubmit = async (event) => {
  event.preventDefault();

  try {
   const response = await fetch('http://localhost:5500/submit', {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  });
  
   if (!response.ok) {
    throw new Error('Error saving form data');
   }

 const data = await response.json();
 setSavedId(data.id);
 console.log(data);

 } catch (error) {
console.error('An error occurred:', error);
 }
 };



 const handleViewClick = async () => {
 if (savedId) {
 try {
    const response = await fetch(`http://localhost:5500/data?id=${savedId}`);
    
 const fetchedData = await response.json();
 setData(fetchedData);
 console.log(fetchedData);

 } catch (error) {
  console.error('Error fetching data:', error);
  }
 }
 };


  return (


    
    
    <div>
      <div>
        <List />
      
      </div>
      <h2>Schedule a Test Drive</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Mobile Number:</label>
          <input
            type="tel"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Brand:</label>
          <select name="brand" value={formData.carModel} onChange={handleChange} required>
            <option value="">Select car brand</option>
         
            <option value="Brand">Honda</option>
            
          </select>
        </div>
        <div>
          <label>Model Interested:</label>
          <select
            name="modelInterested"
            value={formData.modelInterested}
            onChange={handleChange}
            required
          >
            <option value="">Select a model</option>
            <option value="Model X">Honda City</option>
            <option value="Model Y">Honda Amaze</option>
            <option value="Model Z">Honda Elevate</option>
          </select>
        </div>
        <div>
          <label>Dealer:</label>
          <select name="dealer" value={formData.dealer} onChange={handleChange} required>
            <option value="">Select a dealer</option>
            <option value="Dealer A">Jhons Honda</option>
            <option value="Dealer B">Srivari Honda</option>
            <option value="Dealer C">Uniride Honda</option>
          </select>
        </div>
        <div>
          <label>Preferred Date:</label>
          <input
            type="date"
            name="preferredDate"
            value={formData.preferredDate}
            onChange={handleChange}
            required
          />
        </div>
        <label>Select Your Payment Method:</label>
        <div>
          <List heading = "Credit card" values = {valuesOne} />
          <List heading = "Debit card"  values = {valuesTwo} />
      
        </div>  
        <button type="submit">Pay and Schedule Test Drive</button>
      </form>
        {savedId && <p>Form Data saved with ID: {savedId}</p>}
        <button onClick={handleViewClick} disabled={!savedId} >View Data</button>
        {Object.entries(data).length > 0 && (
          <div>
            <h2>Fetched Data:</h2>
            <ul>
              {Object.entries(data).map(([key, value]) => (
                <li key={key}>
                  {key}: {value}
                </li>
              ))}
            </ul>
          </div>
        )}
   
        
        
       
    </div>
   
     
    
      
     
    
  );
}

export default App;