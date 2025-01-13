import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BloodTestReport = () => {
  const [data, setData] = useState(null);  // Store data from Flask
  const [loading, setLoading] = useState(true);  // Loading state

  useEffect(() => {
    // Fetch data from Flask API
    axios.get('http://127.0.0.1:5000/api/blood-test-report')
      .then(response => {
        setData(response.data);
        setLoading(false);  // Set loading to false when data is fetched
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);  // Set loading to false even if there's an error
      });
  }, []);

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  const { bloodTestData, diseases } = data;

  // Function to determine the risk color for diseases
  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'low':
        return 'bg-green-200 text-green-700';
      case 'medium':
        return 'bg-yellow-200 text-yellow-700';
      case 'high':
        return 'bg-red-200 text-red-700';
      default:
        return '';
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-12">Blood Test Report</h1>
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-100">
              {bloodTestData.map((test, index) => (
                <th key={index} className="border border-gray-300 px-6 py-2 text-left text-blue-600">
                  {test.name}
                </th>
              ))}
              <th className="border border-gray-300 px-6 py-2 text-left text-blue-600">Disease</th>
            </tr>
          </thead>
          <tbody>
            {bloodTestData[0].values.map((_, index) => (
              <tr key={index} className="hover:bg-gray-100">
                {bloodTestData.map((test, testIndex) => (
                  <td key={testIndex} className="border border-gray-300 px-6 py-2">
                    {test.values[index]}
                  </td>
                ))}
                <td className={`border border-gray-300 px-6 py-2 font-bold ${getRiskColor(diseases[index].riskLevel)}`}>
                  {diseases[index].name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default BloodTestReport;
