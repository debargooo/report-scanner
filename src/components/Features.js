const Features = () => (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-4 shadow rounded bg-gray-50">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">Secure Uploads</h3>
            <p className="text-gray-600">Your reports are encrypted for complete privacy.</p>
          </div>
          <div className="p-4 shadow rounded bg-gray-50">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">AI-Powered Analysis</h3>
            <p className="text-gray-600">Get valuable insights with cutting-edge AI technology.</p>
          </div>
          <div className="p-4 shadow rounded bg-gray-50">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">Instant Access</h3>
            <p className="text-gray-600">View your medical reports anytime, anywhere.</p>
          </div>
        </div>
      </div>
    </section>
  );
  export default Features;
  