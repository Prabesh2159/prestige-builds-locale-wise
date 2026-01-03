import { Link } from 'react-router-dom';
import { ArrowRight, Users, BookOpen, Award, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { schoolInfo, facilities } from '@/data/mockData';

// Use hero image from public folder for Home page only
const heroImagePath = '/images/building.jpeg';

const Index = () => {
  const stats = [
    { icon: Users, value: schoolInfo.students, label: 'Students' },
    { icon: BookOpen, value: schoolInfo.teachers, label: 'Teachers' },
    { icon: Award, value: '25+', label: 'Years of Excellence' },
    { icon: GraduationCap, value: '95%', label: 'Pass Rate' },
  ];

  return (
    <div>
      {/* Hero Section - Enhanced with gradient overlay */}
      <section className="relative min-h-[85vh] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImagePath})` }}
        >
          {/* Enhanced gradient overlay for premium look */}
          <div className="absolute inset-0 gradient-hero" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>
        
        <div className="container-school relative z-10 py-20">
          <div className="max-w-3xl animate-fade-in">
            <span className="badge-new mb-6 inline-flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              Admissions Open for 2025-2026
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
              {schoolInfo.name}
            </h1>
            <p className="text-xl md:text-2xl text-white/95 mb-10 leading-relaxed drop-shadow-md">
              {schoolInfo.tagline}. We provide quality education that transforms lives and builds bright futures.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="xl" className="bg-accent-gold text-accent-gold-foreground hover:bg-accent-gold/90 shadow-xl" asChild>
                <Link to="/admission">
                  Apply Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="xl" className="border-white/40 text-white hover:bg-white/15" asChild>
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Stats Section */}
      <section className="py-0 relative z-10 -mt-12">
        <div className="container-school">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="card-elevated p-6 text-center animate-slide-up hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-7 h-7 text-primary" />
                </div>
                <div className="font-heading text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="section-padding">
        <div className="container-school">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <span className="badge-accent mb-4">About Us</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
                Welcome to Brilliant Sagarmatha English Secondary Boarding School
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Established in {schoolInfo.established}, Brilliant Sagarmatha English Secondary Boarding School has been a beacon of educational excellence in Nepal. Our commitment to holistic development ensures that every student receives not just academic knowledge, but also the values and skills needed for life.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                With state-of-the-art facilities, experienced faculty, and a nurturing environment, we prepare our students to face the challenges of tomorrow with confidence and competence.
              </p>
              <Button variant="default" size="lg" className="shadow-lg hover:shadow-xl" asChild>
                <Link to="/about">
                  Read More About Us
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400"
                alt="School Building"
                className="rounded-xl shadow-school w-full h-48 object-cover hover:shadow-xl transition-shadow duration-300"
              />
              <img 
                src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400"
                alt="Students Learning"
                className="rounded-xl shadow-school w-full h-48 object-cover mt-8 hover:shadow-xl transition-shadow duration-300"
              />
              <img 
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400"
                alt="Science Lab"
                className="rounded-xl shadow-school w-full h-48 object-cover hover:shadow-xl transition-shadow duration-300"
              />
              <img 
                src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=400"
                alt="Library"
                className="rounded-xl shadow-school w-full h-48 object-cover mt-8 hover:shadow-xl transition-shadow duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="section-padding bg-muted/50">
        <div className="container-school">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="badge-accent mb-4">Our Facilities</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              World-Class Infrastructure
            </h2>
            <p className="text-muted-foreground">
              We provide modern facilities to ensure the best learning environment for our students.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((facility, index) => (
              <div 
                key={index}
                className="card-elevated p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="text-4xl mb-4">{facility.icon}</div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {facility.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{facility.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding gradient-primary relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
        
        <div className="container-school text-center relative z-10">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Join The Rising Family?
          </h2>
          <p className="text-white/90 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Take the first step towards a brighter future. Apply for admission today and become part of our growing family of achievers.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="hero" size="xl" className="bg-accent-gold text-accent-gold-foreground hover:bg-accent-gold/90 shadow-xl" asChild>
              <Link to="/admission">Apply for Admission</Link>
            </Button>
            <Button variant="heroOutline" size="xl" className="border-white/40 text-white hover:bg-white/15" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
