import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  GraduationCap, Bell, Image, Mail, LogOut, Plus, Trash2, Edit2, 
  Eye, EyeOff, Menu, X, Home, Check, FileText, Upload, UserPlus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Notice, GalleryAlbum, GalleryImageItem, ContactMessage, AdmissionForm, NoticeAttachmentData } from '@/types';
import NoticeAttachment from '@/components/shared/NoticeAttachment';
import MultiFileUploader, { FileWithPreview } from '@/components/admin/MultiFileUploader';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type AdminTab = 'notices' | 'gallery' | 'messages' | 'admissions';

/**
 * Admin Panel Component
 * 
 * BACKEND INTEGRATION NOTES:
 * ==========================
 * All data is currently stored in component state.
 * 
 * TODO: Replace with API calls:
 * - GET /api/notices, /api/gallery, /api/messages, /api/admissions
 * - POST/PUT/DELETE for CRUD operations
 * - Implement loading states and error handling
 */

// Initial data - stored in component state
// TODO: Replace with API fetches from backend
const initialNotices: Notice[] = [
  { 
    id: '1', 
    title: '📚 Annual Examination Schedule Released - Check Academic Calendar', 
    description: 'The examination schedule for the upcoming annual exams has been released. Students and parents are requested to check the academic calendar for detailed timing.',
    fullContent: 'The examination schedule for the upcoming annual exams has been released. Students and parents are requested to check the academic calendar for detailed timing.\n\nThe examinations will commence from January 20, 2025, and will continue till February 15, 2025. All students are advised to prepare well and follow the schedule strictly.\n\nKey Points:\n- Hall tickets will be distributed from January 15, 2025\n- Students must report 30 minutes before the exam\n- Carry necessary stationery items\n- Mobile phones are strictly prohibited in the examination hall\n\nFor any queries, please contact the examination cell.',
    date: '2024-12-20', 
    attachment: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800',
    attachmentType: 'image',
    isNew: true 
  },
  { 
    id: '2', 
    title: '🏆 Congratulations to our students for winning Inter-School Sports Championship!', 
    description: 'Our school has won the prestigious Inter-School Sports Championship. Congratulations to all participating students and coaches.',
    fullContent: 'We are proud to announce that our school has won the prestigious Inter-School Sports Championship held at the National Stadium from December 10-15, 2024.\n\nOur students secured first position in multiple events including:\n- Basketball (Senior Category)\n- Football (Junior Category)\n- Athletics - 100m and 200m races\n- Table Tennis (Boys and Girls)\n\nSpecial congratulations to:\n- Rajan Sharma - Best Athlete Award\n- Anita Gurung - Best Football Player\n- The Basketball Team - Undefeated Champions\n\nWe thank all the coaches, parents, and staff for their continuous support. This victory is a testament to our commitment to holistic education.',
    date: '2024-12-18', 
    attachment: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800',
    attachmentType: 'image',
    isNew: true 
  },
  { 
    id: '3', 
    title: '📅 Winter Vacation: December 25, 2024 - January 5, 2025', 
    description: 'The school will remain closed for winter vacation from December 25, 2024, to January 5, 2025. Classes resume on January 6, 2025.',
    fullContent: 'The school will remain closed for winter vacation from December 25, 2024, to January 5, 2025. Classes will resume on January 6, 2025.\n\nDuring the vacation period:\n- The school office will remain open from 10 AM to 2 PM for urgent matters\n- Library will remain closed\n- Hostel students can either stay or go home with written permission from parents\n\nWe wish all students and their families a joyful holiday season!\n\nNote: Students are encouraged to complete their holiday assignments and revise for the upcoming examinations.',
    date: '2024-12-15', 
    isNew: false 
  },
  { 
    id: '4', 
    title: '🎭 Annual Cultural Program on January 15, 2025 - Parents are cordially invited', 
    description: 'The Annual Cultural Program 2025 will be held on January 15, 2025. All parents and guardians are cordially invited to attend.',
    fullContent: 'We are pleased to invite all parents and guardians to our Annual Cultural Program 2025.\n\nEvent Details:\n- Date: January 15, 2025\n- Time: 10:00 AM onwards\n- Venue: School Auditorium\n\nProgram Highlights:\n- Welcome Dance by Pre-Primary Students\n- Drama: "The Value of Education"\n- Musical Performance by School Band\n- Traditional Dance Performances\n- Prize Distribution Ceremony\n- Annual Report Presentation\n\nPlease confirm your attendance by January 10, 2025, at the school office or through the class teacher.\n\nWe look forward to your gracious presence!',
    date: '2024-12-10', 
    attachment: 'https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?w=800',
    attachmentType: 'image',
    isNew: false 
  },
  { 
    id: '5', 
    title: '📝 Admission Open for Academic Year 2025-2026 - Apply Now!', 
    description: 'Admissions are now open for the academic year 2025-2026 for classes Nursery to Class 10. Apply now to secure your child\'s future.',
    fullContent: 'Admissions are now open for the academic year 2025-2026 for classes Nursery to Class 10.\n\nKey Dates:\n- Application Start: December 1, 2024\n- Application Deadline: February 28, 2025\n- Entrance Test: March 10-15, 2025\n- Results: March 25, 2025\n\nDocuments Required:\n- Birth Certificate\n- Previous Academic Records\n- Character Certificate (for Class 6 and above)\n- Passport-size photographs (4 copies)\n- Parents\' ID proof\n\nWhy Choose Us:\n- Experienced and dedicated faculty\n- Modern infrastructure and facilities\n- Focus on holistic development\n- Excellent academic track record\n- Safe and nurturing environment\n\nFor more information, visit our Admission page or contact the school office.',
    date: '2024-12-05', 
    attachment: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800',
    attachmentType: 'image',
    isNew: true 
  },
];

const initialGalleryAlbums: GalleryAlbum[] = [
  { 
    id: '1', 
    title: 'School Building & Campus',
    coverImage: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800',
    images: [
      { id: '1-1', url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800', alt: 'Main Building' },
      { id: '1-2', url: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800', alt: 'Campus View' },
      { id: '1-3', url: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=800', alt: 'School Gate' },
    ],
    date: '2024-12-01' 
  },
  { 
    id: '2', 
    title: 'Classroom Activities',
    coverImage: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800',
    images: [
      { id: '2-1', url: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800', alt: 'Students Learning' },
      { id: '2-2', url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800', alt: 'Teacher Teaching' },
    ],
    date: '2024-11-28' 
  },
  { 
    id: '3', 
    title: 'Annual Sports Day 2024',
    coverImage: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800',
    images: [
      { id: '3-1', url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800', alt: 'Sports Day Opening' },
      { id: '3-2', url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800', alt: 'Football Match' },
    ],
    date: '2024-11-25' 
  },
  { 
    id: '4', 
    title: 'Library & Reading',
    coverImage: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800',
    images: [
      { id: '4-1', url: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800', alt: 'School Library' },
      { id: '4-2', url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800', alt: 'Students Reading' },
    ],
    date: '2024-11-20' 
  },
  { 
    id: '5', 
    title: 'Science Laboratory',
    coverImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
    images: [
      { id: '5-1', url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800', alt: 'Science Lab' },
      { id: '5-2', url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800', alt: 'Chemistry Experiment' },
    ],
    date: '2024-11-15' 
  },
  { 
    id: '6', 
    title: 'Cultural Program 2024',
    coverImage: 'https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?w=800',
    images: [
      { id: '6-1', url: 'https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?w=800', alt: 'Dance Performance' },
      { id: '6-2', url: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800', alt: 'Music Performance' },
    ],
    date: '2024-11-10' 
  },
];

const initialMessages: ContactMessage[] = [
  { id: '1', name: 'Ram Sharma', email: 'ram@example.com', phone: '+977-9841234567', message: 'I would like to know about the admission process for Class 5.', date: '2024-12-20', isRead: false },
  { id: '2', name: 'Sita Thapa', email: 'sita@example.com', phone: '+977-9851234567', message: 'What are the school timings and transportation facilities?', date: '2024-12-19', isRead: true },
  { id: '3', name: 'Hari Prasad', email: 'hari@example.com', phone: '+977-9861234567', message: 'Please share the fee structure for boarding students.', date: '2024-12-18', isRead: false },
];

const initialAdmissions: AdmissionForm[] = [
  { id: '1', name: 'Arun Kumar', phone: '+977-9801234567', email: 'arun@example.com', address: 'Biratnagar-10, Morang', classApplying: 'Class 5', message: 'Looking for admission for my son in the upcoming academic year.', date: '2024-12-20', status: 'pending' },
  { id: '2', name: 'Sunita Rai', phone: '+977-9812345678', email: 'sunita@example.com', address: 'Dharan-5, Sunsari', classApplying: 'Class 8', message: 'We are relocating from Kathmandu and would like to know about hostel facilities.', date: '2024-12-19', status: 'reviewed' },
  { id: '3', name: 'Bikash Limbu', phone: '+977-9823456789', email: 'bikash@example.com', address: 'Itahari-8, Sunsari', classApplying: 'Nursery', message: 'I want to enroll my daughter in nursery for the 2025 session.', date: '2024-12-18', status: 'approved' },
];

// Export notices for use in other pages (Notices, NoticeDetail, NewsTicker)
// TODO: Replace with shared state management or API calls
export { initialNotices as notices };
export { initialGalleryAlbums as galleryAlbums };

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>('notices');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // State for managing data - component level state
  // TODO: Replace with API calls and global state management
  const [notices, setNotices] = useState<Notice[]>(initialNotices);
  const [galleryAlbums, setGalleryAlbums] = useState<GalleryAlbum[]>(initialGalleryAlbums);
  const [messages, setMessages] = useState<ContactMessage[]>(initialMessages);
  const [admissions, setAdmissions] = useState<AdmissionForm[]>(initialAdmissions);

  // Form visibility states
  const [showAddNoticeForm, setShowAddNoticeForm] = useState(false);
  const [showAddImageForm, setShowAddImageForm] = useState(false);

  // Edit states
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
  const [newNotice, setNewNotice] = useState({ 
    title: '', 
    description: '', 
    fullContent: '', 
    isNew: true 
  });
  
  // Multiple notice attachments
  const [noticeAttachments, setNoticeAttachments] = useState<FileWithPreview[]>([]);
  const [editingNoticeAttachments, setEditingNoticeAttachments] = useState<NoticeAttachmentData[]>([]);
  const [newEditAttachments, setNewEditAttachments] = useState<FileWithPreview[]>([]);
  
  // Gallery state
  const [newGalleryTitle, setNewGalleryTitle] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<{ file: File; preview: string; alt: string }[]>([]);
  const [editingGallery, setEditingGallery] = useState<GalleryAlbum | null>(null);
  const [editGalleryImages, setEditGalleryImages] = useState<GalleryImageItem[]>([]);
  const [newEditGalleryFiles, setNewEditGalleryFiles] = useState<{ file: File; preview: string; alt: string }[]>([]);

  // Modal states
  const [viewingMessage, setViewingMessage] = useState<ContactMessage | null>(null);
  const [viewingAdmission, setViewingAdmission] = useState<AdmissionForm | null>(null);

  const handleLogout = () => {
    logout();
    toast({ title: 'Logged Out', description: 'You have been logged out successfully.' });
    navigate('/');
  };

  const tabs = [
    { id: 'notices' as AdminTab, label: 'Notices', icon: Bell, count: notices.length },
    { id: 'gallery' as AdminTab, label: 'Gallery', icon: Image, count: galleryAlbums.length },
    { id: 'messages' as AdminTab, label: 'Messages', icon: Mail, count: messages.filter(m => !m.isRead).length },
    { id: 'admissions' as AdminTab, label: 'Admissions', icon: UserPlus, count: admissions.filter(a => a.status === 'pending').length },
  ];

  // Notice attachment helpers
  const clearNoticeAttachments = () => {
    noticeAttachments.forEach(f => URL.revokeObjectURL(f.preview));
    setNoticeAttachments([]);
  };

  const clearEditAttachments = () => {
    newEditAttachments.forEach(f => URL.revokeObjectURL(f.preview));
    setNewEditAttachments([]);
    setEditingNoticeAttachments([]);
  };

  const removeExistingAttachment = (id: string) => {
    setEditingNoticeAttachments(prev => prev.filter(a => a.id !== id));
  };

  // Notice CRUD
  const addNotice = () => {
    if (!newNotice.title.trim()) return;
    
    const attachments: NoticeAttachmentData[] = noticeAttachments.map(f => ({
      id: f.id,
      url: f.preview,
      type: f.type,
      name: f.name
    }));
    
    const notice: Notice = {
      id: Date.now().toString(),
      title: newNotice.title,
      description: newNotice.description || newNotice.title,
      fullContent: newNotice.fullContent || newNotice.description || newNotice.title,
      date: new Date().toISOString().split('T')[0],
      attachments: attachments.length > 0 ? attachments : undefined,
      isNew: newNotice.isNew,
    };
    setNotices([notice, ...notices]);
    setNewNotice({ title: '', description: '', fullContent: '', isNew: true });
    setNoticeAttachments([]);
    setShowAddNoticeForm(false);
    toast({ title: 'Notice Added', description: 'New notice has been published.' });
  };

  const startEditingNotice = (notice: Notice) => {
    setEditingNotice(notice);
    setEditingNoticeAttachments(notice.attachments || []);
    setNewEditAttachments([]);
  };

  const updateNotice = () => {
    if (!editingNotice) return;
    
    const newAttachments: NoticeAttachmentData[] = newEditAttachments.map(f => ({
      id: f.id,
      url: f.preview,
      type: f.type,
      name: f.name
    }));
    
    const updatedNotice: Notice = {
      ...editingNotice,
      attachments: [...editingNoticeAttachments, ...newAttachments].length > 0 
        ? [...editingNoticeAttachments, ...newAttachments] 
        : undefined
    };
    
    setNotices(notices.map(n => n.id === editingNotice.id ? updatedNotice : n));
    setEditingNotice(null);
    clearEditAttachments();
    toast({ title: 'Notice Updated', description: 'Notice has been updated successfully.' });
  };

  const deleteNotice = (id: string) => {
    setNotices(notices.filter(n => n.id !== id));
    toast({ title: 'Notice Deleted', description: 'Notice has been removed.' });
  };

  // Gallery CRUD
  const handleImageFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const newFiles = files.map(file => ({
        file,
        preview: URL.createObjectURL(file),
        alt: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ')
      }));
      setSelectedFiles([...selectedFiles, ...newFiles]);
    }
    e.target.value = '';
  };

  const updateFileAlt = (index: number, alt: string) => {
    setSelectedFiles(selectedFiles.map((f, i) => i === index ? { ...f, alt } : f));
  };

  const removeSelectedFile = (index: number) => {
    URL.revokeObjectURL(selectedFiles[index].preview);
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const addGalleryAlbum = () => {
    if (!newGalleryTitle.trim()) {
      toast({ title: 'Error', description: 'Please enter a gallery title.', variant: 'destructive' });
      return;
    }
    if (selectedFiles.length === 0) {
      toast({ title: 'Error', description: 'Please select at least one image.', variant: 'destructive' });
      return;
    }

    const images: GalleryImageItem[] = selectedFiles.map((file, index) => ({
      id: `${Date.now()}-${index}`,
      url: file.preview,
      alt: file.alt || `Image ${index + 1}`,
    }));

    const newAlbum: GalleryAlbum = {
      id: Date.now().toString(),
      title: newGalleryTitle,
      images: images,
      coverImage: images[0].url,
      date: new Date().toISOString().split('T')[0],
    };

    setGalleryAlbums([newAlbum, ...galleryAlbums]);
    setNewGalleryTitle('');
    setSelectedFiles([]);
    setShowAddImageForm(false);
    toast({ title: 'Gallery Added', description: `"${newGalleryTitle}" with ${images.length} image(s) added.` });
  };

  const startEditingGallery = (album: GalleryAlbum) => {
    setEditingGallery(album);
    setEditGalleryImages([...album.images]);
    setNewEditGalleryFiles([]);
  };

  const updateGalleryAlbum = () => {
    if (!editingGallery) return;

    const newImages: GalleryImageItem[] = newEditGalleryFiles.map((file, index) => ({
      id: `${Date.now()}-${index}`,
      url: file.preview,
      alt: file.alt || `Image ${index + 1}`,
    }));

    const allImages = [...editGalleryImages, ...newImages];

    const updatedAlbum: GalleryAlbum = {
      ...editingGallery,
      images: allImages,
      coverImage: allImages.length > 0 ? allImages[0].url : editingGallery.coverImage,
    };

    setGalleryAlbums(galleryAlbums.map(g => g.id === editingGallery.id ? updatedAlbum : g));
    setEditingGallery(null);
    setEditGalleryImages([]);
    setNewEditGalleryFiles([]);
    toast({ title: 'Gallery Updated', description: 'Gallery album has been updated successfully.' });
  };

  const removeEditGalleryImage = (imageId: string) => {
    setEditGalleryImages(editGalleryImages.filter(img => img.id !== imageId));
  };

  const handleEditGalleryFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const newFiles = files.map(file => ({
        file,
        preview: URL.createObjectURL(file),
        alt: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ')
      }));
      setNewEditGalleryFiles([...newEditGalleryFiles, ...newFiles]);
    }
    e.target.value = '';
  };

  const removeNewEditFile = (index: number) => {
    URL.revokeObjectURL(newEditGalleryFiles[index].preview);
    setNewEditGalleryFiles(newEditGalleryFiles.filter((_, i) => i !== index));
  };

  const deleteGalleryAlbum = (id: string) => {
    setGalleryAlbums(galleryAlbums.filter(album => album.id !== id));
    toast({ title: 'Gallery Deleted', description: 'Gallery album has been removed.' });
  };

  // Message CRUD
  const toggleMessageRead = (id: string) => {
    setMessages(messages.map(m => m.id === id ? { ...m, isRead: !m.isRead } : m));
  };

  const deleteMessage = (id: string) => {
    setMessages(messages.filter(m => m.id !== id));
    setViewingMessage(null);
    toast({ title: 'Message Deleted', description: 'Message has been removed.' });
  };

  // Admission CRUD
  const updateAdmissionStatus = (id: string, status: AdmissionForm['status']) => {
    setAdmissions(admissions.map(a => a.id === id ? { ...a, status } : a));
    if (viewingAdmission?.id === id) {
      setViewingAdmission({ ...viewingAdmission, status });
    }
    toast({ title: 'Status Updated', description: `Admission status updated to ${status}.` });
  };

  const deleteAdmission = (id: string) => {
    setAdmissions(admissions.filter(a => a.id !== id));
    setViewingAdmission(null);
    toast({ title: 'Admission Deleted', description: 'Admission record has been removed.' });
  };

  return (
    <div className="h-screen bg-background flex overflow-hidden">
      {/* Sidebar */}
      <aside className={cn(
        'fixed lg:static inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transition-transform duration-300 h-screen overflow-hidden',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-20'
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-border shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-11 h-10 flex items-center justify-center">
                <img src="images/logo1.png" alt="School Logo" className="w-6 h-6" />
              </div>
              {isSidebarOpen && (
                <div>
                  <h2 className="font-heading font-bold text-foreground">Admin</h2>
                  <p className="text-xs text-muted-foreground">Brilliant Sagarmatha</p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <tab.icon className="w-5 h-5" />
                {isSidebarOpen && (
                  <>
                    <span className="flex-1 text-left">{tab.label}</span>
                    {tab.count > 0 && (
                      <span className={cn(
                        'px-2 py-0.5 rounded-full text-xs font-medium',
                        activeTab === tab.id ? 'bg-primary-foreground/20' : 'bg-primary/10 text-primary'
                      )}>
                        {tab.count}
                      </span>
                    )}
                  </>
                )}
              </button>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border space-y-2 shrink-0">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3"
              onClick={() => navigate('/')}
            >
              <Home className="w-5 h-5" />
              {isSidebarOpen && 'Back to Site'}
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-destructive hover:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5" />
              {isSidebarOpen && 'Logout'}
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto flex flex-col">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-sm border-b border-border">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
              <h1 className="font-heading text-xl font-bold text-foreground capitalize">
                {activeTab} Management
              </h1>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="hidden lg:flex"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </header>

        {/* Content */}
        <div className="p-6 flex-1">
          {/* Notices Tab */}
          {activeTab === 'notices' && (
            <div className="space-y-6">
              {!showAddNoticeForm && !editingNotice && (
                <Button onClick={() => setShowAddNoticeForm(true)} className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Notice
                </Button>
              )}

              {/* Add Notice Form */}
              {showAddNoticeForm && (
                <div className="bg-card rounded-xl p-4 sm:p-6 shadow-md border border-border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-foreground">Add New Notice</h3>
                    <Button variant="ghost" size="icon" onClick={() => {
                      setShowAddNoticeForm(false);
                      clearNoticeAttachments();
                    }}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="notice-title" className="block mb-2">Title *</Label>
                      <Input
                        id="notice-title"
                        placeholder="Enter notice title..."
                        value={newNotice.title}
                        onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="notice-desc" className="block mb-2">Short Description</Label>
                      <Input
                        id="notice-desc"
                        placeholder="Brief description for listing..."
                        value={newNotice.description}
                        onChange={(e) => setNewNotice({ ...newNotice, description: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="notice-content" className="block mb-2">Full Content</Label>
                      <Textarea
                        id="notice-content"
                        placeholder="Full notice content..."
                        value={newNotice.fullContent}
                        onChange={(e) => setNewNotice({ ...newNotice, fullContent: e.target.value })}
                        rows={6}
                      />
                    </div>
                    
                    <MultiFileUploader
                      files={noticeAttachments}
                      onChange={setNoticeAttachments}
                      label="Attachments (Multiple Images & PDFs)"
                    />
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={newNotice.isNew}
                          onChange={(e) => setNewNotice({ ...newNotice, isNew: e.target.checked })}
                          className="rounded border-border"
                        />
                        Mark as New
                      </label>
                      <div className="flex gap-2 w-full sm:w-auto">
                        <Button variant="outline" onClick={() => {
                          setShowAddNoticeForm(false);
                          clearNoticeAttachments();
                        }} className="flex-1 sm:flex-none">
                          Cancel
                        </Button>
                        <Button onClick={addNotice} disabled={!newNotice.title.trim()} className="flex-1 sm:flex-none">
                          <Plus className="w-4 h-4" />
                          Add Notice
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Edit Notice Form */}
              {editingNotice && (
                <div className="bg-card rounded-xl p-4 sm:p-6 shadow-md border-2 border-primary">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-foreground text-lg">Edit Notice</h3>
                    <Button variant="ghost" size="icon" onClick={() => {
                      setEditingNotice(null);
                      clearEditAttachments();
                    }}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <Label className="block mb-2">Title *</Label>
                      <Input
                        value={editingNotice.title}
                        onChange={(e) => setEditingNotice({ ...editingNotice, title: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label className="block mb-2">Short Description</Label>
                      <Input
                        value={editingNotice.description}
                        onChange={(e) => setEditingNotice({ ...editingNotice, description: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label className="block mb-2">Full Content</Label>
                      <Textarea
                        value={editingNotice.fullContent}
                        onChange={(e) => setEditingNotice({ ...editingNotice, fullContent: e.target.value })}
                        rows={10}
                        className="min-h-[200px]"
                      />
                    </div>
                    
                    <MultiFileUploader
                      files={newEditAttachments}
                      onChange={setNewEditAttachments}
                      existingAttachments={editingNoticeAttachments}
                      onRemoveExisting={removeExistingAttachment}
                      label="Attachments (Images & PDFs)"
                    />
                    
                    <div>
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={editingNotice.isNew}
                          onChange={(e) => setEditingNotice({ ...editingNotice, isNew: e.target.checked })}
                          className="rounded border-border"
                        />
                        Mark as New
                      </label>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
                      <Button onClick={updateNotice} className="flex-1 sm:flex-none">
                        Save Changes
                      </Button>
                      <Button variant="outline" onClick={() => {
                        setEditingNotice(null);
                        clearEditAttachments();
                      }} className="flex-1 sm:flex-none">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Notices List */}
              <div className="bg-card rounded-xl shadow-md overflow-hidden">
                <div className="p-4 border-b border-border">
                  <h3 className="font-semibold text-foreground">All Notices ({notices.length})</h3>
                </div>
                <div className="divide-y divide-border">
                  {notices.map((notice) => (
                    <div key={notice.id} className="p-4 flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          {notice.isNew && (
                            <span className="px-2 py-0.5 bg-school-gold text-school-dark text-xs font-bold rounded">
                              NEW
                            </span>
                          )}
                          <p className="text-foreground truncate">{notice.title}</p>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{notice.date}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => startEditingNotice(notice)}>
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive" onClick={() => deleteNotice(notice.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Gallery Tab */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              {!showAddImageForm && !editingGallery && (
                <Button onClick={() => setShowAddImageForm(true)} className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Gallery Album
                </Button>
              )}

              {/* Add Gallery Form */}
              {showAddImageForm && (
                <div className="bg-card rounded-xl p-6 shadow-md border border-border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-foreground">Create New Gallery Album</h3>
                    <Button variant="ghost" size="icon" onClick={() => {
                      setShowAddImageForm(false);
                      setNewGalleryTitle('');
                      selectedFiles.forEach(f => URL.revokeObjectURL(f.preview));
                      setSelectedFiles([]);
                    }}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="mb-4">
                    <Label htmlFor="gallery-title" className="block mb-2 text-sm font-medium">
                      Gallery Title *
                    </Label>
                    <Input
                      id="gallery-title"
                      placeholder="Enter gallery title (e.g., Annual Sports Day 2024)"
                      value={newGalleryTitle}
                      onChange={(e) => setNewGalleryTitle(e.target.value)}
                    />
                  </div>
                  
                  <div className="mb-4">
                    <Label htmlFor="image-upload" className="block mb-2 text-sm font-medium">
                      Select Images (Multiple)
                    </Label>
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageFilesChange}
                      className="cursor-pointer"
                    />
                  </div>

                  {selectedFiles.length > 0 && (
                    <div className="mb-4">
                      <Label className="block mb-2 text-sm font-medium">
                        Selected Images ({selectedFiles.length})
                      </Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {selectedFiles.map((file, index) => (
                          <div key={index} className="relative group">
                            <div className="aspect-square rounded-lg overflow-hidden border-2 border-border">
                              <img src={file.preview} alt={file.alt} className="w-full h-full object-cover" />
                            </div>
                            <button
                              onClick={() => removeSelectedFile(index)}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center shadow-md"
                            >
                              <X className="w-4 h-4" />
                            </button>
                            <Input
                              placeholder="Description"
                              value={file.alt}
                              onChange={(e) => updateFileAlt(index, e.target.value)}
                              className="mt-2 text-xs h-8"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => {
                      setShowAddImageForm(false);
                      setNewGalleryTitle('');
                      selectedFiles.forEach(f => URL.revokeObjectURL(f.preview));
                      setSelectedFiles([]);
                    }}>
                      Cancel
                    </Button>
                    <Button onClick={addGalleryAlbum} disabled={!newGalleryTitle.trim() || selectedFiles.length === 0}>
                      <Plus className="w-4 h-4" />
                      Create Gallery
                    </Button>
                  </div>
                </div>
              )}

              {/* Edit Gallery Form */}
              {editingGallery && (
                <div className="bg-card rounded-xl p-6 shadow-md border-2 border-primary">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-foreground">Edit Gallery Album</h3>
                    <Button variant="ghost" size="icon" onClick={() => {
                      setEditingGallery(null);
                      setEditGalleryImages([]);
                      newEditGalleryFiles.forEach(f => URL.revokeObjectURL(f.preview));
                      setNewEditGalleryFiles([]);
                    }}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="mb-4">
                    <Label className="block mb-2 text-sm font-medium">Gallery Title *</Label>
                    <Input
                      value={editingGallery.title}
                      onChange={(e) => setEditingGallery({ ...editingGallery, title: e.target.value })}
                    />
                  </div>

                  {editGalleryImages.length > 0 && (
                    <div className="mb-4">
                      <Label className="block mb-2 text-sm font-medium">Current Images ({editGalleryImages.length})</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {editGalleryImages.map((img) => (
                          <div key={img.id} className="relative group">
                            <div className="aspect-square rounded-lg overflow-hidden border-2 border-border">
                              <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                            </div>
                            <button
                              onClick={() => removeEditGalleryImage(img.id)}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center shadow-md"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mb-4">
                    <Label className="block mb-2 text-sm font-medium">Add More Images</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleEditGalleryFilesChange}
                      className="cursor-pointer"
                    />
                  </div>

                  {newEditGalleryFiles.length > 0 && (
                    <div className="mb-4">
                      <Label className="block mb-2 text-sm font-medium">New Images ({newEditGalleryFiles.length})</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {newEditGalleryFiles.map((file, index) => (
                          <div key={index} className="relative group">
                            <div className="aspect-square rounded-lg overflow-hidden border-2 border-green-500">
                              <img src={file.preview} alt={file.alt} className="w-full h-full object-cover" />
                            </div>
                            <button
                              onClick={() => removeNewEditFile(index)}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center shadow-md"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button onClick={updateGalleryAlbum}>Save Changes</Button>
                    <Button variant="outline" onClick={() => {
                      setEditingGallery(null);
                      setEditGalleryImages([]);
                      newEditGalleryFiles.forEach(f => URL.revokeObjectURL(f.preview));
                      setNewEditGalleryFiles([]);
                    }}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              {/* Gallery List */}
              <div className="bg-card rounded-xl shadow-md overflow-hidden">
                <div className="p-4 border-b border-border">
                  <h3 className="font-semibold text-foreground">All Gallery Albums ({galleryAlbums.length})</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                  {galleryAlbums.map((album) => (
                    <div key={album.id} className="relative group rounded-xl overflow-hidden shadow-md bg-muted">
                      <div className="aspect-video">
                        <img src={album.coverImage} alt={album.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Button variant="secondary" size="icon" onClick={() => startEditingGallery(album)}>
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="destructive" size="icon" onClick={() => deleteGalleryAlbum(album.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="p-3 bg-card">
                        <h4 className="font-semibold text-foreground truncate">{album.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {album.images.length} {album.images.length === 1 ? 'photo' : 'photos'} • {album.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                {galleryAlbums.length === 0 && (
                  <div className="p-12 text-center">
                    <Image className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No gallery albums yet</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === 'messages' && (
            <div className="space-y-4">
              <div className="bg-card rounded-xl shadow-md overflow-hidden">
                <div className="p-4 border-b border-border">
                  <h3 className="font-semibold text-foreground">
                    Contact Messages ({messages.length}) 
                    {messages.filter(m => !m.isRead).length > 0 && (
                      <span className="ml-2 text-sm font-normal text-muted-foreground">
                        ({messages.filter(m => !m.isRead).length} unread)
                      </span>
                    )}
                  </h3>
                </div>

                {messages.length === 0 ? (
                  <div className="p-12 text-center">
                    <Mail className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No messages yet</p>
                  </div>
                ) : (
                  <div className="divide-y divide-border">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={cn(
                          'p-4 flex items-center justify-between gap-4 transition-all',
                          !message.isRead && 'bg-primary/5'
                        )}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-foreground">{message.name}</h4>
                            {!message.isRead && (
                              <span className="px-2 py-0.5 bg-primary text-primary-foreground text-xs font-medium rounded">
                                New
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground truncate">{message.email}</p>
                          <p className="text-sm text-foreground truncate mt-1">{message.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{message.date}</p>
                        </div>
                        
                        <div className="flex gap-2 shrink-0">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button size="icon" className="bg-primary hover:bg-primary/90" onClick={() => setViewingMessage(message)}>
                                <Eye className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>View Message</TooltipContent>
                          </Tooltip>
                          
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                size="icon"
                                variant="outline"
                                className={cn(
                                  message.isRead 
                                    ? 'border-muted-foreground text-muted-foreground hover:bg-muted' 
                                    : 'border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-950'
                                )}
                                onClick={() => toggleMessageRead(message.id)}
                              >
                                {message.isRead ? <EyeOff className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>{message.isRead ? 'Mark as Unread' : 'Mark as Read'}</TooltipContent>
                          </Tooltip>
                          
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                size="icon"
                                variant="outline"
                                className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                                onClick={() => deleteMessage(message.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Delete Message</TooltipContent>
                          </Tooltip>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Admissions Tab */}
          {activeTab === 'admissions' && (
            <div className="space-y-4">
              <div className="bg-card rounded-xl shadow-md overflow-hidden">
                <div className="p-4 border-b border-border">
                  <h3 className="font-semibold text-foreground">
                    Admission Submissions ({admissions.length}) 
                    {admissions.filter(a => a.status === 'pending').length > 0 && (
                      <span className="ml-2 text-sm font-normal text-muted-foreground">
                        ({admissions.filter(a => a.status === 'pending').length} pending)
                      </span>
                    )}
                  </h3>
                </div>

                {admissions.length === 0 ? (
                  <div className="p-12 text-center">
                    <UserPlus className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No admission submissions yet</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full hidden md:table">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="text-left p-4 font-medium text-muted-foreground">Name</th>
                          <th className="text-left p-4 font-medium text-muted-foreground">Class</th>
                          <th className="text-left p-4 font-medium text-muted-foreground">Contact</th>
                          <th className="text-left p-4 font-medium text-muted-foreground">Date</th>
                          <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                          <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {admissions.map((admission) => (
                          <tr key={admission.id} className="hover:bg-muted/30 transition-colors">
                            <td className="p-4">
                              <p className="font-semibold text-foreground">{admission.name}</p>
                              <p className="text-sm text-muted-foreground truncate max-w-[200px]">{admission.email}</p>
                            </td>
                            <td className="p-4 text-foreground">{admission.classApplying}</td>
                            <td className="p-4">
                              <p className="text-foreground">{admission.phone}</p>
                            </td>
                            <td className="p-4 text-muted-foreground">{admission.date}</td>
                            <td className="p-4">
                              <span className={cn(
                                'px-2 py-1 text-xs font-medium rounded capitalize',
                                admission.status === 'pending' && 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
                                admission.status === 'reviewed' && 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
                                admission.status === 'approved' && 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
                                admission.status === 'rejected' && 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                              )}>
                                {admission.status}
                              </span>
                            </td>
                            <td className="p-4">
                              <div className="flex gap-2 justify-end">
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button size="icon" className="bg-primary hover:bg-primary/90" onClick={() => setViewingAdmission(admission)}>
                                      <Eye className="w-4 h-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>View Details</TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      size="icon"
                                      variant="outline"
                                      className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                                      onClick={() => deleteAdmission(admission.id)}
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>Delete</TooltipContent>
                                </Tooltip>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {/* Mobile View */}
                    <div className="md:hidden divide-y divide-border">
                      {admissions.map((admission) => (
                        <div key={admission.id} className="p-4 space-y-3">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h4 className="font-semibold text-foreground">{admission.name}</h4>
                              <p className="text-sm text-muted-foreground">{admission.classApplying}</p>
                            </div>
                            <span className={cn(
                              'px-2 py-1 text-xs font-medium rounded capitalize shrink-0',
                              admission.status === 'pending' && 'bg-yellow-100 text-yellow-800',
                              admission.status === 'reviewed' && 'bg-blue-100 text-blue-800',
                              admission.status === 'approved' && 'bg-green-100 text-green-800',
                              admission.status === 'rejected' && 'bg-red-100 text-red-800'
                            )}>
                              {admission.status}
                            </span>
                          </div>
                          <div className="text-sm space-y-1">
                            <p className="text-muted-foreground truncate">{admission.email}</p>
                            <p className="text-muted-foreground">{admission.phone}</p>
                            <p className="text-muted-foreground text-xs">{admission.date}</p>
                          </div>
                          <div className="flex gap-2 pt-2">
                            <Button size="sm" className="flex-1 gap-1" onClick={() => setViewingAdmission(admission)}>
                              <Eye className="w-4 h-4" />
                              View
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                              onClick={() => deleteAdmission(admission.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Message Detail Modal */}
      <Dialog open={!!viewingMessage} onOpenChange={(open) => !open && setViewingMessage(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl">Message from {viewingMessage?.name}</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Received on {viewingMessage?.date}
            </DialogDescription>
          </DialogHeader>
          
          {viewingMessage && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Email</p>
                  <p className="text-foreground font-medium">{viewingMessage.email}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Phone</p>
                  <p className="text-foreground font-medium">{viewingMessage.phone}</p>
                </div>
              </div>
              
              <div>
                <p className="text-muted-foreground mb-2 text-sm">Message</p>
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-foreground whitespace-pre-wrap">{viewingMessage.message}</p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => {
                if (viewingMessage) {
                  toggleMessageRead(viewingMessage.id);
                  setViewingMessage({ ...viewingMessage, isRead: !viewingMessage.isRead });
                }
              }}
              className="gap-2"
            >
              {viewingMessage?.isRead ? (
                <>
                  <EyeOff className="w-4 h-4" />
                  Mark as Unread
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" />
                  Mark as Read
                </>
              )}
            </Button>
            <Button
              variant="destructive"
              onClick={() => viewingMessage && deleteMessage(viewingMessage.id)}
              className="gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Admission Detail Modal */}
      <Dialog open={!!viewingAdmission} onOpenChange={(open) => !open && setViewingAdmission(null)}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">Admission Application</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Submitted on {viewingAdmission?.date}
            </DialogDescription>
          </DialogHeader>
          
          {viewingAdmission && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Name</p>
                  <p className="text-foreground font-medium">{viewingAdmission.name}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Class Applying For</p>
                  <p className="text-foreground font-medium">{viewingAdmission.classApplying}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Email</p>
                  <p className="text-foreground font-medium break-all">{viewingAdmission.email}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Phone</p>
                  <p className="text-foreground font-medium">{viewingAdmission.phone}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-muted-foreground mb-1">Address</p>
                  <p className="text-foreground font-medium">{viewingAdmission.address}</p>
                </div>
              </div>
              
              <div>
                <p className="text-muted-foreground mb-2 text-sm">Message</p>
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-foreground whitespace-pre-wrap">{viewingAdmission.message}</p>
                </div>
              </div>

              <div>
                <p className="text-muted-foreground mb-2 text-sm">Status</p>
                <div className="flex flex-wrap gap-2">
                  {(['pending', 'reviewed', 'approved', 'rejected'] as const).map((status) => (
                    <Button
                      key={status}
                      size="sm"
                      variant={viewingAdmission.status === status ? 'default' : 'outline'}
                      className={cn(
                        'capitalize',
                        viewingAdmission.status === status && status === 'pending' && 'bg-yellow-600 hover:bg-yellow-700',
                        viewingAdmission.status === status && status === 'reviewed' && 'bg-blue-600 hover:bg-blue-700',
                        viewingAdmission.status === status && status === 'approved' && 'bg-green-600 hover:bg-green-700',
                        viewingAdmission.status === status && status === 'rejected' && 'bg-red-600 hover:bg-red-700'
                      )}
                      onClick={() => updateAdmissionStatus(viewingAdmission.id, status)}
                    >
                      {status}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="destructive"
              onClick={() => viewingAdmission && deleteAdmission(viewingAdmission.id)}
              className="gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete Application
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Admin;
