
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const Projects = () => {
  const { t } = useLanguage();

  const projects = [
    {
      id: 1,
      title: t('residentialTitle'),
      description: t('residentialDesc'),
      category: 'Residential',
      image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=800&auto=format&fit=crop',
      location: 'Kathmandu',
      year: '2023',
      area: '5000 sq ft'
    },
    {
      id: 2,
      title: t('commercialTitle'),
      description: t('commercialDesc'),
      category: 'Commercial',
      image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=800&auto=format&fit=crop',
      location: 'Pokhara',
      year: '2023',
      area: '15000 sq ft'
    },
    {
      id: 3,
      title: 'Infrastructure Bridge',
      description: 'Modern concrete bridge designed for heavy traffic and durability',
      category: 'Infrastructure',
      image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=800&auto=format&fit=crop',
      location: 'Chitwan',
      year: '2022',
      area: '200m length'
    },
    {
      id: 4,
      title: 'Luxury Villa',
      description: 'Contemporary luxury villa with modern amenities and sustainable features',
      category: 'Residential',
      image: 'https://images.unsplash.com/photo-1487252665478-49b61b47f302?q=80&w=800&auto=format&fit=crop',
      location: 'Lalitpur',
      year: '2023',
      area: '8000 sq ft'
    },
    {
      id: 5,
      title: 'Corporate Office',
      description: 'Multi-story corporate office building with energy-efficient design',
      category: 'Commercial',
      image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=800&auto=format&fit=crop',
      location: 'Bhaktapur',
      year: '2022',
      area: '25000 sq ft'
    },
    {
      id: 6,
      title: 'Shopping Complex',
      description: 'Modern shopping complex with retail spaces and entertainment facilities',
      category: 'Commercial',
      image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=800&auto=format&fit=crop',
      location: 'Kathmandu',
      year: '2021',
      area: '30000 sq ft'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="construction-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            {t('projectsTitle')}
          </h1>
          <p className="text-xl max-w-3xl mx-auto animate-slide-up">
            {t('projectsDesc')}
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-secondary text-primary px-3 py-1 rounded-full text-sm font-semibold">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                  <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex justify-between">
                      <span>📍 Location:</span>
                      <span className="font-medium">{project.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>📅 Year:</span>
                      <span className="font-medium">{project.year}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>📐 Area:</span>
                      <span className="font-medium">{project.area}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 construction-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Achievements</h2>
            <p className="text-xl">Numbers that reflect our commitment to excellence</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-secondary mb-2">200+</div>
              <div className="text-lg">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-secondary mb-2">20+</div>
              <div className="text-lg">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-secondary mb-2">500+</div>
              <div className="text-lg">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-secondary mb-2">50+</div>
              <div className="text-lg">Team Members</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            Have a Project in Mind?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Let's discuss how we can bring your vision to life with our expertise and experience.
          </p>
          <a
            href="/contact"
            className="inline-block bg-secondary text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-500 transition-colors duration-300"
          >
            Start Your Project
          </a>
        </div>
      </section>
    </div>
  );
};

export default Projects;
