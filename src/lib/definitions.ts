export type UserRole = 'cadet' | 'admin' | 'manager';

export type User = {
  id: string; // This will be the Firebase Auth UID
  displayName: string;
  email: string; // Used for auth
  regimentalNumber?: string; // Only for cadets
  role: UserRole;
  phone?: string;
  year?: number; // Only for cadets
  dept?: string;
  rank?: string;
  createdAt: any; // Can be Timestamp
  updatedAt: any; // Can be Timestamp
  avatarUrl?: string;
};

export type Camp = {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  createdBy: string; // UID of admin
  createdAt: string;
  updatedAt: string;
  capacity?: number;
  registrations?: number;
};

export type RegistrationStatus = 'pending' | 'accepted' | 'rejected';

export type CampRegistration = {
  id: string;
  campId: string;
  uid: string; // cadet's UID
  status: RegistrationStatus;
  createdAt: string;
  processedBy?: string; // UID of admin
  processedAt?: string;
};

export type AttendanceStatus = 'present' | 'absent';

export type Attendance = {
  id: string;
  campId?: string;
  uid: string; // cadet's UID
  date: string;
  status: AttendanceStatus;
  markedBy: string; // UID of admin
  markedAt: string;
};

export type AuditLog = {
  id: string;
  actorUid: string;
  action: string;
  targetId?: string;
  meta?: Record<string, any>;
  timestamp: string;
};


// The following types are used for mock data and can be phased out
// as we integrate more with Firebase.

export type Cadet = {
  id: string;
  regimentalNumber: string;
  name: string;
  email: string;
  phone: string;
  year: 1 | 2 | 3;
  rank: string;
  dept: string;
  enrolmentDate: string;
  avatarUrl?: string;
};

export type OldCamp = {
  id: string;
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  capacity: number;
  registrations: number;
};

export type OldCampRegistration = {
  id: string;
  campId: string;
  campName: string;
  cadetId: string;
  cadetName: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
  registeredAt: string;
};

export type OldAttendance = {
  id: string;
  date: string;
  eventName: string;
  status: 'Present' | 'Absent';
};

export type OldActivityLog = {
  id: string;
  user: string;
  role: UserRole;
  action: string;
  timestamp: string;
};

export type OldUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
};
