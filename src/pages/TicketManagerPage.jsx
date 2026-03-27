import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

const FILTER_TABS = [
  { key: 'all', label: 'All' },
  { key: 'flights', label: 'Flights' },
  { key: 'hotels', label: 'Hotels' },
  { key: 'events', label: 'Events' },
  { key: 'passes', label: 'Passes' },
];

const INITIAL_TICKETS = [
  {
    id: 1,
    category: 'flights',
    status: 'upcoming',
    airline: 'Emirates',
    flightNumber: 'EK 507',
    from: 'DXB',
    fromCity: 'Dubai',
    to: 'JFK',
    toCity: 'New York',
    date: '2026-04-15',
    time: '08:30',
    gate: 'A12',
    seat: '14A',
    class: 'Business',
    passenger: 'Pooja Verma',
    confirmation: 'EK7X9M2',
  },
  {
    id: 2,
    category: 'flights',
    status: 'completed',
    airline: 'Singapore Airlines',
    flightNumber: 'SQ 422',
    from: 'SIN',
    fromCity: 'Singapore',
    to: 'NRT',
    toCity: 'Tokyo',
    date: '2026-03-02',
    time: '14:15',
    gate: 'C8',
    seat: '2F',
    class: 'First',
    passenger: 'Pooja Verma',
    confirmation: 'SQ3K8P1',
  },
  {
    id: 3,
    category: 'hotels',
    status: 'upcoming',
    hotelName: 'The Ritz-Carlton, Bali',
    location: 'Nusa Dua, Bali, Indonesia',
    checkIn: '2026-05-10',
    checkOut: '2026-05-15',
    roomType: 'Ocean View Suite',
    guests: 2,
    confirmation: 'RC-892451',
    date: '2026-05-10',
  },
  {
    id: 4,
    category: 'hotels',
    status: 'completed',
    hotelName: 'Aman Tokyo',
    location: 'Otemachi, Tokyo, Japan',
    checkIn: '2026-03-02',
    checkOut: '2026-03-06',
    roomType: 'Deluxe Room',
    guests: 1,
    confirmation: 'AT-334217',
    date: '2026-03-02',
  },
  {
    id: 5,
    category: 'events',
    status: 'upcoming',
    eventName: 'Coachella Music Festival',
    venue: 'Empire Polo Club, Indio',
    date: '2026-04-10',
    time: '16:00',
    ticketType: 'VIP',
    section: 'VIP Lounge A',
    confirmation: 'CM-VIP-00482',
  },
  {
    id: 6,
    category: 'events',
    status: 'cancelled',
    eventName: 'Tokyo Night Jazz',
    venue: 'Blue Note Tokyo',
    date: '2026-03-04',
    time: '20:00',
    ticketType: 'General',
    section: 'Floor B, Row 3',
    confirmation: 'BN-GEN-11973',
  },
  {
    id: 7,
    category: 'passes',
    status: 'upcoming',
    passName: 'Tokyo Metro 72-Hour Pass',
    passType: 'Transit',
    validFrom: '2026-04-20',
    validTo: '2026-04-23',
    zone: 'All Tokyo Metro Lines',
    confirmation: 'TM-72H-55891',
    date: '2026-04-20',
  },
];

let nextId = 100;

export default function TicketManagerPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [tickets, setTickets] = useState(INITIAL_TICKETS);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTicket, setNewTicket] = useState({
    category: 'flights',
    title: '',
    date: '',
    details: '',
  });

  const filteredTickets = useMemo(() => {
    const list = activeFilter === 'all'
      ? tickets
      : tickets.filter(t => t.category === activeFilter);
    return [...list].sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [tickets, activeFilter]);

  const handleAddTicket = (e) => {
    e.preventDefault();
    const id = nextId++;
    let ticket;
    if (newTicket.category === 'flights') {
      ticket = {
        id, category: 'flights', status: 'upcoming',
        airline: newTicket.title || 'Airline', flightNumber: 'XX 000',
        from: '---', fromCity: 'Origin', to: '---', toCity: 'Destination',
        date: newTicket.date, time: '00:00', gate: '--', seat: '--',
        class: 'Economy', passenger: 'Guest', confirmation: `FL-${id}`,
      };
    } else if (newTicket.category === 'hotels') {
      ticket = {
        id, category: 'hotels', status: 'upcoming',
        hotelName: newTicket.title || 'Hotel', location: newTicket.details || 'Location',
        checkIn: newTicket.date, checkOut: newTicket.date,
        roomType: 'Standard', guests: 1, confirmation: `HT-${id}`,
        date: newTicket.date,
      };
    } else if (newTicket.category === 'events') {
      ticket = {
        id, category: 'events', status: 'upcoming',
        eventName: newTicket.title || 'Event', venue: newTicket.details || 'Venue',
        date: newTicket.date, time: '00:00', ticketType: 'General',
        section: 'General Admission', confirmation: `EV-${id}`,
      };
    } else {
      ticket = {
        id, category: 'passes', status: 'upcoming',
        passName: newTicket.title || 'Pass', passType: newTicket.details || 'Transit',
        validFrom: newTicket.date, validTo: newTicket.date, zone: 'All Zones',
        confirmation: `PS-${id}`, date: newTicket.date,
      };
    }
    setTickets(prev => [...prev, ticket]);
    setNewTicket({ category: 'flights', title: '', date: '', details: '' });
    setShowAddForm(false);
  };

  const statusColor = (s) =>
    s === 'upcoming' ? '#c9a96e' : s === 'completed' ? '#4caf50' : '#e74c3c';

  const statusBg = (s) =>
    s === 'upcoming' ? 'rgba(201,169,110,0.15)' : s === 'completed' ? 'rgba(76,175,80,0.15)' : 'rgba(231,76,60,0.15)';

  const formatDate = (d) => {
    if (!d) return '';
    const dt = new Date(d + 'T00:00:00');
    return dt.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <>
      <style>{`
        .ticket-page {
          min-height: 100vh;
          background: #0a0a0a;
          color: #e0e0e0;
          font-family: 'DM Sans', sans-serif;
          padding: 0 0 80px;
        }
        .ticket-hero {
          text-align: center;
          padding: 60px 24px 36px;
          position: relative;
          overflow: hidden;
        }
        .ticket-hero::before {
          content: '';
          position: absolute;
          top: -40%;
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(201,169,110,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .ticket-hero-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #c9a96e;
          margin-bottom: 12px;
          display: block;
        }
        .ticket-hero-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 42px;
          font-weight: 600;
          color: #f5f5f5;
          margin: 0 0 8px;
          line-height: 1.15;
        }
        .ticket-hero-title span {
          color: #c9a96e;
        }
        .ticket-hero-sub {
          color: #a0a0a0;
          font-size: 15px;
          margin: 0;
        }
        .ticket-nav {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 24px;
          margin-bottom: 32px;
          position: relative;
        }
        .ticket-back-link {
          position: absolute;
          left: 24px;
          color: #a0a0a0;
          text-decoration: none;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: color 0.2s;
        }
        .ticket-back-link:hover { color: #c9a96e; }

        /* Filter tabs */
        .ticket-filters {
          display: flex;
          gap: 6px;
          padding: 0 24px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 36px;
        }
        .ticket-filter-btn {
          background: #111116;
          color: #a0a0a0;
          border: 1px solid #1e1e24;
          padding: 8px 20px;
          border-radius: 24px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.25s;
        }
        .ticket-filter-btn:hover {
          border-color: rgba(201,169,110,0.25);
          color: #e0e0e0;
        }
        .ticket-filter-btn.ticket-filter-active {
          background: rgba(201,169,110,0.15);
          color: #c9a96e;
          border-color: rgba(201,169,110,0.4);
        }

        /* Add button */
        .ticket-add-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 0 auto 36px;
          padding: 12px 28px;
          background: linear-gradient(135deg, #c9a96e, #d4af37);
          color: #0a0a0a;
          border: none;
          border-radius: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .ticket-add-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 24px rgba(201,169,110,0.25);
        }

        /* Add form overlay */
        .ticket-form-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(6px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }
        .ticket-form-card {
          background: #111116;
          border: 1px solid rgba(201,169,110,0.25);
          border-radius: 16px;
          padding: 32px;
          width: 100%;
          max-width: 440px;
        }
        .ticket-form-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 24px;
          color: #f5f5f5;
          margin: 0 0 24px;
        }
        .ticket-form-group {
          margin-bottom: 18px;
        }
        .ticket-form-label {
          display: block;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #a0a0a0;
          margin-bottom: 6px;
        }
        .ticket-form-input,
        .ticket-form-select {
          width: 100%;
          padding: 10px 14px;
          background: #1a1a22;
          border: 1px solid #1e1e24;
          border-radius: 8px;
          color: #e0e0e0;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s;
          box-sizing: border-box;
        }
        .ticket-form-input:focus,
        .ticket-form-select:focus {
          border-color: rgba(201,169,110,0.5);
        }
        .ticket-form-actions {
          display: flex;
          gap: 12px;
          margin-top: 24px;
        }
        .ticket-form-submit {
          flex: 1;
          padding: 12px;
          background: linear-gradient(135deg, #c9a96e, #d4af37);
          color: #0a0a0a;
          border: none;
          border-radius: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
        }
        .ticket-form-cancel {
          flex: 1;
          padding: 12px;
          background: transparent;
          border: 1px solid #1e1e24;
          color: #a0a0a0;
          border-radius: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          cursor: pointer;
        }
        .ticket-form-cancel:hover { border-color: rgba(201,169,110,0.25); color: #e0e0e0; }

        /* Cards container */
        .ticket-cards {
          max-width: 840px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        /* Status badge */
        .ticket-status {
          display: inline-block;
          padding: 3px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.8px;
          text-transform: uppercase;
        }

        /* ========== BOARDING PASS (flights) ========== */
        .ticket-boarding {
          display: flex;
          border-radius: 16px;
          overflow: hidden;
          background: #111116;
          border: 1px solid rgba(201,169,110,0.18);
          position: relative;
          transition: transform 0.25s, box-shadow 0.25s;
        }
        .ticket-boarding:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,169,110,0.2);
        }
        .ticket-boarding-left {
          flex: 1;
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          gap: 18px;
          position: relative;
        }
        .ticket-boarding-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .ticket-boarding-airline {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 20px;
          font-weight: 700;
          color: #f5f5f5;
        }
        .ticket-boarding-flight {
          font-size: 13px;
          color: #c9a96e;
          font-weight: 600;
          letter-spacing: 1px;
        }
        .ticket-boarding-route {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .ticket-boarding-port {
          text-align: center;
        }
        .ticket-boarding-code {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 36px;
          font-weight: 700;
          color: #f5f5f5;
          line-height: 1;
        }
        .ticket-boarding-city {
          font-size: 11px;
          color: #a0a0a0;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-top: 4px;
        }
        .ticket-boarding-arrow {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          min-width: 80px;
        }
        .ticket-boarding-arrow::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201,169,110,0.4), transparent);
        }
        .ticket-boarding-arrow-icon {
          background: #111116;
          position: relative;
          z-index: 1;
          padding: 0 6px;
          color: #c9a96e;
          font-size: 18px;
        }
        .ticket-boarding-details {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }
        .ticket-boarding-detail-label {
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #666;
          margin-bottom: 3px;
        }
        .ticket-boarding-detail-value {
          font-size: 14px;
          font-weight: 600;
          color: #e0e0e0;
        }
        .ticket-boarding-passenger {
          font-size: 12px;
          color: #a0a0a0;
          padding-top: 8px;
          border-top: 1px solid #1e1e24;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .ticket-boarding-passenger-name {
          font-weight: 600;
          color: #e0e0e0;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: 12px;
        }

        /* Perforation line */
        .ticket-perforation {
          width: 32px;
          min-width: 32px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .ticket-perforation::before {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          width: 0;
          border-left: 2px dashed rgba(201,169,110,0.2);
        }
        .ticket-perforation-notch-top,
        .ticket-perforation-notch-bottom {
          position: absolute;
          width: 20px;
          height: 20px;
          background: #0a0a0a;
          border-radius: 50%;
          left: 50%;
          transform: translateX(-50%);
        }
        .ticket-perforation-notch-top { top: -10px; }
        .ticket-perforation-notch-bottom { bottom: -10px; }

        /* Boarding pass stub (right side) */
        .ticket-boarding-stub {
          width: 160px;
          min-width: 160px;
          background: #1a1a22;
          padding: 24px 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .ticket-stub-flight {
          font-size: 13px;
          font-weight: 700;
          color: #c9a96e;
          letter-spacing: 1px;
        }
        .ticket-stub-route {
          text-align: center;
        }
        .ticket-stub-route-codes {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 22px;
          font-weight: 700;
          color: #f5f5f5;
        }
        .ticket-stub-seat {
          text-align: center;
        }
        .ticket-stub-seat-label {
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #666;
          margin-bottom: 2px;
        }
        .ticket-stub-seat-value {
          font-size: 20px;
          font-weight: 700;
          color: #d4af37;
        }

        /* QR Code placeholder */
        .ticket-qr {
          width: 56px;
          height: 56px;
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          grid-template-rows: repeat(7, 1fr);
          gap: 1px;
          opacity: 0.6;
        }
        .ticket-qr-cell {
          border-radius: 1px;
        }
        .ticket-qr-dark { background: #c9a96e; }
        .ticket-qr-light { background: rgba(201,169,110,0.1); }

        /* Barcode placeholder */
        .ticket-barcode {
          display: flex;
          gap: 1px;
          height: 32px;
          align-items: stretch;
          justify-content: center;
        }
        .ticket-barcode-bar {
          background: rgba(201,169,110,0.5);
          border-radius: 1px;
        }

        /* ========== HOTEL CARD ========== */
        .ticket-hotel {
          background: #111116;
          border: 1px solid rgba(201,169,110,0.18);
          border-radius: 16px;
          overflow: hidden;
          transition: transform 0.25s, box-shadow 0.25s;
        }
        .ticket-hotel:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,169,110,0.2);
        }
        .ticket-hotel-top {
          background: linear-gradient(135deg, #1a1a22 0%, rgba(201,169,110,0.06) 100%);
          padding: 24px 28px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          border-bottom: 1px dashed rgba(201,169,110,0.15);
        }
        .ticket-hotel-name {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 22px;
          font-weight: 700;
          color: #f5f5f5;
          margin: 0 0 4px;
        }
        .ticket-hotel-location {
          font-size: 12px;
          color: #a0a0a0;
        }
        .ticket-hotel-body {
          padding: 24px 28px;
          display: flex;
          align-items: center;
          gap: 24px;
        }
        .ticket-hotel-dates {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 16px;
          align-items: center;
        }
        .ticket-hotel-date-block {
          text-align: center;
        }
        .ticket-hotel-date-label {
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #666;
          margin-bottom: 4px;
        }
        .ticket-hotel-date-value {
          font-size: 15px;
          font-weight: 600;
          color: #e0e0e0;
        }
        .ticket-hotel-nights {
          font-size: 11px;
          color: #c9a96e;
          text-align: center;
          padding: 6px 10px;
          background: rgba(201,169,110,0.08);
          border-radius: 20px;
        }
        .ticket-hotel-meta {
          display: flex;
          gap: 24px;
          padding: 0 28px 20px;
          border-top: 1px solid #1e1e24;
          padding-top: 16px;
          margin: 0 28px;
          align-items: center;
          justify-content: space-between;
        }
        .ticket-hotel-meta-item {
          text-align: center;
        }
        .ticket-hotel-meta-label {
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #666;
          margin-bottom: 2px;
        }
        .ticket-hotel-meta-value {
          font-size: 13px;
          font-weight: 600;
          color: #e0e0e0;
        }

        /* ========== EVENT CARD ========== */
        .ticket-event {
          background: #111116;
          border: 1px solid rgba(201,169,110,0.18);
          border-radius: 16px;
          overflow: hidden;
          display: flex;
          transition: transform 0.25s, box-shadow 0.25s;
        }
        .ticket-event:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,169,110,0.2);
        }
        .ticket-event-accent {
          width: 6px;
          min-height: 100%;
          background: linear-gradient(180deg, #c9a96e, #d4af37);
        }
        .ticket-event-body {
          flex: 1;
          padding: 24px 28px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .ticket-event-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }
        .ticket-event-name {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 22px;
          font-weight: 700;
          color: #f5f5f5;
          margin: 0 0 4px;
        }
        .ticket-event-venue {
          font-size: 13px;
          color: #a0a0a0;
        }
        .ticket-event-info {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
        }
        .ticket-event-info-block {}
        .ticket-event-info-label {
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #666;
          margin-bottom: 2px;
        }
        .ticket-event-info-value {
          font-size: 14px;
          font-weight: 600;
          color: #e0e0e0;
        }
        .ticket-event-type-badge {
          display: inline-block;
          padding: 4px 14px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        .ticket-event-type-vip {
          background: rgba(201,169,110,0.15);
          color: #d4af37;
          border: 1px solid rgba(201,169,110,0.3);
        }
        .ticket-event-type-general {
          background: rgba(160,160,160,0.1);
          color: #a0a0a0;
          border: 1px solid rgba(160,160,160,0.2);
        }
        .ticket-event-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 12px;
          border-top: 1px solid #1e1e24;
        }
        .ticket-event-confirmation {
          font-size: 11px;
          color: #666;
          letter-spacing: 1px;
          font-family: 'DM Sans', monospace;
        }
        .ticket-event-qr-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        /* ========== PASS CARD ========== */
        .ticket-pass {
          background: #111116;
          border: 1px solid rgba(201,169,110,0.18);
          border-radius: 16px;
          overflow: hidden;
          transition: transform 0.25s, box-shadow 0.25s;
        }
        .ticket-pass:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,169,110,0.2);
        }
        .ticket-pass-header {
          background: linear-gradient(135deg, rgba(201,169,110,0.1), transparent);
          padding: 24px 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px dashed rgba(201,169,110,0.15);
        }
        .ticket-pass-name {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 22px;
          font-weight: 700;
          color: #f5f5f5;
          margin: 0;
        }
        .ticket-pass-type {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #c9a96e;
          background: rgba(201,169,110,0.1);
          padding: 4px 12px;
          border-radius: 20px;
        }
        .ticket-pass-body {
          padding: 24px 28px;
          display: flex;
          align-items: center;
          gap: 24px;
        }
        .ticket-pass-info {
          flex: 1;
          display: flex;
          gap: 28px;
          flex-wrap: wrap;
        }
        .ticket-pass-info-label {
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #666;
          margin-bottom: 2px;
        }
        .ticket-pass-info-value {
          font-size: 14px;
          font-weight: 600;
          color: #e0e0e0;
        }
        .ticket-pass-confirmation {
          font-size: 11px;
          color: #666;
          letter-spacing: 1px;
          padding: 16px 28px 20px;
          border-top: 1px solid #1e1e24;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* Empty state */
        .ticket-empty {
          text-align: center;
          padding: 60px 24px;
          color: #666;
          font-size: 15px;
        }
        .ticket-empty-icon {
          font-size: 48px;
          margin-bottom: 16px;
          opacity: 0.4;
        }

        @media (max-width: 640px) {
          .ticket-boarding { flex-direction: column; }
          .ticket-boarding-stub { width: 100%; min-width: auto; flex-direction: row; padding: 16px 20px; }
          .ticket-perforation { width: 100%; min-width: auto; height: 24px; }
          .ticket-perforation::before {
            top: auto; bottom: auto; left: 0; right: 0;
            width: 100%; height: 0; border-left: none;
            border-top: 2px dashed rgba(201,169,110,0.2);
            top: 50%;
          }
          .ticket-perforation-notch-top,
          .ticket-perforation-notch-bottom {
            top: 50%; transform: translateY(-50%);
          }
          .ticket-perforation-notch-top { left: -10px; }
          .ticket-perforation-notch-bottom { left: auto; right: -10px; }
          .ticket-boarding-details { grid-template-columns: repeat(2, 1fr); }
          .ticket-hero-title { font-size: 32px; }
          .ticket-hotel-body { flex-direction: column; }
          .ticket-hotel-meta { flex-wrap: wrap; gap: 16px; }
        }
      `}</style>

      <div className="ticket-page">
        {/* Hero */}
        <div className="ticket-hero">
          <span className="ticket-hero-label">Travel Documents</span>
          <h1 className="ticket-hero-title">
            Ticket & Pass <span>Manager</span>
          </h1>
          <p className="ticket-hero-sub">
            All your boarding passes, hotel confirmations, and event tickets in one place.
          </p>
        </div>

        {/* Navigation */}
        <div className="ticket-nav">
          <Link to="/" className="ticket-back-link">
            &#8592; Dashboard
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="ticket-filters">
          {FILTER_TABS.map(tab => (
            <button
              key={tab.key}
              className={`ticket-filter-btn${activeFilter === tab.key ? ' ticket-filter-active' : ''}`}
              onClick={() => setActiveFilter(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Add Ticket Button */}
        <button className="ticket-add-btn" onClick={() => setShowAddForm(true)}>
          <span style={{ fontSize: 18, lineHeight: 1 }}>+</span> Add Ticket
        </button>

        {/* Add Form Overlay */}
        {showAddForm && (
          <div className="ticket-form-overlay" onClick={() => setShowAddForm(false)}>
            <div className="ticket-form-card" onClick={e => e.stopPropagation()}>
              <h2 className="ticket-form-title">Add New Ticket</h2>
              <form onSubmit={handleAddTicket}>
                <div className="ticket-form-group">
                  <label className="ticket-form-label">Category</label>
                  <select
                    className="ticket-form-select"
                    value={newTicket.category}
                    onChange={e => setNewTicket(p => ({ ...p, category: e.target.value }))}
                  >
                    <option value="flights">Flight</option>
                    <option value="hotels">Hotel</option>
                    <option value="events">Event</option>
                    <option value="passes">Pass</option>
                  </select>
                </div>
                <div className="ticket-form-group">
                  <label className="ticket-form-label">
                    {newTicket.category === 'flights' ? 'Airline' :
                     newTicket.category === 'hotels' ? 'Hotel Name' :
                     newTicket.category === 'events' ? 'Event Name' : 'Pass Name'}
                  </label>
                  <input
                    className="ticket-form-input"
                    type="text"
                    value={newTicket.title}
                    onChange={e => setNewTicket(p => ({ ...p, title: e.target.value }))}
                    placeholder="Enter name..."
                    required
                  />
                </div>
                <div className="ticket-form-group">
                  <label className="ticket-form-label">Date</label>
                  <input
                    className="ticket-form-input"
                    type="date"
                    value={newTicket.date}
                    onChange={e => setNewTicket(p => ({ ...p, date: e.target.value }))}
                    required
                  />
                </div>
                <div className="ticket-form-group">
                  <label className="ticket-form-label">Details</label>
                  <input
                    className="ticket-form-input"
                    type="text"
                    value={newTicket.details}
                    onChange={e => setNewTicket(p => ({ ...p, details: e.target.value }))}
                    placeholder="Location, venue, or notes..."
                  />
                </div>
                <div className="ticket-form-actions">
                  <button type="submit" className="ticket-form-submit">Add Ticket</button>
                  <button type="button" className="ticket-form-cancel" onClick={() => setShowAddForm(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Ticket Cards */}
        <div className="ticket-cards">
          {filteredTickets.length === 0 && (
            <div className="ticket-empty">
              <div className="ticket-empty-icon">&#127915;</div>
              <div>No tickets found for this category.</div>
            </div>
          )}

          {filteredTickets.map(ticket => {
            if (ticket.category === 'flights') return <FlightCard key={ticket.id} ticket={ticket} statusColor={statusColor} statusBg={statusBg} formatDate={formatDate} />;
            if (ticket.category === 'hotels') return <HotelCard key={ticket.id} ticket={ticket} statusColor={statusColor} statusBg={statusBg} formatDate={formatDate} />;
            if (ticket.category === 'events') return <EventCard key={ticket.id} ticket={ticket} statusColor={statusColor} statusBg={statusBg} formatDate={formatDate} />;
            if (ticket.category === 'passes') return <PassCard key={ticket.id} ticket={ticket} statusColor={statusColor} statusBg={statusBg} formatDate={formatDate} />;
            return null;
          })}
        </div>
      </div>
    </>
  );
}

/* ===== QR Code Component ===== */
function QRPlaceholder() {
  const pattern = [
    [1,1,1,0,1,1,1],
    [1,0,1,1,1,0,1],
    [1,1,1,0,1,1,1],
    [0,1,0,1,0,1,0],
    [1,1,1,0,1,1,1],
    [1,0,1,1,1,0,1],
    [1,1,1,0,1,1,1],
  ];
  return (
    <div className="ticket-qr">
      {pattern.flat().map((cell, i) => (
        <div key={i} className={`ticket-qr-cell ${cell ? 'ticket-qr-dark' : 'ticket-qr-light'}`} />
      ))}
    </div>
  );
}

/* ===== Barcode Component ===== */
function BarcodePlaceholder() {
  const widths = [2,1,3,1,2,1,1,3,2,1,2,1,3,1,1,2,3,1,2,1,1,3,1,2,1,3,2,1];
  return (
    <div className="ticket-barcode">
      {widths.map((w, i) => (
        <div
          key={i}
          className="ticket-barcode-bar"
          style={{
            width: w,
            opacity: i % 3 === 0 ? 0.8 : i % 2 === 0 ? 0.5 : 0.3,
          }}
        />
      ))}
    </div>
  );
}

/* ===== Flight Boarding Pass ===== */
function FlightCard({ ticket, statusColor, statusBg, formatDate }) {
  return (
    <div className="ticket-boarding">
      <div className="ticket-boarding-left">
        {/* Header */}
        <div className="ticket-boarding-header">
          <div>
            <div className="ticket-boarding-airline">{ticket.airline}</div>
            <div className="ticket-boarding-flight">{ticket.flightNumber}</div>
          </div>
          <span
            className="ticket-status"
            style={{ color: statusColor(ticket.status), background: statusBg(ticket.status) }}
          >
            {ticket.status}
          </span>
        </div>

        {/* Route */}
        <div className="ticket-boarding-route">
          <div className="ticket-boarding-port">
            <div className="ticket-boarding-code">{ticket.from}</div>
            <div className="ticket-boarding-city">{ticket.fromCity}</div>
          </div>
          <div className="ticket-boarding-arrow">
            <span className="ticket-boarding-arrow-icon">&#9992;</span>
          </div>
          <div className="ticket-boarding-port">
            <div className="ticket-boarding-code">{ticket.to}</div>
            <div className="ticket-boarding-city">{ticket.toCity}</div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="ticket-boarding-details">
          <div>
            <div className="ticket-boarding-detail-label">Date</div>
            <div className="ticket-boarding-detail-value">{formatDate(ticket.date)}</div>
          </div>
          <div>
            <div className="ticket-boarding-detail-label">Time</div>
            <div className="ticket-boarding-detail-value">{ticket.time}</div>
          </div>
          <div>
            <div className="ticket-boarding-detail-label">Gate</div>
            <div className="ticket-boarding-detail-value">{ticket.gate}</div>
          </div>
          <div>
            <div className="ticket-boarding-detail-label">Class</div>
            <div className="ticket-boarding-detail-value">{ticket.class}</div>
          </div>
        </div>

        {/* Barcode */}
        <BarcodePlaceholder />

        {/* Passenger */}
        <div className="ticket-boarding-passenger">
          <div>
            <span style={{ color: '#666', marginRight: 8 }}>PASSENGER</span>
            <span className="ticket-boarding-passenger-name">{ticket.passenger}</span>
          </div>
          <span style={{ color: '#666', fontSize: 11, letterSpacing: 1 }}>{ticket.confirmation}</span>
        </div>
      </div>

      {/* Perforation */}
      <div className="ticket-perforation">
        <div className="ticket-perforation-notch-top" />
        <div className="ticket-perforation-notch-bottom" />
      </div>

      {/* Stub */}
      <div className="ticket-boarding-stub">
        <div className="ticket-stub-flight">{ticket.flightNumber}</div>
        <div className="ticket-stub-route">
          <div className="ticket-stub-route-codes">{ticket.from} - {ticket.to}</div>
        </div>
        <div className="ticket-stub-seat">
          <div className="ticket-stub-seat-label">Seat</div>
          <div className="ticket-stub-seat-value">{ticket.seat}</div>
        </div>
        <QRPlaceholder />
      </div>
    </div>
  );
}

/* ===== Hotel Card ===== */
function HotelCard({ ticket, statusColor, statusBg, formatDate }) {
  const nights = () => {
    if (!ticket.checkIn || !ticket.checkOut) return 0;
    const a = new Date(ticket.checkIn + 'T00:00:00');
    const b = new Date(ticket.checkOut + 'T00:00:00');
    return Math.max(1, Math.round((b - a) / (1000 * 60 * 60 * 24)));
  };

  return (
    <div className="ticket-hotel">
      <div className="ticket-hotel-top">
        <div>
          <h3 className="ticket-hotel-name">{ticket.hotelName}</h3>
          <div className="ticket-hotel-location">{ticket.location}</div>
        </div>
        <span
          className="ticket-status"
          style={{ color: statusColor(ticket.status), background: statusBg(ticket.status) }}
        >
          {ticket.status}
        </span>
      </div>
      <div className="ticket-hotel-body">
        <div className="ticket-hotel-dates">
          <div className="ticket-hotel-date-block">
            <div className="ticket-hotel-date-label">Check-in</div>
            <div className="ticket-hotel-date-value">{formatDate(ticket.checkIn)}</div>
          </div>
          <div className="ticket-hotel-nights">{nights()} night{nights() !== 1 ? 's' : ''}</div>
          <div className="ticket-hotel-date-block">
            <div className="ticket-hotel-date-label">Check-out</div>
            <div className="ticket-hotel-date-value">{formatDate(ticket.checkOut)}</div>
          </div>
        </div>
        <QRPlaceholder />
      </div>
      <div className="ticket-hotel-meta">
        <div className="ticket-hotel-meta-item">
          <div className="ticket-hotel-meta-label">Room Type</div>
          <div className="ticket-hotel-meta-value">{ticket.roomType}</div>
        </div>
        <div className="ticket-hotel-meta-item">
          <div className="ticket-hotel-meta-label">Guests</div>
          <div className="ticket-hotel-meta-value">{ticket.guests}</div>
        </div>
        <div className="ticket-hotel-meta-item">
          <div className="ticket-hotel-meta-label">Confirmation</div>
          <div className="ticket-hotel-meta-value" style={{ fontFamily: "'DM Sans', monospace" }}>{ticket.confirmation}</div>
        </div>
      </div>
    </div>
  );
}

/* ===== Event Card ===== */
function EventCard({ ticket, statusColor, statusBg, formatDate }) {
  const isVip = ticket.ticketType === 'VIP';
  return (
    <div className="ticket-event">
      <div className="ticket-event-accent" />
      <div className="ticket-event-body">
        <div className="ticket-event-header">
          <div>
            <h3 className="ticket-event-name">{ticket.eventName}</h3>
            <div className="ticket-event-venue">{ticket.venue}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
            <span
              className="ticket-status"
              style={{ color: statusColor(ticket.status), background: statusBg(ticket.status) }}
            >
              {ticket.status}
            </span>
            <span className={`ticket-event-type-badge ${isVip ? 'ticket-event-type-vip' : 'ticket-event-type-general'}`}>
              {ticket.ticketType}
            </span>
          </div>
        </div>
        <div className="ticket-event-info">
          <div className="ticket-event-info-block">
            <div className="ticket-event-info-label">Date</div>
            <div className="ticket-event-info-value">{formatDate(ticket.date)}</div>
          </div>
          <div className="ticket-event-info-block">
            <div className="ticket-event-info-label">Time</div>
            <div className="ticket-event-info-value">{ticket.time}</div>
          </div>
          <div className="ticket-event-info-block">
            <div className="ticket-event-info-label">Section</div>
            <div className="ticket-event-info-value">{ticket.section}</div>
          </div>
        </div>
        <div className="ticket-event-footer">
          <div className="ticket-event-confirmation">{ticket.confirmation}</div>
          <div className="ticket-event-qr-wrap">
            <BarcodePlaceholder />
            <QRPlaceholder />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===== Pass Card ===== */
function PassCard({ ticket, statusColor, statusBg, formatDate }) {
  return (
    <div className="ticket-pass">
      <div className="ticket-pass-header">
        <h3 className="ticket-pass-name">{ticket.passName}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="ticket-pass-type">{ticket.passType}</span>
          <span
            className="ticket-status"
            style={{ color: statusColor(ticket.status), background: statusBg(ticket.status) }}
          >
            {ticket.status}
          </span>
        </div>
      </div>
      <div className="ticket-pass-body">
        <div className="ticket-pass-info">
          <div>
            <div className="ticket-pass-info-label">Valid From</div>
            <div className="ticket-pass-info-value">{formatDate(ticket.validFrom)}</div>
          </div>
          <div>
            <div className="ticket-pass-info-label">Valid To</div>
            <div className="ticket-pass-info-value">{formatDate(ticket.validTo)}</div>
          </div>
          <div>
            <div className="ticket-pass-info-label">Zone</div>
            <div className="ticket-pass-info-value">{ticket.zone}</div>
          </div>
        </div>
        <QRPlaceholder />
      </div>
      <div className="ticket-pass-confirmation">
        <span style={{ fontFamily: "'DM Sans', monospace" }}>{ticket.confirmation}</span>
        <BarcodePlaceholder />
      </div>
    </div>
  );
}
