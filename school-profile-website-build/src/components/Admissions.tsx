export function Admissions() {
  const steps = [
    {
      step: 1,
      title: 'Enquiry',
      description: 'Visit our school or call us to learn about admission process and fee structure.',
    },
    {
      step: 2,
      title: 'Application',
      description: 'Fill the application form and submit required documents.',
    },
    {
      step: 3,
      title: 'Assessment',
      description: 'Student appears for an interaction/assessment as per the grade.',
    },
    {
      step: 4,
      title: 'Admission',
      description: 'Complete fee payment and formalities to confirm admission.',
    },
  ];

  const documents = [
    'Birth Certificate (Original + Photocopy)',
    'Aadhaar Card of Student',
    'Previous School Transfer Certificate',
    'Mark Sheet of Previous Class',
    'Passport Size Photographs (4 copies)',
    'Parent/Guardian ID Proof',
    'Address Proof (Ration Card/Utility Bill)',
  ];

  return (
    <section id="admissions" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">Join Us</span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900 mt-3 mb-4">
            Admissions Open
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Academic Year 2025-26 admissions are now open for all classes
          </p>
        </div>

        {/* Admission Banner */}
        <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-3xl p-8 lg:p-12 text-white mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-block bg-white/20 px-4 py-2 rounded-full text-sm font-medium mb-4">
                🎓 Limited Seats Available
              </span>
              <h3 className="font-serif text-3xl lg:text-4xl font-bold mb-4">
                Enroll Your Child Today!
              </h3>
              <p className="text-white/90 text-lg mb-6">
                Give your child the gift of quality education at Gurukul English High School. Join our family of learners and achievers.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#contact" className="inline-flex items-center gap-2 bg-white text-red-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                  Apply Now
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a href="tel:+919876543210" className="inline-flex items-center gap-2 bg-white/20 px-6 py-3 rounded-full font-semibold hover:bg-white/30 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Us
                </a>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <h4 className="font-semibold text-lg mb-4">Classes Open for Admission</h4>
              <div className="grid grid-cols-2 gap-3">
                {['Nursery', 'Jr. KG', 'Sr. KG', 'Class 1-4', 'Class 5-7', 'Class 8-9'].map((cls) => (
                  <div key={cls} className="bg-white/20 rounded-lg p-3 text-center font-medium">
                    {cls}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Admission Process */}
        <div className="mb-16">
          <h3 className="font-serif text-2xl font-bold text-gray-800 text-center mb-12">
            Admission Process
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((item, index) => (
              <div key={item.step} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-red-200"></div>
                )}
                <div className="relative bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl shadow-lg relative z-10">
                    {item.step}
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Documents & Fee */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Documents Required */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="font-serif text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Documents Required
            </h3>
            <ul className="space-y-3">
              {documents.map((doc) => (
                <li key={doc} className="flex items-start gap-3 text-gray-600">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {doc}
                </li>
              ))}
            </ul>
          </div>

          {/* Fee Structure Info */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
            <h3 className="font-serif text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Fee Structure
            </h3>
            <p className="text-gray-600 mb-6">
              We believe in affordable quality education. Our fee structure is designed to be accessible to all families while maintaining high educational standards.
            </p>
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-4 flex justify-between items-center">
                <span className="text-gray-700">Pre-Primary (Nursery - Sr. KG)</span>
                <span className="font-semibold text-gray-800">Contact Office</span>
              </div>
              <div className="bg-white rounded-xl p-4 flex justify-between items-center">
                <span className="text-gray-700">Primary (Class 1 - 4)</span>
                <span className="font-semibold text-gray-800">Contact Office</span>
              </div>
              <div className="bg-white rounded-xl p-4 flex justify-between items-center">
                <span className="text-gray-700">Secondary (Class 5 - 10)</span>
                <span className="font-semibold text-gray-800">Contact Office</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              * Sibling discount and scholarship options available. Contact office for details.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
