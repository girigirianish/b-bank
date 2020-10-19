export interface DonorsInformation {
  id: number;
  name: string;
  email: string;
  contact_no: string;
  blood_group: string;
  permanent_address: string;
  temporary_address: string;
  is_verify: string;
  last_donated_at?: any;
  created_at: string;
  updated_at: string;
  district?: string;
}
