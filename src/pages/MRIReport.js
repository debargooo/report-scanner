import React from 'react';
import mriImg from '../assets/Y16.JPG'

const MRIReport = ({ mriImage }) => {
  // Dummy data for MRI findings
  const mriFindings = [
    { region: 'Frontal Lobe', observation: 'No abnormalities detected.', severity: 'Normal' },
    { region: 'Temporal Lobe', observation: 'Mild disc protrusion at L4-L5.', severity: 'Moderate' },
    { region: 'Occipital Lobe', observation: 'No signs of lesions.', severity: 'Normal' },
  ];

  const overallStatus = mriFindings.some((finding) => finding.severity === 'Severe')
    ? 'Critical'
    : mriFindings.some((finding) => finding.severity === 'Moderate')
    ? 'Moderate'
    : 'Normal';

  return (
    <section className="py-20 bg-gray-50">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-12">MRI Report - Brain Tumor Detection</h1>

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        {/* Display the MRI Image */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Uploaded MRI Image</h2>
          <img
            src={mriImg}
            alt="Uploaded MRI"
            className="w-full max-w-[20rem] mx-auto mb-6 object-cover border rounded-md"
          />
        </div>

        {/* MRI Findings Report */}
        <div>
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Analysis Result</h2>
          <p className="text-lg text-gray-700 mb-4">
            Based on the MRI analysis, the brain scan results are as follows:
          </p>

          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-100">
                <th className="border border-gray-300 px-4 py-2 text-left text-blue-600">Region</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-blue-600">Observation</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-blue-600">Severity</th>
              </tr>
            </thead>
            <tbody>
              {mriFindings.map((finding, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{finding.region}</td>
                  <td className="border border-gray-300 px-4 py-2">{finding.observation}</td>
                  <td
                    className={`border border-gray-300 px-4 py-2 font-bold ${
                      finding.severity === 'Normal'
                        ? 'text-green-600'
                        : finding.severity === 'Moderate'
                        ? 'text-yellow-600'
                        : 'text-red-600'
                    }`}
                  >
                    {finding.severity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-8">
            <h3 className="text-xl font-bold text-blue-600">Overall Status:</h3>
            <p className={`text-lg ${overallStatus === 'Normal' ? 'text-green-600' : 'text-red-600'}`}>
              {overallStatus === 'Critical'
                ? 'The scan indicates possible critical issues.'
                : overallStatus === 'Moderate'
                ? 'Some moderate issues have been detected.'
                : 'The scan shows normal results with no issues.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MRIReport;