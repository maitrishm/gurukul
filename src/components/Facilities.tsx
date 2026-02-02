export function Facilities() {
  const facilities = [
    {
      name: 'Classrooms',
      description: 'White boards and projectors for interactive learning experiences.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      name: 'Science Labs',
      description: 'Labs for Physics, Chemistry, and Biology practicals as mandatory by MSBSHSE board.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
    },
    {
      name: 'Computer Lab',
      description: 'Computers for digital literacy.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    
    {
      name: 'Indoor Games',
      description: 'Chess, carrom, and other indoor  activities.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    
    
  ];

  return (
    <section id="facilities" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">Infrastructure</span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900 mt-3 mb-4">
            Our Facilities
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Mandatory infrastructure to support comprehensive learning and development as per MSBSHSE guidelines.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilities.map((facility) => (
            <div
              key={facility.name}
              className="group bg-gray-50 hover:bg-gradient-to-br hover:from-red-600 hover:to-red-700 rounded-2xl p-6 transition-all duration-300 cursor-pointer"
            >
              <div className="w-14 h-14 bg-red-100 group-hover:bg-white/20 rounded-xl flex items-center justify-center mb-4 text-red-600 group-hover:text-white transition-colors">
                {facility.icon}
              </div>
              <h3 className="font-semibold text-lg text-gray-800 group-hover:text-white mb-2 transition-colors">
                {facility.name}
              </h3>
              <p className="text-gray-600 group-hover:text-white/90 text-sm transition-colors">
                {facility.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <h3 className="font-serif text-2xl font-bold text-gray-800 mb-4">
                Safe & Secure Campus
              </h3>
              <p className="text-gray-600 mb-6">
                Our campus is equipped with CCTV surveillance, secure entry gates, and trained security personnel to ensure the safety of all students. We maintain a clean and hygienic environment with regular sanitization.
              </p>
              <div className="flex flex-wrap gap-4">
                {['CCTV Surveillance', 'Fire Safety', 'First Aid', 'Clean Drinking Water'].map((item) => (
                  <span key={item} className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full text-sm text-gray-700 shadow-sm">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-48 h-48 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl">
                <div className="text-center text-white">
                  <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="font-semibold">100% Safe</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
