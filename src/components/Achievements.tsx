export function Achievements() {
  const achievements = [
    {
      year: '2024',
      title: 'Organise the first time science exhibition',
      description: 'Students showcased their science project first time.',
    },
    {
      year: '2024',
      title: 'Excellent SSC Board Results',
      description: 'Achieved 94% pass rate with 3 students scoring above 85%.',
    },
    {
      year: '2020',
      title: 'Best SSC board results',
      description: 'School achieved 100% pass rate.',
    },
  ];

  const stats = [
    { value: '94%', label: 'Pass Rate 2024', color: 'from-red-500 to-red-600' },
    { value: '19+', label: 'Years Legacy', color: 'from-gray-700 to-gray-800' },
  ];

  return (
    <section id="achievements" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">Our Pride</span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900 mt-3 mb-4">
            Achievements & Awards
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Celebrating excellence in academics, sports, and co-curricular activities
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-2 gap-6 mb-16">
          {stats.map((stat) => (
            <div key={stat.label} className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 text-white text-center shadow-lg`}>
              <div className="text-4xl lg:text-5xl font-bold mb-2">{stat.value}</div>
              <div className="text-white/90 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Achievements Timeline */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h3 className="font-serif text-2xl font-bold text-gray-800 mb-8">Recent Achievements</h3>
            <div className="space-y-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                    <span className="inline-block bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                      {achievement.year}%
                    </span>
                    <h4 className="font-semibold text-gray-800 mb-1">{achievement.title}</h4>
                    <p className="text-gray-600 text-sm">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Topper Showcase */}
          <div>
            <h3 className="font-serif text-2xl font-bold text-gray-800 mb-8">SSC Toppers 2024</h3>
            <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-3xl p-8 text-white">
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { name: 'Priya Sharma', score: '89.6%', rank: '1st' },
                  { name: 'Rahul Patil', score: '87.2%', rank: '2nd' },
                  { name: 'Sneha Deshmukh', score: '85.8%', rank: '3rd' },
                ].map((topper, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="font-bold text-lg">{topper.score}</div>
                    <div className="text-white/80 text-sm">{topper.name}</div>
                    <span className="inline-block bg-white/20 text-xs px-2 py-1 rounded-full mt-1">
                      {topper.rank}
                    </span>
                  </div>
                ))}
              </div>
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <p className="text-white/90">
                  <span className="font-bold text-2xl">28%</span> students scored above 60% in SSC 2024
                </p>
              </div>
            </div>

            {/* Extra-curricular */}
            <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h4 className="font-semibold text-gray-800 mb-4">Extra-Curricular Excellence</h4>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { activity: 'Annual Day', highlight: 'Cultural Programs' },
                  { activity: 'Sports Day', highlight: 'Athletics & Games' },
                  { activity: 'Science Fair', highlight: 'Innovative Projects' },
                  { activity: 'Art Exhibition', highlight: 'Creative Showcase' },
                ].map((item) => (
                  <div key={item.activity} className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-gray-800 text-sm">{item.activity}</div>
                      <div className="text-gray-500 text-xs">{item.highlight}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
