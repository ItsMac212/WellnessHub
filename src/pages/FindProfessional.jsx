import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Phone, Mail, Star, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

const FindProfessional = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [filteredProfessionals, setFilteredProfessionals] = useState([]);

  const professionals = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      type: 'Psychiatrist',
      specialty: 'Anxiety & Depression',
      location: 'New York, NY',
      phone: '(555) 123-4567',
      email: 'sarah.johnson@example.com',
      rating: 4.9,
      experience: '15 years',
      description: 'Specializes in cognitive behavioral therapy and medication management for anxiety and depression.',
      acceptsInsurance: true
    },
    {
      id: 2,
      name: 'Michael Chen, LCSW',
      type: 'Licensed Clinical Social Worker',
      specialty: 'Trauma & PTSD',
      location: 'Los Angeles, CA',
      phone: '(555) 234-5678',
      email: 'michael.chen@example.com',
      rating: 4.8,
      experience: '12 years',
      description: 'Expert in trauma-informed care and EMDR therapy for PTSD and complex trauma.',
      acceptsInsurance: true
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      type: 'Clinical Psychologist',
      specialty: 'Child & Adolescent',
      location: 'Chicago, IL',
      phone: '(555) 345-6789',
      email: 'emily.rodriguez@example.com',
      rating: 4.7,
      experience: '10 years',
      description: 'Focuses on helping children and teenagers with behavioral and emotional challenges.',
      acceptsInsurance: false
    },
    {
      id: 4,
      name: 'James Wilson, MFT',
      type: 'Marriage & Family Therapist',
      specialty: 'Couples & Family',
      location: 'Austin, TX',
      phone: '(555) 456-7890',
      email: 'james.wilson@example.com',
      rating: 4.6,
      experience: '8 years',
      description: 'Specializes in relationship counseling and family therapy using systemic approaches.',
      acceptsInsurance: true
    },
    {
      id: 5,
      name: 'Dr. Lisa Park',
      type: 'Psychiatrist',
      specialty: 'Bipolar & Mood Disorders',
      location: 'Seattle, WA',
      phone: '(555) 567-8901',
      email: 'lisa.park@example.com',
      rating: 4.9,
      experience: '18 years',
      description: 'Expert in mood disorders with extensive experience in medication management.',
      acceptsInsurance: true
    },
    {
      id: 6,
      name: 'Robert Thompson, PhD',
      type: 'Clinical Psychologist',
      specialty: 'Addiction & Substance Abuse',
      location: 'Miami, FL',
      phone: '(555) 678-9012',
      email: 'robert.thompson@example.com',
      rating: 4.5,
      experience: '14 years',
      description: 'Specializes in addiction treatment and dual diagnosis therapy.',
      acceptsInsurance: true
    }
  ];

  const specialties = [
    'Anxiety & Depression',
    'Trauma & PTSD',
    'Child & Adolescent',
    'Couples & Family',
    'Bipolar & Mood Disorders',
    'Addiction & Substance Abuse'
  ];

  const locations = [
    'New York, NY',
    'Los Angeles, CA',
    'Chicago, IL',
    'Austin, TX',
    'Seattle, WA',
    'Miami, FL'
  ];

  const handleSearch = () => {
    let filtered = professionals;

    if (searchTerm) {
      filtered = filtered.filter(prof => 
        prof.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prof.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prof.specialty.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedSpecialty) {
      filtered = filtered.filter(prof => prof.specialty === selectedSpecialty);
    }

    if (selectedLocation) {
      filtered = filtered.filter(prof => prof.location === selectedLocation);
    }

    setFilteredProfessionals(filtered);
    
    if (filtered.length === 0) {
      toast({
        title: "No results found",
        description: "Try adjusting your search criteria to find professionals in your area.",
      });
    }
  };

  const handleContact = (professional) => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
      description: `Contact feature for ${professional.name} would be implemented here.`,
    });
  };

  React.useEffect(() => {
    setFilteredProfessionals(professionals);
  }, []);

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-6">
            <span className="gradient-text">Find a Mental Health</span>
            <br />
            <span className="text-slate-700">Professional</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Connect with qualified mental health professionals in your area who can provide the support and treatment you need.
          </p>
        </motion.div>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="glass-effect mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Search className="h-6 w-6 text-emerald-600" />
                <span>Search for Professionals</span>
              </CardTitle>
              <CardDescription>
                Use the filters below to find mental health professionals that match your needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <Input
                  placeholder="Search by name or type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="md:col-span-2"
                />
                <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Specialties</SelectItem>
                    {specialties.map(specialty => (
                      <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Locations</SelectItem>
                    {locations.map(location => (
                      <SelectItem key={location} value={location}>{location}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleSearch} className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700">
                <Search className="h-4 w-4 mr-2" />
                Search Professionals
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Results Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-800">
              Available Professionals ({filteredProfessionals.length})
            </h2>
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <Filter className="h-4 w-4" />
              <span>Showing filtered results</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfessionals.map((professional, index) => (
              <motion.div
                key={professional.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full glass-effect hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{professional.name}</CardTitle>
                        <CardDescription className="text-emerald-600 font-medium">
                          {professional.type}
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{professional.rating}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex items-center space-x-2 text-sm text-slate-600 mb-2">
                        <span className="font-medium">Specialty:</span>
                        <span>{professional.specialty}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-slate-600 mb-2">
                        <MapPin className="h-4 w-4" />
                        <span>{professional.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-slate-600 mb-2">
                        <span className="font-medium">Experience:</span>
                        <span>{professional.experience}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-slate-700">{professional.description}</p>
                    
                    <div className="flex items-center justify-between text-xs">
                      <span className={`px-2 py-1 rounded-full ${
                        professional.acceptsInsurance 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        {professional.acceptsInsurance ? 'Accepts Insurance' : 'Private Pay'}
                      </span>
                    </div>
                    
                    <div className="flex space-x-2 pt-4">
                      <Button 
                        size="sm" 
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                        onClick={() => handleContact(professional)}
                      >
                        <Phone className="h-4 w-4 mr-1" />
                        Call
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => handleContact(professional)}
                      >
                        <Mail className="h-4 w-4 mr-1" />
                        Email
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Information Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16"
        >
          <Card className="glass-effect border-blue-200">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">
                Tips for Choosing a Mental Health Professional
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-slate-800 mb-3">Consider These Factors:</h4>
                  <ul className="space-y-2 text-slate-700">
                    <li>• Specialty and experience with your specific concerns</li>
                    <li>• Treatment approaches and methods used</li>
                    <li>• Insurance acceptance and payment options</li>
                    <li>• Location and availability</li>
                    <li>• Personal comfort and rapport</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-3">Questions to Ask:</h4>
                  <ul className="space-y-2 text-slate-700">
                    <li>• What is your experience with my condition?</li>
                    <li>• What treatment approaches do you use?</li>
                    <li>• How long is typical treatment?</li>
                    <li>• What are your fees and payment policies?</li>
                    <li>• How do you handle emergencies?</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default FindProfessional;