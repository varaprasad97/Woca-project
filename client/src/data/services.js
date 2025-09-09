export const SERVICE_CATEGORIES = {
  'Home Cleaning': {
    icon: 'C',
    color: 'bg-blue-100 text-blue-800',
    services: [
      { title: '1BHK Deep Cleaning', price: 1500, priceRange: '₹1,500–3,000 per BHK' },
      { title: '2BHK Deep Cleaning', price: 2500, priceRange: '₹2,500–4,500 per BHK' },
      { title: 'Kitchen Deep Cleaning', price: 800, priceRange: '₹500–1,500 per kitchen' },
      { title: 'Bathroom Cleaning', price: 999, priceRange: '₹499–1,999 per bathroom' },
      { title: 'Sofa Cleaning', price: 600, priceRange: '₹400–1,200 per sofa' }
    ]
  },
  'Appliance Repair': {
    icon: 'A',
    color: 'bg-orange-100 text-orange-800',
    services: [
      { title: 'Washing Machine Repair', price: 350, priceRange: '₹199–500 per job' },
      { title: 'Refrigerator Repair', price: 275, priceRange: '₹199–350 per job' },
      { title: 'AC Repair & Service', price: 800, priceRange: '₹500–1,500 per service' },
      { title: 'Microwave Repair', price: 250, priceRange: '₹150–400 per job' },
      { title: 'Dishwasher Repair', price: 400, priceRange: '₹250–600 per job' },
      { title: 'Water Purifier Service', price: 300, priceRange: '₹200–500 per service' }
    ]
  },
  'Plumbing': {
    icon: 'P',
    color: 'bg-cyan-100 text-cyan-800',
    services: [
      { title: 'Pipe Repair', price: 1500, priceRange: '₹500–3,000 per job' },
      { title: 'Tap Installation', price: 800, priceRange: '₹300–1,500 per tap' },
      { title: 'Drain Cleaning', price: 1200, priceRange: '₹500–2,500 per drain' },
      { title: 'Quick Fix/Visit', price: 2750, priceRange: '₹500–5,000 per job' },
      { title: 'Full Home Plumbing', price: 30000, priceRange: '₹10,000–50,000+ (installation)' }
    ]
  },
  'Electrical': {
    icon: 'E',
    color: 'bg-yellow-100 text-yellow-800',
    services: [
      { title: 'Fan Installation', price: 300, priceRange: '₹150–500 per fan' },
      { title: 'Light Installation', price: 200, priceRange: '₹100–400 per light' },
      { title: 'Switch/Socket Repair', price: 150, priceRange: '₹100–300 per point' },
      { title: 'MCB Installation', price: 500, priceRange: '₹300–800 per MCB' },
      { title: 'General Repairs', price: 350, priceRange: '₹200–500 per hour' }
    ]
  },
  'Carpentry': {
    icon: 'C',
    color: 'bg-brown-100 text-brown-800',
    services: [
      { title: 'Cupboard Hinge Repair', price: 149, priceRange: '₹149 per set' },
      { title: 'Furniture Assembly', price: 575, priceRange: '₹300–850 per item' },
      { title: 'Wardrobe Making', price: 500, priceRange: '₹450–550 per sq. ft.' },
      { title: 'Bed Frame Repair', price: 300, priceRange: '₹200–500 per bed' },
      { title: 'Door Installation', price: 800, priceRange: '₹500–1,200 per door' },
      { title: 'Window Frame Repair', price: 400, priceRange: '₹250–600 per window' }
    ]
  },
  'Home Painting': {
    icon: 'P',
    color: 'bg-pink-100 text-pink-800',
    services: [
      { title: 'Interior Wall Painting', price: 30, priceRange: '₹10–50 per sq. ft.' },
      { title: 'Exterior Wall Painting', price: 40, priceRange: '₹15–60 per sq. ft.' },
      { title: 'Ceiling Painting', price: 35, priceRange: '₹12–55 per sq. ft.' },
      { title: 'Emulsion Paint Application', price: 53, priceRange: '₹22–85 per sq. ft.' },
      { title: 'Textured Wall Painting', price: 80, priceRange: '₹50–120 per sq. ft.' },
      { title: 'Kitchen Cabinet Painting', price: 200, priceRange: '₹150–300 per cabinet' }
    ]
  },
  'Landscaping': {
    icon: 'L',
    color: 'bg-green-100 text-green-800',
    services: [
      { title: 'Lawn Maintenance', price: 1850, priceRange: '₹1,200–2,500 per visit' },
      { title: 'Garden Design', price: 5000, priceRange: '₹3,000–8,000 per design' },
      { title: 'Plant Installation', price: 300, priceRange: '₹200–500 per plant' },
      { title: 'Irrigation System', price: 2000, priceRange: '₹1,500–3,500 per system' },
      { title: 'Tree Pruning', price: 800, priceRange: '₹500–1,200 per tree' },
      { title: 'Full Landscaping', price: 275, priceRange: '₹50–500 per sq. ft.' }
    ]
  },
  'Pest Control': {
    icon: 'P',
    color: 'bg-red-100 text-red-800',
    services: [
      { title: 'General Pest Control 1BHK', price: 1400, priceRange: '₹800–2,000 per home' },
      { title: 'Cockroach Control', price: 800, priceRange: '₹500–1,200 per treatment' },
      { title: 'Rodent Control', price: 1000, priceRange: '₹600–1,500 per treatment' },
      { title: 'Termite Control 1BHK', price: 3200, priceRange: '₹1,200–5,200 per home' },
      { title: 'Bed Bug Treatment', price: 1200, priceRange: '₹800–1,800 per treatment' },
      { title: 'Mosquito Control', price: 600, priceRange: '₹400–1,000 per treatment' }
    ]
  },
  'Moving/Logistics': {
    icon: 'M',
    color: 'bg-purple-100 text-purple-800',
    services: [
      { title: 'Local Move (1 BHK)', price: 4250, priceRange: '₹2,500–6,000+ per move' },
      { title: 'Local Move (2 BHK)', price: 6000, priceRange: '₹4,000–8,000+ per move' },
      { title: 'Office Relocation', price: 8000, priceRange: '₹5,000–12,000+ per move' },
      { title: 'Packing Services', price: 1500, priceRange: '₹1,000–2,500 per room' },
      { title: 'Furniture Moving', price: 2000, priceRange: '₹1,500–3,000 per item' },
      { title: 'Storage Services', price: 500, priceRange: '₹300–800 per month' }
    ]
  },
  'Car Wash/Detailing': {
    icon: 'C',
    color: 'bg-indigo-100 text-indigo-800',
    services: [
      { title: 'Basic Car Wash', price: 200, priceRange: '₹150–300 per car' },
      { title: 'Premium Car Wash', price: 400, priceRange: '₹300–600 per car' },
      { title: 'Interior Cleaning', price: 300, priceRange: '₹200–500 per car' },
      { title: 'Full Car Detailing', price: 1500, priceRange: '₹1,000–2,500 per car' },
      { title: 'Bike Wash', price: 100, priceRange: '₹80–200 per bike' }
    ]
  },
  'Personal Trainer': {
    icon: 'T',
    color: 'bg-emerald-100 text-emerald-800',
    services: [
      { title: 'At Home Training', price: 650, priceRange: '₹300–1,000 per session' },
      { title: 'Online Fitness Training', price: 500, priceRange: '₹200–800 per session' },
      { title: 'Weight Loss Program', price: 800, priceRange: '₹500–1,200 per month' },
      { title: 'Muscle Building', price: 750, priceRange: '₹400–1,100 per month' },
      { title: 'Yoga Training', price: 600, priceRange: '₹300–900 per session' },
      { title: 'Nutrition Consultation', price: 400, priceRange: '₹200–600 per session' }
    ]
  },
  'Tutoring': {
    icon: 'T',
    color: 'bg-teal-100 text-teal-800',
    services: [
      { title: 'Math Tutoring', price: 600, priceRange: '₹200–1,000 per hour' },
      { title: 'Science Tutoring', price: 650, priceRange: '₹250–1,200 per hour' },
      { title: 'English Tutoring', price: 550, priceRange: '₹200–900 per hour' },
      { title: 'Computer Science', price: 800, priceRange: '₹300–1,500 per hour' },
      { title: '1-Hour Session', price: 600, priceRange: '₹200–1,000 per hour' }
    ]
  },
  'Beauty Services': {
    icon: 'B',
    color: 'bg-rose-100 text-rose-800',
    services: [
      { title: 'Haircut & Styling', price: 500, priceRange: '₹300–800 per session' },
      { title: 'Bridal Makeup', price: 5000, priceRange: '₹3,000–8,000 per session' },
      { title: 'Party Makeup', price: 1500, priceRange: '₹800–2,500 per session' },
      { title: 'Facial Treatment', price: 800, priceRange: '₹500–1,500 per session' },
      { title: 'Manicure & Pedicure', price: 600, priceRange: '₹400–1,000 per session' },
      { title: 'Hair Coloring', price: 1200, priceRange: '₹800–2,000 per session' }
    ]
  },
  'Babysitting': {
    icon: 'B',
    color: 'bg-amber-100 text-amber-800',
    services: [
      { title: 'Evening Babysitting', price: 350, priceRange: '₹200–500 per hour' },
      { title: 'Full Day Babysitting', price: 800, priceRange: '₹500–1,200 per day' },
      { title: 'Weekend Babysitting', price: 600, priceRange: '₹400–800 per day' },
      { title: 'Overnight Babysitting', price: 1200, priceRange: '₹800–1,500 per night' },
      { title: 'Educational Babysitting', price: 450, priceRange: '₹300–600 per hour' },
      { title: 'Emergency Babysitting', price: 500, priceRange: '₹350–700 per hour' }
    ]
  },
  'Pet Care': {
    icon: 'P',
    color: 'bg-lime-100 text-lime-800',
    services: [
      { title: 'Dog Walking', price: 250, priceRange: '₹100–400 per walk' },
      { title: 'Pet Sitting', price: 400, priceRange: '₹300–600 per day' },
      { title: 'Pet Grooming', price: 800, priceRange: '₹500–1,200 per session' },
      { title: 'Pet Training', price: 1000, priceRange: '₹600–1,500 per session' },
      { title: 'Pet Feeding', price: 200, priceRange: '₹150–350 per visit' },
      { title: 'Veterinary Care', price: 1500, priceRange: '₹800–2,500 per visit' }
    ]
  },
  'IT Support': {
    icon: 'I',
    color: 'bg-slate-100 text-slate-800',
    services: [
      { title: 'Software Installation', price: 1250, priceRange: '₹500–2,000 per task' },
      { title: 'Computer Repair', price: 800, priceRange: '₹400–1,500 per repair' },
      { title: 'Virus Removal', price: 600, priceRange: '₹300–1,000 per service' },
      { title: 'Data Recovery', price: 1500, priceRange: '₹800–2,500 per recovery' },
      { title: 'Network Setup', price: 1000, priceRange: '₹500–1,800 per setup' },
      { title: 'Printer Installation', price: 400, priceRange: '₹200–700 per installation' }
    ]
  },
  'Translation': {
    icon: 'T',
    color: 'bg-violet-100 text-violet-800',
    services: [
      { title: 'Document Translation', price: 725, priceRange: '₹250–1,200 per page' },
      { title: 'Website Translation', price: 2000, priceRange: '₹1,000–3,500 per page' },
      { title: 'Legal Document Translation', price: 1500, priceRange: '₹800–2,500 per page' },
      { title: 'Medical Translation', price: 1200, priceRange: '₹600–2,000 per page' },
      { title: 'Technical Translation', price: 1000, priceRange: '₹500–1,800 per page' },
      { title: 'Certified Translation', price: 1800, priceRange: '₹1,000–3,000 per page' }
    ]
  },
  'Handyman': {
    icon: 'H',
    color: 'bg-gray-100 text-gray-800',
    services: [
      { title: 'General Repairs', price: 650, priceRange: '₹300–1,000 per job' },
      { title: 'Furniture Assembly', price: 400, priceRange: '₹200–700 per item' },
      { title: 'Picture Hanging', price: 200, priceRange: '₹100–400 per picture' },
      { title: 'Shelf Installation', price: 300, priceRange: '₹150–500 per shelf' },
      { title: 'Curtain Installation', price: 250, priceRange: '₹150–400 per curtain' },
      { title: 'Mirror Installation', price: 350, priceRange: '₹200–600 per mirror' }
    ]
  },
  'Event Planning': {
    icon: 'E',
    color: 'bg-fuchsia-100 text-fuchsia-800',
    services: [
      { title: 'Birthday Party Planning', price: 15000, priceRange: '₹8,000–25,000 per event' },
      { title: 'Wedding Planning', price: 50000, priceRange: '₹30,000–100,000+ per event' },
      { title: 'Corporate Event Planning', price: 25000, priceRange: '₹15,000–50,000 per event' },
      { title: 'Anniversary Celebration', price: 20000, priceRange: '₹12,000–35,000 per event' },
      { title: 'Baby Shower Planning', price: 12000, priceRange: '₹7,000–20,000 per event' },
      { title: 'Graduation Party Planning', price: 18000, priceRange: '₹10,000–30,000 per event' }
    ]
  },
  'Consultancy': {
    icon: 'C',
    color: 'bg-sky-100 text-sky-800',
    services: [
      { title: 'Business Consultation', price: 3500, priceRange: '₹1,000–6,000 per session/hour' },
      { title: 'Tax Consultation', price: 2500, priceRange: '₹800–4,000 per session/hour' },
      { title: 'Legal Consultation', price: 4000, priceRange: '₹2,000–8,000 per session/hour' },
      { title: 'Financial Planning', price: 3000, priceRange: '₹1,500–5,000 per session/hour' },
      { title: 'HR Consultation', price: 2800, priceRange: '₹1,200–4,500 per session/hour' },
      { title: 'Marketing Consultation', price: 3200, priceRange: '₹1,500–5,500 per session/hour' }
    ]
  }
};

export const generateMockServices = () => {
  const mockServices = [];
  let id = 1;
  
  // Create specific service listings with proper names and descriptions
  const specificServices = [
    {
      title: 'Plumbing Service',
      category: 'Plumbing',
      location: 'Hyderabad',
      description: 'Expert plumbing for your home. 24/7 emergency support, licensed professionals, and guaranteed work quality.',
      price: 500
    },
    {
      title: 'Math Tutoring',
      category: 'Tutoring',
      location: 'Bangalore',
      description: 'Math lessons for all grades. Personalized learning approach, flexible scheduling, and proven results.',
      price: 300
    },
    {
      title: 'Car Wash',
      category: 'Car Wash/Detailing',
      location: 'Chennai',
      description: 'Quick and affordable car wash. Professional service with attention to detail.',
      price: 200
    },
    {
      title: 'Home Cleaning Service',
      category: 'Home Cleaning',
      location: 'Mumbai',
      description: 'Professional home cleaning services. Deep cleaning, regular maintenance, and eco-friendly products.',
      price: 400
    },
    {
      title: 'Electrical Repair',
      category: 'Electrical',
      location: 'Delhi',
      description: 'Certified electricians for all electrical work. Safety first approach with modern tools.',
      price: 350
    },
    {
      title: 'Carpentry Work',
      category: 'Carpentry',
      location: 'Pune',
      description: 'Skilled carpenters for custom woodwork. Quality materials and precise craftsmanship.',
      price: 450
    },
    {
      title: 'Painting Service',
      category: 'Home Painting',
      location: 'Kolkata',
      description: 'Professional painting services with premium paints. Clean finish and timely completion.',
      price: 600
    },
    {
      title: 'Pest Control',
      category: 'Pest Control',
      location: 'Ahmedabad',
      description: 'Safe and effective pest control solutions. Licensed professionals with eco-friendly options.',
      price: 800
    },
    {
      title: 'Appliance Repair',
      category: 'Appliance Repair',
      location: 'Hyderabad',
      description: 'Expert repair services with genuine parts. Quick turnaround time and warranty included.',
      price: 300
    },
    {
      title: 'Landscaping Service',
      category: 'Landscaping',
      location: 'Bangalore',
      description: 'Creative landscaping solutions for your outdoor space. Garden design and maintenance.',
      price: 1200
    },
    {
      title: 'Moving Service',
      category: 'Moving/Logistics',
      location: 'Chennai',
      description: 'Reliable moving services with careful handling. Packing, moving, and unpacking included.',
      price: 2500
    },
    {
      title: 'Personal Training',
      category: 'Personal Trainer',
      location: 'Mumbai',
      description: 'Certified personal trainers for fitness goals. Customized workout plans and nutrition guidance.',
      price: 650
    },
    {
      title: 'Beauty Services',
      category: 'Beauty Services',
      location: 'Delhi',
      description: 'Professional beauty services at your convenience. Skilled beauticians with quality products.',
      price: 800
    },
    {
      title: 'Babysitting Service',
      category: 'Babysitting',
      location: 'Pune',
      description: 'Trusted and experienced babysitters. Safe and engaging childcare services.',
      price: 350
    },
    {
      title: 'Pet Care Service',
      category: 'Pet Care',
      location: 'Kolkata',
      description: 'Loving pet care services. Experienced handlers with attention to your pet\'s needs.',
      price: 400
    },
    {
      title: 'IT Support Service',
      category: 'IT Support',
      location: 'Ahmedabad',
      description: 'Technical support for all IT issues. Quick resolution and ongoing maintenance.',
      price: 500
    },
    {
      title: 'Translation Service',
      category: 'Translation',
      location: 'Hyderabad',
      description: 'Professional translation services. Accurate and culturally appropriate translations.',
      price: 600
    },
    {
      title: 'Handyman Service',
      category: 'Handyman',
      location: 'Bangalore',
      description: 'Versatile handyman services for all home repairs. Reliable and affordable solutions.',
      price: 450
    },
    {
      title: 'Event Planning Service',
      category: 'Event Planning',
      location: 'Chennai',
      description: 'Complete event planning and management. From concept to execution with attention to detail.',
      price: 5000
    },
    {
      title: 'Consultancy Service',
      category: 'Consultancy',
      location: 'Mumbai',
      description: 'Expert consultation services. Professional advice for business and personal needs.',
      price: 1000
    }
  ];

  specificServices.forEach(service => {
    mockServices.push({
      _id: id.toString(),
      title: service.title,
      category: service.category,
      location: service.location,
      description: service.description,
      price: service.price
    });
    id++;
  });
  
  return mockServices;
};

const getRandomLocation = () => {
  const locations = [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata', 'Ahmedabad',
    'Jaipur', 'Surat', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal',
    'Visakhapatnam', 'Pimpri-Chinchwad', 'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana',
    'Agra', 'Nashik', 'Faridabad', 'Meerut', 'Rajkot', 'Kalyan-Dombivali', 'Vasai-Virar'
  ];
  return locations[Math.floor(Math.random() * locations.length)];
};

const generateDescription = (category, title) => {
  const descriptions = {
    'Home Cleaning': 'Professional cleaning services with eco-friendly products. Trained staff, guaranteed satisfaction.',
    'Appliance Repair': 'Expert repair services with genuine parts. Quick turnaround time and warranty included.',
    'Plumbing': 'Licensed plumbers with 24/7 emergency support. Quality workmanship and fair pricing.',
    'Electrical': 'Certified electricians for all electrical work. Safety first approach with modern tools.',
    'Carpentry': 'Skilled carpenters for custom woodwork. Quality materials and precise craftsmanship.',
    'Home Painting': 'Professional painting services with premium paints. Clean finish and timely completion.',
    'Landscaping': 'Creative landscaping solutions for your outdoor space. Garden design and maintenance.',
    'Pest Control': 'Safe and effective pest control solutions. Licensed professionals with eco-friendly options.',
    'Moving/Logistics': 'Reliable moving services with careful handling. Packing, moving, and unpacking included.',
    'Car Wash/Detailing': 'Professional car care services. Interior and exterior cleaning with premium products.',
    'Personal Trainer': 'Certified personal trainers for fitness goals. Customized workout plans and nutrition guidance.',
    'Tutoring': 'Experienced tutors for academic excellence. Personalized learning approach and flexible scheduling.',
    'Beauty Services': 'Professional beauty services at your convenience. Skilled beauticians with quality products.',
    'Babysitting': 'Trusted and experienced babysitters. Safe and engaging childcare services.',
    'Pet Care': 'Loving pet care services. Experienced handlers with attention to your pet\'s needs.',
    'IT Support': 'Technical support for all IT issues. Quick resolution and ongoing maintenance.',
    'Translation': 'Professional translation services. Accurate and culturally appropriate translations.',
    'Handyman': 'Versatile handyman services for all home repairs. Reliable and affordable solutions.',
    'Event Planning': 'Complete event planning and management. From concept to execution with attention to detail.',
    'Consultancy': 'Expert consultation services. Professional advice for business and personal needs.'
  };
  
  return descriptions[category] || 'Professional service with guaranteed quality and customer satisfaction.';
}; 