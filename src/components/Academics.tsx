export function Academics() {
  const programs = [
    {
      level: 'Pre-Primary',
      grades: 'Nursery, Jr. KG, Sr. KG',
      description: 'Play-based learning that develops cognitive, motor, and social skills through fun activities.',
      icon: '🎒',
      color: 'from-red-400 to-red-500',
    },
    {
      level: 'Primary Section',
      grades: 'Class 1 to 4',
      description: 'Building strong foundations in literacy, numeracy, and environmental awareness.',
      icon: '📚',
      color: 'from-red-500 to-red-600',
    },
    {
      level: 'Middle Section',
      grades: 'Class 5 to 7',
      description: 'Expanding horizons with comprehensive curriculum covering sciences, arts, and languages.',
      icon: '🔬',
      color: 'from-red-600 to-red-700',
    },
    {
      level: 'Secondary Section',
      grades: 'Class 8 to 10',
      description: 'Intensive preparation for SSC Board exams with specialized coaching and guidance.',
      icon: '🎓',
      color: 'from-red-700 to-red-800',
    },
  ];

  const subjects = [
    'English', 'Hindi', 'Marathi', 'Mathematics', 'Science', 'Social Studies',
    'Computer Science', 'Physical Education', 'Art & Craft', 'Music'
  ];

  return (
    <section id="academics" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">Academics</span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900 mt-3 mb-4">
            Our Curriculum
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Following the MSBSHSE curriculum with enhanced focus on holistic development
          </p>
        </div>

        {/* Programs */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {programs.map((program) => (
            <div
              key={program.level}
              className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${program.color} rounded-2xl flex items-center justify-center mb-5 text-3xl shadow-lg`}>
                {program.icon}
              </div>
              <h3 className="font-serif font-bold text-xl text-gray-800 mb-2">{program.level}</h3>
              <p className="text-red-600 font-medium text-sm mb-3">{program.grades}</p>
              <p className="text-gray-600 text-sm leading-relaxed">{program.description}</p>
            </div>
          ))}
        </div>

        {/* MSBSHSE Board Info */}
        <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-3xl p-8 lg:p-12 text-white mb-16">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-serif text-3xl font-bold mb-4">MSBSHSE Curriculum</h3>
              <p className="text-white/90 text-lg leading-relaxed mb-6">
                As an affiliated school of the Maharashtra State Board of Secondary and Higher Secondary Education, we follow the state board curriculum that prepares students for the SSC examinations.
              </p>
              <ul className="space-y-3">
                {[
                  'State-of-the-art teaching methodology',
                  'Regular assessments and evaluations',
                  'Focus on practical learning',
                  'Career guidance for Class 10 students',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <h4 className="font-semibold text-lg mb-4">Subjects Offered</h4>
              <div className="flex flex-wrap gap-2">
                {subjects.map((subject) => (
                  <span
                    key={subject}
                    className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Teaching Approach */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'Interactive Learning',
              description: 'Engaging classroom sessions with audio-visual aids and smart class technology.',
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              ),
            },
            {
              title: 'Personalized Attention',
              description: 'Low student-teacher ratio ensuring individual focus on every student.',
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ),
            },
            {
              title: 'Regular Assessment',
              description: 'Continuous evaluation through tests, projects, and practical examinations.',
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              ),
            },
          ].map((item) => (
            <div key={item.title} className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-5 text-red-600">
                {item.icon}
              </div>
              <h3 className="font-serif font-bold text-xl text-gray-800 mb-3">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
