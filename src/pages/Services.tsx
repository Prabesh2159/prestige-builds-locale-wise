
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: '🏛️',
      title: t('architecture'),
      description: t('architectureDesc'),
      features: ['3D Design & Modeling', 'Structural Planning', 'Interior Design', 'Landscape Architecture'],
      image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=600&auto=format&fit=crop'
    },
    {
      icon: '🏗️',
      title: t('construction'),
      description: t('constructionDesc'),
      features: ['Residential Buildings', 'Commercial Complexes', 'Industrial Facilities', 'Infrastructure Projects'],
      image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=600&auto=format&fit=crop'
    },
    {
      icon: '🔨',
      title: t('renovation'),
      description: t('renovationDesc'),
      features: ['Home Remodeling', 'Office Renovation', 'Building Restoration', 'Modern Upgrades'],
      image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=600&auto=format&fit=crop'
    },
    {
      icon: '📋',
      title: t('planning'),
      description: t('planningDesc'),
      features: ['Project Management', 'Site Survey', 'Budget Planning', 'Timeline Management'],
      image: 'https://images.unsplash.com/photo-1487252665478-49b61b47f302?q=80&w=600&auto=format&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="construction-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            {t('servicesPageTitle')}
          </h1>
          <p className="text-xl max-w-3xl mx-auto animate-slide-up">
            Comprehensive construction solutions tailored to meet your specific needs and requirements.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {services.map((service, index) => (
              <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="rounded-lg shadow-lg w-full h-80 object-cover"
                  />
                </div>
                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <div className="text-6xl mb-4">{service.icon}</div>
                  <h2 className="text-3xl font-bold text-primary mb-4">{service.title}</h2>
                  <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <div className="w-2 h-2 bg-secondary rounded-full mr-3"></div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 construction-gradient text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl mb-8">
            Contact us today for a free consultation and detailed quote for your construction needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-secondary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-yellow-500 transition-colors duration-300"
            >
              {t('getQuote')}
            </a>
            <a
              href="tel:+9771234567890"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors duration-300"
            >
              Call Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
