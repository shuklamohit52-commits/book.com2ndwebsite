export type ExamCategory =
  | 'all'
  | 'up-state-exams'
  | 'upsc-civil-services'
  | 'upsc-state-psc'
  | 'ssc-cgl-chsl'
  | 'ssc-exams'
  | 'railways-rrb'
  | 'railways'
  | 'teaching-tet-ctet'
  | 'teaching-exams'
  | 'defence-nda-cds'
  | 'defence-exams'
  | 'engineering-polytechnic'
  | 'ncert-school'
  | 'school-ncert'
  | 'children-books'
  | 'gk-current-affairs'
  | 'banking-insurance'
  | string;

export type WebsiteTheme = 'classic' | 'modern';

export interface Book {
  id: string;
  title: string;
  hindiTitle?: string;
  author: string;
  publisher: string;
  category: ExamCategory;
  categoryName: string;
  edition: string;
  mrp: number;
  wholesaleDiscountPercent: number;
  wholesaleEstimatedPrice?: number;
  minOrderQty: number;
  language: string;
  binding?: string;
  pages?: number;
  isbn?: string;
  bestseller?: boolean;
  isNewRelease?: boolean;
  inStock?: boolean;
  coverImage: string;
  coverGradient?: string;
  accentColor: string;
  description: string;
  keyFeatures: string[];
}

export interface CategoryItem {
  id: ExamCategory;
  name: string;
  hindiName: string;
  icon: string;
  description?: string;
}

export interface PublisherItem {
  id: string;
  name: string;
  code: string;
  specialty: string;
  discountRange: string;
  popularTitles: string[];
  badgeColor: string;
}

export interface InquiryItem {
  book: Book;
  quantity: number;
}

export interface BuyerDetails {
  name: string;
  businessName: string;
  businessType:
    | 'Retail Bookstore'
    | 'Coaching Institute'
    | 'School / College Library'
    | 'Distributor / Reseller'
    | 'Student Group / Bulk Buyer'
    | 'Other';
  phone: string;
  email: string;
  city: string;
  state: string;
  deliveryRequirement: 'Immediate (1-3 Days)' | 'Within 1 Week' | 'General Quote Enquiry';
  notes: string;
}
