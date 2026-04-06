// â”€â”€â”€ Types â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export type ScheduleStatus = 'On-Time' | 'Delayed' | 'In Transit' | 'Completed'
export type VehicleStatus = 'Available' | 'On Route' | 'Maintenance'
export type CargoStatus = 'Loaded' | 'In Transit' | 'Delivered' | 'Pending'

export interface Schedule {
  id: string
  route: string
  origin: string
  destination: string
  departure: string
  status: ScheduleStatus
  driver: string
  vehicleId: string
  mapQuery: string
}

export interface Vehicle {
  id: string
  type: string
  plate: string
  driver: string
  capacity: string
  status: VehicleStatus
  lastLocation: string
}

export interface CargoItem {
  id: string
  description: string
  weight: string
  origin: string
  destination: string
  scheduleId: string
  status: CargoStatus
}

export interface WeeklyShipment {
  week: string
  shipments: number
  delivered: number
}

export interface OnTimeRate {
  week: string
  rate: number
}

export interface CargoCategory {
  name: string
  value: number
  color: string
}

// â”€â”€â”€ Schedules â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export const schedules: Schedule[] = [
  { id: 'SCH-001', route: 'BKK â†’ SIN', origin: 'Bangkok', destination: 'Singapore', departure: '2024-03-01 08:00', status: 'Completed', driver: 'Somchai P.', vehicleId: 'VH-003', mapQuery: 'Singapore' },
  { id: 'SCH-002', route: 'SIN â†’ TYO', origin: 'Singapore', destination: 'Tokyo', departure: '2024-03-03 14:00', status: 'Completed', driver: 'Kenji T.', vehicleId: 'VH-007', mapQuery: 'Tokyo,Japan' },
  { id: 'SCH-003', route: 'TYO â†’ OSK', origin: 'Tokyo', destination: 'Osaka', departure: '2024-03-05 09:30', status: 'Completed', driver: 'Yuki M.', vehicleId: 'VH-002', mapQuery: 'Osaka,Japan' },
  { id: 'SCH-004', route: 'BKK â†’ HCM', origin: 'Bangkok', destination: 'Ho Chi Minh City', departure: '2024-03-07 11:00', status: 'Completed', driver: 'Nguyen V.', vehicleId: 'VH-005', mapQuery: 'Ho+Chi+Minh+City,Vietnam' },
  { id: 'SCH-005', route: 'SIN â†’ KUL', origin: 'Singapore', destination: 'Kuala Lumpur', departure: '2024-03-10 07:00', status: 'On-Time', driver: 'Ahmad R.', vehicleId: 'VH-001', mapQuery: 'Kuala+Lumpur,Malaysia' },
  { id: 'SCH-006', route: 'HCM â†’ HAN', origin: 'Ho Chi Minh City', destination: 'Hanoi', departure: '2024-03-11 13:00', status: 'In Transit', driver: 'Tran H.', vehicleId: 'VH-009', mapQuery: 'Hanoi,Vietnam' },
  { id: 'SCH-007', route: 'OSK â†’ NGY', origin: 'Osaka', destination: 'Nagoya', departure: '2024-03-12 10:00', status: 'On-Time', driver: 'Hiroshi K.', vehicleId: 'VH-004', mapQuery: 'Nagoya,Japan' },
  { id: 'SCH-008', route: 'KUL â†’ BKK', origin: 'Kuala Lumpur', destination: 'Bangkok', departure: '2024-03-12 15:30', status: 'Delayed', driver: 'Suporn C.', vehicleId: 'VH-006', mapQuery: 'Bangkok,Thailand' },
  { id: 'SCH-009', route: 'TYO â†’ SIN', origin: 'Tokyo', destination: 'Singapore', departure: '2024-03-13 06:00', status: 'In Transit', driver: 'Kenji T.', vehicleId: 'VH-007', mapQuery: 'Singapore' },
  { id: 'SCH-010', route: 'SIN â†’ HCM', origin: 'Singapore', destination: 'Ho Chi Minh City', departure: '2024-03-13 16:00', status: 'On-Time', driver: 'Le Q.', vehicleId: 'VH-010', mapQuery: 'Ho+Chi+Minh+City,Vietnam' },
  { id: 'SCH-011', route: 'BKK â†’ SIN', origin: 'Bangkok', destination: 'Singapore', departure: '2024-03-14 08:00', status: 'Delayed', driver: 'Somchai P.', vehicleId: 'VH-003', mapQuery: 'Singapore' },
  { id: 'SCH-012', route: 'HAN â†’ SIN', origin: 'Hanoi', destination: 'Singapore', departure: '2024-03-15 09:00', status: 'On-Time', driver: 'Pham D.', vehicleId: 'VH-008', mapQuery: 'Singapore' },
]

// â”€â”€â”€ Vehicles â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export const vehicles: Vehicle[] = [
  { id: 'VH-001', type: 'Heavy Truck', plate: 'SGP-4421', driver: 'Ahmad R.', capacity: '20 tons', status: 'On Route', lastLocation: 'Kuala Lumpur' },
  { id: 'VH-002', type: 'Medium Van', plate: 'JPN-7712', driver: 'Yuki M.', capacity: '5 tons', status: 'Available', lastLocation: 'Osaka' },
  { id: 'VH-003', type: 'Heavy Truck', plate: 'THL-3308', driver: 'Somchai P.', capacity: '20 tons', status: 'Maintenance', lastLocation: 'Bangkok' },
  { id: 'VH-004', type: 'Light Van', plate: 'JPN-5543', driver: 'Hiroshi K.', capacity: '2 tons', status: 'On Route', lastLocation: 'Nagoya' },
  { id: 'VH-005', type: 'Heavy Truck', plate: 'VNM-9901', driver: 'Nguyen V.', capacity: '18 tons', status: 'Available', lastLocation: 'Ho Chi Minh City' },
  { id: 'VH-006', type: 'Medium Van', plate: 'MYS-6614', driver: 'Suporn C.', capacity: '6 tons', status: 'On Route', lastLocation: 'Bangkok' },
  { id: 'VH-007', type: 'Heavy Truck', plate: 'JPN-2287', driver: 'Kenji T.', capacity: '22 tons', status: 'On Route', lastLocation: 'Singapore' },
  { id: 'VH-008', type: 'Light Van', plate: 'VNM-4432', driver: 'Pham D.', capacity: '2 tons', status: 'On Route', lastLocation: 'Hanoi' },
  { id: 'VH-009', type: 'Medium Van', plate: 'VNM-7751', driver: 'Tran H.', capacity: '5 tons', status: 'On Route', lastLocation: 'Da Nang' },
  { id: 'VH-010', type: 'Heavy Truck', plate: 'SGP-8890', driver: 'Le Q.', capacity: '20 tons', status: 'On Route', lastLocation: 'Singapore' },
]

// â”€â”€â”€ Cargo â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export const cargoItems: CargoItem[] = [
  { id: 'CGO-001', description: 'Industrial Machinery Parts', weight: '4,200 kg', origin: 'Bangkok', destination: 'Singapore', scheduleId: 'SCH-001', status: 'Delivered' },
  { id: 'CGO-002', description: 'Electronic Components', weight: '1,800 kg', origin: 'Singapore', destination: 'Tokyo', scheduleId: 'SCH-002', status: 'Delivered' },
  { id: 'CGO-003', description: 'Automotive Spare Parts', weight: '3,500 kg', origin: 'Tokyo', destination: 'Osaka', scheduleId: 'SCH-003', status: 'Delivered' },
  { id: 'CGO-004', description: 'Textile Raw Materials', weight: '2,100 kg', origin: 'Bangkok', destination: 'Ho Chi Minh City', scheduleId: 'SCH-004', status: 'Delivered' },
  { id: 'CGO-005', description: 'Consumer Electronics', weight: '1,200 kg', origin: 'Singapore', destination: 'Kuala Lumpur', scheduleId: 'SCH-005', status: 'In Transit' },
  { id: 'CGO-006', description: 'Agricultural Products', weight: '5,800 kg', origin: 'Ho Chi Minh City', destination: 'Hanoi', scheduleId: 'SCH-006', status: 'In Transit' },
  { id: 'CGO-007', description: 'Pharmaceutical Supplies', weight: '800 kg', origin: 'Osaka', destination: 'Nagoya', scheduleId: 'SCH-007', status: 'Loaded' },
  { id: 'CGO-008', description: 'Chemical Compounds', weight: '3,200 kg', origin: 'Kuala Lumpur', destination: 'Bangkok', scheduleId: 'SCH-008', status: 'Pending' },
  { id: 'CGO-009', description: 'Semiconductor Wafers', weight: '650 kg', origin: 'Tokyo', destination: 'Singapore', scheduleId: 'SCH-009', status: 'In Transit' },
  { id: 'CGO-010', description: 'Food & Beverage Products', weight: '4,400 kg', origin: 'Singapore', destination: 'Ho Chi Minh City', scheduleId: 'SCH-010', status: 'Loaded' },
  { id: 'CGO-011', description: 'Construction Materials', weight: '8,000 kg', origin: 'Bangkok', destination: 'Singapore', scheduleId: 'SCH-011', status: 'Pending' },
  { id: 'CGO-012', description: 'Medical Equipment', weight: '1,100 kg', origin: 'Hanoi', destination: 'Singapore', scheduleId: 'SCH-012', status: 'Loaded' },
  { id: 'CGO-013', description: 'Optical Instruments', weight: '420 kg', origin: 'Tokyo', destination: 'Osaka', scheduleId: 'SCH-003', status: 'Delivered' },
  { id: 'CGO-014', description: 'Rubber Products', weight: '2,900 kg', origin: 'Kuala Lumpur', destination: 'Bangkok', scheduleId: 'SCH-008', status: 'Pending' },
  { id: 'CGO-015', description: 'Packaging Materials', weight: '1,600 kg', origin: 'Singapore', destination: 'Kuala Lumpur', scheduleId: 'SCH-005', status: 'In Transit' },
]

// â”€â”€â”€ Chart data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export const weeklyShipments: WeeklyShipment[] = [
  { week: 'W1 Feb', shipments: 18, delivered: 16 },
  { week: 'W2 Feb', shipments: 22, delivered: 20 },
  { week: 'W3 Feb', shipments: 19, delivered: 17 },
  { week: 'W4 Feb', shipments: 25, delivered: 23 },
  { week: 'W1 Mar', shipments: 28, delivered: 24 },
  { week: 'W2 Mar', shipments: 24, delivered: 22 },
  { week: 'W3 Mar', shipments: 30, delivered: 26 },
  { week: 'W4 Mar', shipments: 27, delivered: 25 },
]

export const onTimeRates: OnTimeRate[] = [
  { week: 'W1 Feb', rate: 88 },
  { week: 'W2 Feb', rate: 91 },
  { week: 'W3 Feb', rate: 86 },
  { week: 'W4 Feb', rate: 92 },
  { week: 'W1 Mar', rate: 85 },
  { week: 'W2 Mar', rate: 90 },
  { week: 'W3 Mar', rate: 88 },
  { week: 'W4 Mar', rate: 93 },
]

export const cargoCategories: CargoCategory[] = [
  { name: 'Electronics', value: 32, color: '#e8000d' },
  { name: 'Industrial', value: 24, color: '#f78166' },
  { name: 'Agricultural', value: 18, color: '#388bfd' },
  { name: 'Chemical', value: 12, color: '#d29922' },
  { name: 'Medical', value: 8, color: '#3fb950' },
  { name: 'Other', value: 6, color: '#484f58' },
]

// â”€â”€â”€ KPI summary â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export const kpiData = {
  activeSchedules: { value: 6, delta: '+2', trend: 'up' as const },
  totalVehicles: { value: 10, delta: '0', trend: 'neutral' as const },
  cargoInTransit: { value: 4, delta: '+1', trend: 'up' as const },
  onTimeRate: { value: '93%', delta: '+5%', trend: 'up' as const },
}
