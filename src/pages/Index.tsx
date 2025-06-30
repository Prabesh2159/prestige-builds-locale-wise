
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: '🏗️',
      title: t('experienceTitle'),
      description: t('experienceDesc'),
      number: '20+'
    },
    {
      icon: '⭐',
      title: t('qualityTitle'),
      description: t('qualityDesc'),
      number: '100%'
    },
    {
      icon: '👥',
      title: t('teamTitle'),
      description: t('teamDesc'),
      number: '50+'
    }
  ];

  const services = [
    {
      icon: '🏛️',
      title: t('architecture'),
      description: t('architectureDesc')
    },
    {
      icon: '🏗️',
      title: t('construction'),
      description: t('constructionDesc')
    },
    {
      icon: '🔨',
      title: t('renovation'),
      description: t('renovationDesc')
    },
    {
      icon: '📋',
      title: t('planning'),
      description: t('planningDesc')
    }
  ];

  const testimonials = [
    {
      name: 'Raj Kumar Shrestha',
      comment: 'Outstanding quality and professional service. They completed our project on time and within budget.',
      rating: 5
    },
    {
      name: 'Maya Devi Poudel',
      comment: 'Excellent craftsmanship and attention to detail. Highly recommended for any construction work.',
      rating: 5
    },
    {
      name: 'Kiran Bhatta',
      comment: 'Professional team with great expertise. They turned our vision into reality perfectly.',
      rating: 5
    }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="hero-bg min-h-screen flex items-center justify-center text-white relative">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            {t('heroTitle')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate-slide-up">
            {t('heroSubtitle')}
          </p>
          <Link
            to="/contact"
            className="inline-block bg-secondary text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105 animate-scale-in"
          >
            {t('getQuote')}
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              {t('whyChooseUs')}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-6xl mb-4">{feature.icon}</div>
                <div className="text-4xl font-bold text-secondary mb-2">{feature.number}</div>
                <h3 className="text-xl font-semibold text-primary mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 construction-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('servicesTitle')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="text-center p-6 bg-white bg-opacity-10 rounded-lg backdrop-blur-sm hover:bg-opacity-20 transition-all duration-300">
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-secondary">{service.title}</h3>
                <p className="text-gray-200">{service.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-block bg-secondary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors duration-300"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              {t('featuredProjects')}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img 
                src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=800&auto=format&fit=crop" 
                alt="Residential Project"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-primary mb-2">{t('residentialTitle')}</h3>
                <p className="text-gray-600">{t('residentialDesc')}</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img 
                src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=800&auto=format&fit=crop" 
                alt="Commercial Project"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-primary mb-2">{t('commercialTitle')}</h3>
                <p className="text-gray-600">{t('commercialDesc')}</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img 
                src="https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=800&auto=format&fit=crop" 
                alt="Infrastructure Project"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-primary mb-2">Infrastructure Development</h3>
                <p className="text-gray-600">Modern infrastructure solutions for urban development</p>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <Link
              to="/projects"
              className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors duration-300"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              {t('testimonials')}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-lg">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-secondary text-xl">⭐</span>
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.comment}"</p>
                <div className="font-semibold text-primary">{testimonial.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
