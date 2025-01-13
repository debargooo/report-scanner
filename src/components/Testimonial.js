const Testimonial = () => (
    <section id="testimonial" className="py-20 bg-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">What Our Users Say</h2>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-8">
          <div className="bg-gray-50 p-6 rounded shadow">
            <p className="text-gray-600 italic">
              "This tool saved me hours of effort and provided accurate insights into my reports."
            </p>
            <h3 className="mt-4 font-bold text-blue-600">- John Doe</h3>
          </div>
          <div className="bg-gray-50 p-6 rounded shadow">
            <p className="text-gray-600 italic">
              "A game-changer for anyone who deals with medical records regularly."
            </p>
            <h3 className="mt-4 font-bold text-blue-600">- Jane Smith</h3>
          </div>
        </div>
      </div>
    </section>
  );
  export default Testimonial;
  