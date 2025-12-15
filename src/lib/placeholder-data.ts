import { Cadet, Camp, CampRegistration, Attendance, ActivityLog, User } from './definitions';

export const placeHolderImages = [
  {
    "id": "hero",
    "description": "NCC cadets marching in a parade",
    "imageUrl": "https://picsum.photos/seed/ncc-hero/1920/1080",
    "imageHint": "cadets marching"
  },
  {
    "id": "cadet-illustration",
    "description": "Illustration of an NCC cadet",
    "imageUrl": "/emblem.jpg",
    "imageHint": "cadet illustration"
  },
  {
    "id": "avatar-1",
    "description": "User avatar 1",
    "imageUrl": "https://picsum.photos/seed/avatar1/200/200",
    "imageHint": "person portrait"
  },
  {
    "id": "avatar-2",
    "description": "User avatar 2",
    "imageUrl": "https://picsum.photos/seed/avatar2/200/200",
    "imageHint": "person portrait"
  },
  {
    "id": "avatar-3",
    "description": "User avatar 3",
    "imageUrl": "https://picsum.photos/seed/avatar3/200/200",
    "imageHint": "person portrait"
  },
  {
    "id": "avatar-4",
    "description": "User avatar 4",
    "imageUrl": "https://picsum.photos/seed/avatar4/200/200",
    "imageHint": "person portrait"
  },
  {
    "id": "ncc-logo",
    "description": "NCC Logo",
    "imageUrl": "/ncc.png",
    "imageHint": "logo"
  }
];

export const mockCadets: Cadet[] = [
  { id: '1', regimentalNumber: 'KA/22/SD/A/123456', name: 'Aarav Sharma', email: 'aarav.sharma@example.com', phone: '9876543210', year: 2, rank: 'CDT', dept: 'CSE', enrolmentDate: '2022-08-15', avatarUrl: placeHolderImages.find(p => p.id === 'avatar-1')?.imageUrl },
  { id: '2', regimentalNumber: 'KA/23/SW/A/123457', name: 'Priya Patel', email: 'priya.patel@example.com', phone: '9876543211', year: 1, rank: 'CDT', dept: 'ECE', enrolmentDate: '2023-08-15', avatarUrl: placeHolderImages.find(p => p.id === 'avatar-2')?.imageUrl },
  { id: '3', regimentalNumber: 'KA/21/SD/A/123458', name: 'Rohan Singh', email: 'rohan.singh@example.com', phone: '9876543212', year: 3, rank: 'SGT', dept: 'ME', enrolmentDate: '2021-08-15', avatarUrl: placeHolderImages.find(p => p.id === 'avatar-3')?.imageUrl },
  { id: '4', regimentalNumber: 'KA/22/SW/A/123459', name: 'Sneha Verma', email: 'sneha.verma@example.com', phone: '9876543213', year: 2, rank: 'CPL', dept: 'CSE', enrolmentDate: '2022-08-15', avatarUrl: placeHolderImages.find(p => p.id === 'avatar-4')?.imageUrl },
];

export const mockCamps: Camp[] = [
  { id: 'camp-1', name: 'Annual Training Camp (ATC)', location: 'Belgaum, Karnataka', startDate: '2024-10-10', endDate: '2024-10-20', description: 'A 10-day camp focusing on drill, weapon training, and map reading.', capacity: 150, registrations: 112 },
  { id: 'camp-2', name: 'Basic Leadership Camp (BLC)', location: 'Madikeri, Coorg', startDate: '2024-11-05', endDate: '2024-11-15', description: 'Develop leadership qualities and teamwork skills.', capacity: 50, registrations: 50 },
  { id: 'camp-3', name: 'Thal Sainik Camp (TSC) Selections', location: 'Bangalore Urban', startDate: '2024-09-01', endDate: '2024-09-10', description: 'Selection camp for the prestigious Thal Sainik competition.', capacity: 100, registrations: 85 },
  { id: 'camp-4', name: 'Republic Day Camp (RDC) IGC', location: 'Bangalore Urban', startDate: '2024-11-20', endDate: '2024-11-30', description: 'Inter-Group Competition for RDC Delhi.', capacity: 200, registrations: 35 },
];

export const mockRegistrations: CampRegistration[] = [
  { id: 'reg-1', campId: 'camp-1', campName: 'Annual Training Camp (ATC)', cadetId: '1', cadetName: 'Aarav Sharma', status: 'Accepted', registeredAt: '2024-08-01' },
  { id: 'reg-2', campId: 'camp-2', campName: 'Basic Leadership Camp (BLC)', cadetId: '1', cadetName: 'Aarav Sharma', status: 'Pending', registeredAt: '2024-09-15' },
  { id: 'reg-3', campId: 'camp-1', campName: 'Annual Training Camp (ATC)', cadetId: '2', cadetName: 'Priya Patel', status: 'Pending', registeredAt: '2024-08-05' },
  { id: 'reg-4', campId: 'camp-4', campName: 'Republic Day Camp (RDC) IGC', cadetId: '3', cadetName: 'Rohan Singh', status: 'Rejected', registeredAt: '2024-10-01' },
];

export const mockAttendance: Attendance[] = [
  { id: 'att-1', date: '2024-08-04', eventName: 'Weekend Parade', status: 'Present' },
  { id: 'att-2', date: '2024-07-28', eventName: 'Weekend Parade', status: 'Present' },
  { id: 'att-3', date: '2024-07-21', eventName: 'Independence Day Practice', status: 'Absent' },
  { id: 'att-4', date: '2024-07-14', eventName: 'Weekend Parade', status: 'Present' },
];

export const mockActivityLogs: ActivityLog[] = [
  { id: 'log-1', user: 'Admin User', role: 'admin', action: 'Created camp: Annual Training Camp (ATC)', timestamp: '2024-07-30 10:05:12' },
  { id: 'log-2', user: 'Priya Patel', role: 'cadet', action: 'Logged in', timestamp: '2024-07-30 09:45:03' },
  { id: 'log-3', user: 'Manager User', role: 'manager', action: 'Accessed Activity Monitor', timestamp: '2024-07-30 09:30:50' },
  { id: 'log-4', user: 'Admin User', role: 'admin', action: 'Updated cadet profile: Aarav Sharma', timestamp: '2024-07-29 15:20:11' },
];

export const mockUsers: User[] = [
    { id: 'user-admin-1', name: 'Rajesh Kumar', email: 'rajesh.kumar@ncc.gov.in', role: 'admin' },
    { id: 'user-manager-1', name: 'Sunita Sharma', email: 'sunita.sharma@ncc.gov.in', role: 'manager' },
];
