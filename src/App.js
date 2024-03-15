import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State variables
  const [facilities, setFacilities] = useState([]);
  const [facilityName, setFacilityName] = useState('');
  const [mflCode, setMflCode] = useState('');
  const [level, setLevel] = useState('');
  const [location, setLocation] = useState('');

  // Fetch facilities from server when component mounts
  useEffect(() => {
    fetchFacilities();
  }, []);

  // Fetch facilities from server
  const fetchFacilities = () => {
    fetch('/registry')
      .then(response => response.json())
      .then(data => setFacilities(data))
      .catch(error => console.error('Error fetching facilities:', error));
  };

  // Handle adding a new facility
  const handleAddFacility = (event) => {
    event.preventDefault();
    fetch('/registry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ facility_name: facilityName, mfl_code: mflCode, level: level, location: location })
    })
      .then(() => {
        fetchFacilities(); // Fetch updated list of facilities
        setFacilityName(''); // Clear input fields
        setMflCode('');
        setLevel('');
        setLocation('');
      })
      .catch(error => console.error('Error adding facility:', error));
  };

  // Handle deleting a facility
  const handleDeleteFacility = (facilityId) => {
    fetch(`/registry/${facilityId}`, {
      method: 'DELETE'
    })
      .then(() => {
        fetchFacilities(); // Fetch updated list of facilities
      })
      .catch(error => console.error('Error deleting facility:', error));
  };

  // Handle updating a facility
  const handleUpdateFacility = (evt, facilityId) => {
    evt.preventDefault();
    // Implement your update logic here
    console.log(`Update facility with ID: ${facilityId}`);
  };

  // Handle searching for facilities
  const handleSearchFacilities = (event) => {
    event.preventDefault();
    // Implement your search logic here
    console.log('Search facilities');
  };

  return (
    <div className="App">
      <h1>Facility Registry</h1>
      {/* Form to add a new facility */}
      <form onSubmit={handleAddFacility}>
        <input type="text" value={facilityName} onChange={e => setFacilityName(e.target.value)} placeholder="Facility Name" required />
        <input type="text" value={mflCode} onChange={e => setMflCode(e.target.value)} placeholder="MFL Code" required />
        <input type="text" value={level} onChange={e => setLevel(e.target.value)} placeholder="Level" required />
        <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="Location" required />
        <button type="submit">Add Facility</button>
      </form>
      {/* List of facilities */}
      <ul>
        {facilities.map(facility => (
          <li key={facility.facility_id}>
            {facility.facility_name} - MFL Code: {facility.mfl_code} - Level: {facility.level} - Location: {facility.location}
            {/* Form for updating a facility */}
            <form onSubmit={(event) => handleUpdateFacility(event, facility.facility_id)}>
              <input type="text" placeholder="New Facility Name" required />
              <input type="text" placeholder="New MFL Code" required />
              <input type="text" placeholder="New Level" required />
              <input type="text" placeholder="New Location" required />
              {/* <button type="submit">Update</button> */}
             < button onClick={() => handleUpdateFacility(facility.facility_id)}>Update</button>
            <button onClick={() => handleDeleteFacility(facility.facility_id)}>Delete</button>
            </form>
            {/* Update and Delete buttons outside the form */}
            

          </li>
        ))}
      </ul>
      {/* Form for searching facilities */}
      <form onSubmit={handleSearchFacilities}>
        <input type="text" placeholder="Search Facility" required />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default App;
