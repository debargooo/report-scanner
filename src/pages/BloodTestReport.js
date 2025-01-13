import React from 'react';

const BloodTestReport = () => {
  // Data for blood test
  const bloodTestData = [
    { name: 'Glucose', values: [0.739597, 0.121786, 0.452539, 0.136609, 0.176737] },
    { name: 'Cholesterol', values: [0.650198, 0.023058, 0.116135, 0.015605, 0.752220] },
    { name: 'Hemoglobin', values: [0.713631, 0.944893, 0.544560, 0.419957, 0.971779] },
    { name: 'Platelets', values: [0.868491, 0.905372, 0.400640, 0.191487, 0.785286] },
    { name: 'White Blood Cells (WBC)', values: [0.687433, 0.507711, 0.294538, 0.081168, 0.443880] },
    { name: 'Red Blood Cells (RBC)', values: [0.529895, 0.403033, 0.382021, 0.166214, 0.439851] },
    { name: 'Heart Rate', values: [0.939485, 0.666368, 0.431704, 0.225756, 0.841412] }
  ];

  // Disease diagnoses with risk levels
  const diseases = [
    { name: 'Healthy', riskLevel: 'low' },
    { name: 'Diabetes', riskLevel: 'high' },
    { name: 'Thalasse', riskLevel: 'medium' },
    { name: 'Anemia', riskLevel: 'medium' },
    { name: 'Thalasse', riskLevel: 'medium' }
  ];

  // Function to determine color based on risk level
  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'low':
        return 'bg-green-200 text-green-700'; // Healthy
      case 'medium':
        return 'bg-yellow-200 text-yellow-700'; // Moderate
      case 'high':
        return 'bg-red-200 text-red-700'; // High risk
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
              <th className="border border-gray-300 px-6 py-2 text-left text-blue-600">Glucose</th>
              <th className="border border-gray-300 px-6 py-2 text-left text-blue-600">Cholesterol</th>
              <th className="border border-gray-300 px-6 py-2 text-left text-blue-600">Hemoglobin</th>
              <th className="border border-gray-300 px-6 py-2 text-left text-blue-600">Platelets</th>
              <th className="border border-gray-300 px-6 py-2 text-left text-blue-600">White Blood Cells (WBC)</th>
              <th className="border border-gray-300 px-6 py-2 text-left text-blue-600">Red Blood Cells (RBC)</th>
              <th className="border border-gray-300 px-6 py-2 text-left text-blue-600">Heart Rate</th>
              <th className="border border-gray-300 px-6 py-2 text-left text-blue-600">Disease</th>
            </tr>
          </thead>
          <tbody>
            {[0, 1, 2, 3, 4].map((index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-6 py-2">{bloodTestData[0].values[index]}</td>
                <td className="border border-gray-300 px-6 py-2">{bloodTestData[1].values[index]}</td>
                <td className="border border-gray-300 px-6 py-2">{bloodTestData[2].values[index]}</td>
                <td className="border border-gray-300 px-6 py-2">{bloodTestData[3].values[index]}</td>
                <td className="border border-gray-300 px-6 py-2">{bloodTestData[4].values[index]}</td>
                <td className="border border-gray-300 px-6 py-2">{bloodTestData[5].values[index]}</td>
                <td className="border border-gray-300 px-6 py-2">{bloodTestData[6].values[index]}</td>
                <td
                  className={`border border-gray-300 px-6 py-2 font-bold ${getRiskColor(diseases[index].riskLevel)}`}
                >
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
