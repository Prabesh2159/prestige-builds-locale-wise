
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="construction-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            {t('aboutTitle')}
          </h1>
          <p className="text-xl max-w-3xl mx-auto animate-slide-up">
            {t('aboutDesc')}
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=800&auto=format&fit=crop" 
                alt="Construction site"
                className="rounded-lg shadow-lg w-full h-96 object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Founded in 2004, Prestige Construction and Builders began as a small family business with a vision to transform the construction industry in Nepal. Over the years, we have grown into one of the most trusted names in construction, completing over 200 successful projects.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our commitment to quality, innovation, and customer satisfaction has been the cornerstone of our success. We believe in building not just structures, but lasting relationships with our clients.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary">200+</div>
                  <div className="text-gray-600">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary">20+</div>
                  <div className="text-gray-600">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-primary mb-4">{t('missionTitle')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('missionDesc')}
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold text-primary mb-4">{t('visionTitle')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('visionDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Leadership Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet the experienced professionals who lead our company with expertise and dedication.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-gray-50 p-8 rounded-lg">
              <div className="w-32 h-32 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center text-white text-4xl font-bold">
                RS
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Ram Shrestha</h3>
              <p className="text-secondary font-medium mb-2">Managing Director</p>
              <p className="text-gray-600 text-sm">25+ years in construction industry</p>
            </div>
            <div className="text-center bg-gray-50 p-8 rounded-lg">
              <div className="w-32 h-32 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center text-white text-4xl font-bold">
                SP
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Sita Poudel</h3>
              <p className="text-secondary font-medium mb-2">Chief Architect</p>
              <p className="text-gray-600 text-sm">20+ years in architectural design</p>
            </div>
            <div className="text-center bg-gray-50 p-8 rounded-lg">
              <div className="w-32 h-32 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center text-white text-4xl font-bold">
                KB
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Kiran Bhatta</h3>
              <p className="text-secondary font-medium mb-2">Project Manager</p>
              <p className="text-gray-600 text-sm">15+ years in project management</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
