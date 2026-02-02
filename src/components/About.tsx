export function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">About Us</span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900 mt-3 mb-4">
            Who We Are
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            A legacy of excellence in education since 2005
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image/Visual */}
          <div className="relative">
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-3xl p-8 lg:p-12">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div>
                    <h3 className="font-serif font-bold text-xl text-red-600">Gurukul English High School</h3>
                    <p className="text-gray-500 text-sm">Affiliated to MSBSHSE, Maharashtra</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-600">
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>MSBSHSE Board Affiliated</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>English Medium Education</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Classes from Pre-Primary to 10th</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Co-Educational Institute</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Located in Nalasopara East</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-red-500 rounded-full opacity-10"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-red-400 rounded-full opacity-10"></div>
          </div>

          {/* Content */}
          <div>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              <strong className="text-gray-800">Gurukul English High School</strong> stands as a beacon of quality education in Nalasopara East, Maharashtra. Established in <strong className="text-red-600">2005</strong> and affiliated to the Maharashtra State Board of Secondary and Higher Secondary Education (MSBSHSE), we have been shaping young minds and building future leaders for over 19 years.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Our institution believes in the ancient Gurukul philosophy of holistic education, where knowledge is imparted with values, discipline, and a deep understanding of one's responsibilities towards society. We blend traditional Indian values with modern educational practices to create well-rounded individuals ready to face the challenges of tomorrow.
            </p>

            {/* Vision & Mission */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl p-6 border border-red-100">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="font-serif font-bold text-xl text-gray-800 mb-2">Our Vision</h3>
                <p className="text-gray-600">
                  To be a leading educational institution that empowers students to become responsible citizens with strong moral values and academic excellence.
                </p>
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl p-6 border border-gray-200">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-serif font-bold text-xl text-gray-800 mb-2">Our Mission</h3>
                <p className="text-gray-600">
                  To provide quality education that nurtures creativity, critical thinking, and character development in every student we teach.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
