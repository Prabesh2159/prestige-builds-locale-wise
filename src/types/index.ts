/**
 * Type Definitions - Backend Ready Structure
 * 
 * BACKEND INTEGRATION NOTES:
 * ==========================
 * All data models below are designed to be compatible with a database schema.
 * Each model has a unique `id` field for database primary keys.
 * 
 * API Integration Points:
 * - GET /api/notices - Fetch all notices
 * - GET /api/notices/:id - Fetch single notice
 * - POST /api/notices - Create notice (admin)
 * - PUT /api/notices/:id - Update notice (admin)
 * - DELETE /api/notices/:id - Delete notice (admin)
 * 
 * - GET /api/gallery - Fetch all gallery albums
 * - POST /api/gallery - Upload album (admin)
 * - PUT /api/gallery/:id - Update album (admin)
 * - DELETE /api/gallery/:id - Delete album (admin)
 * 
 * - POST /api/contact - Submit contact form
 * - GET /api/contact - Fetch messages (admin)
 * - PUT /api/contact/:id - Mark as read (admin)
 * 
 * - POST /api/admission - Submit admission form
 * - GET /api/admission - Fetch submissions (admin)
 * - PUT /api/admission/:id - Update status (admin)
 */

/**
 * Attachment interface for notice files (images and PDFs)
 * TODO: Backend Integration - Replace Object URLs with permanent storage URLs
 */
export interface NoticeAttachmentData {
  id: string;
  url: string;
  type: 'image' | 'pdf';
  name: string;
}

export interface Notice {
  id: string;
  title: string;
  description: string;
  fullContent: string;
  date: string;
  attachments?: NoticeAttachmentData[];
  attachment?: string;
  attachmentType?: 'image' | 'pdf';
  attachmentName?: string;
  isNew: boolean;
}

export interface GalleryImageItem {
  id: string;
  url: string;
  alt: string;
}

export interface GalleryAlbum {
  id: string;
  title: string;
  images: GalleryImageItem[];
  coverImage: string;
  date: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
  isRead: boolean;
}

export interface AdmissionForm {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  classApplying: string;
  message: string;
  date: string;
  status: 'pending' | 'reviewed' | 'approved' | 'rejected';
}

// School configuration constants
export const schoolInfo = {
  name: 'Brilliant Sagarmatha English Secondary Boarding School',
  shortName: 'Brilliant Sagarmatha',
  tagline: 'Nurturing Minds, Building Futures',
  address: 'Ramdhuni-05, Jhumka, Sunsari, Nepal',
  phone: '+977-025562490',
  email: 'uniquesagarmatha@gmail.com',
  website: '',
  established: '1995',
  students: '1200+',
  teachers: '80+',
  branches: '2',
};

export const principal = {
  name: 'Ghagendra Kumar Shrestha',
  position: 'Principal',
  image: 'images/principal.png',
  message: `Welcome to Brilliant Sagarmatha English Secondary Boarding School. For over two decades, we have been committed to providing quality education that nurtures young minds and prepares them for the challenges of tomorrow.

Our school believes in holistic development, combining academic excellence with character building, sports, and extracurricular activities. We strive to create an environment where every student can discover their potential and grow into responsible citizens.

I am proud of our dedicated faculty, state-of-the-art facilities, and the achievements of our students who have excelled in various fields. Together, we continue to uphold our motto of "Nurturing Minds, Building Futures."`,
};

export const vicePrincipal = {
  name: 'Dipendra Kumar Chaudhary',
  position: 'Vice Principal',
  image: 'images/viceprincipal.png',
  message: `As the Vice Principal, I am honored to be part of an institution that prioritizes both academic excellence and personal growth. Our approach to education goes beyond textbooks – we focus on developing critical thinking, creativity, and compassion in our students.

We maintain a supportive learning environment where students feel encouraged to explore, question, and innovate. Our comprehensive curriculum, combined with modern teaching methodologies, ensures that every child receives the best possible education.

I invite parents to partner with us in this beautiful journey of education. Together, we can help your children achieve their dreams and become the leaders of tomorrow.`,
};

export const classes = [
  'Montessori', 'Nursery', 'LKG', 'UKG', 
  'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 
  'Class 6', 'Class 7', 'Class 8', 'Class 9',
];

export const subjects = {
  primary: ['English', 'Nepali', 'Mathematics', 'Science', 'Social Studies', 'Computer', 'Health & Physical Education'],
  secondary: ['English', 'Nepali', 'Mathematics', 'Science', 'Social Studies', 'Computer', 'Optional Mathematics', 'Account', 'Health & Physical Education'],
};

export const facilities = [
  { icon: '🏫', title: 'Modern Classrooms', description: 'Spacious, well-ventilated classrooms with smart boards' },
  { icon: '🔬', title: 'Science Labs', description: 'Fully equipped Physics, Chemistry, and Biology laboratories' },
  { icon: '💻', title: 'Computer Lab', description: 'Latest computers with high-speed internet' },
  { icon: '📚', title: 'Library', description: 'Extensive collection of books, journals, and digital resources' },
  { icon: '🏐', title: 'Sports Complex', description: 'Volleyball court, football ground, and indoor games' },
];
