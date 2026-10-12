import React, { useState, useMemo } from 'react';
import { ROOM_DATA } from '../data/mockData';

// ─────────────────────────────────────────────────────────────────────────────
// Colour palette (matches existing HCD Connect design system)
// ─────────────────────────────────────────────────────────────────────────────
const C = {
  bgPage:        '#F5F7F5',
  bgCard:        '#FFFFFF',
  labFill:       '#1A5C58',
  labStroke:     '#0F3F3B',
  labText:       '#FFFFFF',
  labSelected:   '#29B6BE',
  studioFill:    '#2D4A4A',
  studioSelected:'#5EEAD4',
  facFill:       '#EDF6F0',
  facStroke:     '#B2D8C4',
  facText:       '#1A5C58',
  facSelected:   '#99F6E4',
  corridor:      '#D4DDD5',
  entrance:      '#202B2E',
  entrText:      '#FFFFFF',
  pillars:       '#29B6BE',
  text:          '#1A3C38',
  muted:         '#6B8A84',
  chipActive:    '#1A5C58',
  chipActiveTxt: '#FFFFFF',
  chipBorder:    '#B2D8C4',
  border:        '#DDE8E4',
  tagBg:         '#EDF6F0',
  tagText:       '#1A5C58',
};

const FILTERS = [
  { key: 'all',      label: 'All' },
  { key: 'lab',      label: 'Labs' },
  { key: 'faculty',  label: 'Faculty Rooms' },
  { key: 'open-now', label: 'Open Now' },
];

function StatusBadge() {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '4px',
      backgroundColor: '#F1F5F0', color: '#6B8A84',
      border: '1px solid #D0DDD4', borderRadius: '20px',
      padding: '2px 10px', fontSize: '0.7rem', fontWeight: 600,
      letterSpacing: '0.02em', whiteSpace: 'nowrap',
    }}>
      <span style={{ fontSize: '0.55rem' }}>●</span> Status unavailable
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SCHEMATIC FLOOR MAP (SVG)
// Layout derived from uploaded corridor photographs and videos:
//   • Entrance: bottom-right (glass double door visible in photos)
//   • Teal/blue pillar near entrance lobby
//   • Moving left (west): labs on upper/north side
//   • Faculty rooms on lower/south side (from directory, not photos)
//   • "Design Studio" signage on far corridor door
// All positions APPROXIMATE — schematic only.
// ─────────────────────────────────────────────────────────────────────────────
const LAB_ROOMS  = ROOM_DATA.filter(r => r.mapRow === 0);
const FAC_ROOMS  = ROOM_DATA.filter(r => r.mapRow === 1);
const MAP_COLS   = 5;
const TILE_W     = 96;
const TILE_H     = 52;
const GAP        = 10;
const CORRIDOR_H = 32;
const PAD_X      = 14;
const PAD_TOP    = 14;
const ENTRANCE_W = 88;
const ENTRANCE_H = 36;
const PILLAR_R   = 13;
const SVG_W      = PAD_X * 2 + MAP_COLS * TILE_W + (MAP_COLS - 1) * GAP;
const SVG_H      = PAD_TOP + TILE_H + GAP + CORRIDOR_H + GAP + TILE_H + GAP * 2 + ENTRANCE_H + PAD_TOP;

function FloorMap({ selected, onSelect }) {
  const labY  = PAD_TOP;
  const corrY = labY + TILE_H + GAP;
  const facY  = corrY + CORRIDOR_H + GAP;
  const entrY = facY + TILE_H + GAP * 2;

  function tileX(col) { return PAD_X + col * (TILE_W + GAP); }

  function getTileColor(room) {
    const sel = selected?.id === room.id;
    if (room.type === 'faculty') return {
      fill:   sel ? C.facSelected : C.facFill,
      stroke: sel ? C.labSelected : C.facStroke,
      text:   C.facText,
    };
    if (room.type === 'studio') return {
      fill:   sel ? C.studioSelected : C.studioFill,
      stroke: sel ? C.labSelected    : C.labStroke,
      text:   '#FFFFFF',
    };
    return {
      fill:   sel ? C.labSelected : C.labFill,
      stroke: sel ? '#0D9488'     : C.labStroke,
      text:   C.labText,
    };
  }

  function RoomTile({ room, y }) {
    const x   = tileX(room.mapCol);
    const clr = getTileColor(room);
    const sel = selected?.id === room.id;
    return (
      <g
        key={room.id}
        onClick={() => onSelect(room)}
        style={{ cursor: 'pointer' }}
        role="button"
        tabIndex={0}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onSelect(room); }}
        aria-label={`${room.name}, ${room.roomNumber || 'Room number TBC'}`}
      >
        <rect x={x} y={y} width={TILE_W} height={TILE_H} fill={clr.fill} stroke={clr.stroke} strokeWidth={sel ? 2.5 : 1.5} rx="8" />
        <text x={x + TILE_W / 2} y={y + 18} textAnchor="middle" fontSize="9" fill={clr.text} fontWeight="700">
          {room.roomNumber || '?'}
        </text>
        <text x={x + TILE_W / 2} y={y + 31} textAnchor="middle" fontSize="7" fill={clr.text} fontWeight="500">
          {room.shortName.length > 13 ? room.shortName.slice(0, 13) + '…' : room.shortName}
        </text>
        <text x={x + TILE_W / 2} y={y + 44} textAnchor="middle" fontSize="6" fill={clr.text} opacity="0.8">
          {room.fromDirectory ? '● Dir.' : '● Approx.'}
        </text>
        {sel && <rect x={x - 3} y={y - 3} width={TILE_W + 6} height={TILE_H + 6} fill="none" stroke={C.labSelected} strokeWidth="2" rx="10" strokeDasharray="4 2" />}
      </g>
    );
  }

  return (
    <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        width="100%"
        style={{ display: 'block', minWidth: '320px' }}
        role="img"
        aria-label="Schematic floor map of HCD Department 4th Floor"
      >
        <defs>
          <marker id="arrowhead" markerWidth="7" markerHeight="7" refX="3" refY="3" orient="auto">
            <path d="M0,0 L0,6 L7,3 z" fill={C.muted} />
          </marker>
        </defs>

        {/* Background */}
        <rect x="0" y="0" width={SVG_W} height={SVG_H} fill={C.bgPage} rx="14" />

        {/* Not-to-scale label */}
        <text x={SVG_W / 2} y={SVG_H - 5} textAnchor="middle" fontSize="7.5" fill={C.muted} fontStyle="italic">
          Schematic floor map — not to scale · Room positions approximate
        </text>

        {/* Corridor */}
        <rect x={PAD_X} y={corrY} width={SVG_W - PAD_X * 2} height={CORRIDOR_H} fill={C.corridor} rx="6" />
        <text x={SVG_W / 2} y={corrY + CORRIDOR_H / 2 + 4} textAnchor="middle" fontSize="8" fill="#7A9490" fontWeight="600" letterSpacing="0.08em">
          CORRIDOR
        </text>

        {/* Teal pillar (near entrance, right side) */}
        <circle cx={SVG_W - PAD_X - PILLAR_R - 6} cy={corrY + CORRIDOR_H / 2} r={PILLAR_R} fill={C.pillars} stroke={C.labStroke} strokeWidth="1.5" />
        <text x={SVG_W - PAD_X - PILLAR_R - 6} y={corrY + CORRIDOR_H / 2 + 3.5} textAnchor="middle" fontSize="5" fill="#FFFFFF" fontWeight="700">
          PILLAR
        </text>

        {/* Lab tiles */}
        {LAB_ROOMS.map(r => <RoomTile key={r.id} room={r} y={labY} />)}

        {/* Faculty tiles */}
        {FAC_ROOMS.map(r => <RoomTile key={r.id} room={r} y={facY} />)}

        {/* Entrance marker (bottom-right) */}
        <rect x={SVG_W - PAD_X - ENTRANCE_W} y={entrY} width={ENTRANCE_W} height={ENTRANCE_H} fill={C.entrance} rx="8" />
        <text x={SVG_W - PAD_X - ENTRANCE_W / 2} y={entrY + 15} textAnchor="middle" fontSize="8.5" fill={C.entrText} fontWeight="800" letterSpacing="0.1em">
          ENTRANCE
        </text>
        <text x={SVG_W - PAD_X - ENTRANCE_W / 2} y={entrY + 28} textAnchor="middle" fontSize="6.5" fill="#99F6E4">
          Glass door · 4th Floor
        </text>

        {/* Direction arrow */}
        <line
          x1={SVG_W - PAD_X - ENTRANCE_W / 2} y1={entrY}
          x2={SVG_W - PAD_X - ENTRANCE_W / 2} y2={facY + TILE_H + 6}
          stroke={C.muted} strokeWidth="1.5" strokeDasharray="3 3"
          markerEnd="url(#arrowhead)"
        />

        {/* Legend (top-right) */}
        <g transform={`translate(${SVG_W - 76}, ${PAD_TOP})`}>
          <rect width="70" height="38" rx="6" fill="rgba(255,255,255,0.92)" stroke={C.border} strokeWidth="1" />
          <circle cx="10" cy="11" r="5" fill={C.labFill} />
          <text x="20" y="15" fontSize="7" fill={C.text} fontWeight="600">Laboratory</text>
          <rect x="5" y="22" width="12" height="10" rx="2" fill={C.facFill} stroke={C.facStroke} strokeWidth="1" />
          <text x="20" y="30" fontSize="7" fill={C.text} fontWeight="600">Faculty Room</text>
        </g>
      </svg>
    </div>
  );
}

function RoomCard({ room, isSelected, onSelect }) {
  const isLab = room.type === 'lab' || room.type === 'studio';
  return (
    <div
      onClick={() => onSelect(room)}
      role="button" tabIndex={0}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onSelect(room); }}
      aria-pressed={isSelected}
      style={{
        backgroundColor: C.bgCard,
        border: `2px solid ${isSelected ? C.labSelected : C.border}`,
        borderRadius: '16px', padding: '16px 18px',
        cursor: 'pointer', outline: 'none',
        transition: 'border-color 0.18s, box-shadow 0.18s',
        boxShadow: isSelected
          ? '0 0 0 3px rgba(41,182,190,0.15), 0 4px 16px rgba(26,92,88,0.1)'
          : '0 2px 8px rgba(26,92,88,0.06)',
        marginBottom: '10px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '8px' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
            <span style={{
              width: '28px', height: '28px', borderRadius: '8px', flexShrink: 0,
              backgroundColor: isLab ? C.labFill : C.facFill,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <i className={`bi ${isLab ? 'bi-grid-3x3-gap-fill' : 'bi-person-workspace'}`}
                style={{ color: isLab ? '#FFFFFF' : C.labFill, fontSize: '0.78rem' }} />
            </span>
            <span style={{ fontWeight: 700, fontSize: '0.95rem', color: C.text, lineHeight: 1.25 }}>
              {room.name}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <span style={{
              backgroundColor: '#EFF9F9', color: C.labFill, fontWeight: 700,
              fontSize: '0.72rem', borderRadius: '6px', padding: '1px 8px',
              border: `1px solid ${C.border}`,
            }}>
              {room.roomNumber || (room.roomNumberNote || 'Room TBC')}
            </span>
            <span style={{ fontSize: '0.72rem', color: C.muted, fontWeight: 500 }}>{room.category}</span>
            {room.fromDirectory && (
              <span style={{
                fontSize: '0.66rem', color: '#059669', fontWeight: 600,
                backgroundColor: '#ECFDF5', borderRadius: '10px', padding: '1px 7px',
                border: '1px solid #BBF7D0',
              }}>✓ From Directory</span>
            )}
          </div>
        </div>
        <StatusBadge />
      </div>

      {room.description && (
        <p style={{ fontSize: '0.82rem', color: C.muted, margin: '6px 0 8px', lineHeight: 1.5 }}>
          {room.description}
        </p>
      )}

      {room.sharedRoomNote && (
        <div style={{
          backgroundColor: '#FFFBEB', border: '1px solid #FDE68A',
          borderRadius: '8px', padding: '6px 10px',
          fontSize: '0.73rem', color: '#92400E', marginBottom: '8px',
        }}>
          <i className="bi bi-info-circle-fill me-1" />{room.sharedRoomNote}
        </div>
      )}

      {room.directorVerified && room.director && (
        <div style={{ fontSize: '0.78rem', color: C.text, marginBottom: '4px' }}>
          <i className="bi bi-person-fill me-1" style={{ color: C.labFill }} />{room.director}
        </div>
      )}
      {room.emailVerified && room.email && (
        <a
          href={`mailto:${room.email}`}
          onClick={e => e.stopPropagation()}
          style={{ fontSize: '0.78rem', color: C.labSelected, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
        >
          <i className="bi bi-envelope-fill" />{room.email}
        </a>
      )}

      <div style={{ fontSize: '0.68rem', color: '#9DAAA5', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
        <i className="bi bi-pin-map" />{room.positionNote}
      </div>

      {room.tags && room.tags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '8px' }}>
          {room.tags.map(tag => (
            <span key={tag} style={{
              backgroundColor: C.tagBg, color: C.tagText,
              border: `1px solid ${C.chipBorder}`,
              borderRadius: '20px', fontSize: '0.66rem', fontWeight: 600, padding: '2px 9px',
            }}>{tag}</span>
          ))}
        </div>
      )}

      <div style={{ marginTop: '10px', textAlign: 'right' }}>
        <span style={{ fontSize: '0.72rem', color: C.labSelected, fontWeight: 600 }}>
          {isSelected ? '📍 Highlighted on map' : '↑ Locate on map'}
        </span>
      </div>
    </div>
  );
}

export default function RoomInfoView() {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [searchQuery, setSearchQuery]   = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredRooms = useMemo(() => {
    let rooms = ROOM_DATA;
    if (activeFilter === 'lab') {
      rooms = rooms.filter(r => r.type === 'lab' || r.type === 'studio');
    } else if (activeFilter === 'faculty') {
      rooms = rooms.filter(r => r.type === 'faculty');
    } else if (activeFilter === 'open-now') {
      rooms = []; // No live data source
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      rooms = rooms.filter(r =>
        r.name.toLowerCase().includes(q) ||
        (r.roomNumber && r.roomNumber.toLowerCase().includes(q)) ||
        (r.director && r.director.toLowerCase().includes(q)) ||
        (r.description && r.description.toLowerCase().includes(q)) ||
        r.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    return rooms;
  }, [activeFilter, searchQuery]);

  function handleSelectRoom(room) {
    setSelectedRoom(prev => (prev?.id === room.id ? null : room));
  }

  return (
    <div className="hcd-fade-in" style={{ maxWidth: '880px', margin: '0 auto', padding: '0 0 80px' }}>

      {/* PAGE HEADER */}
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{
          fontWeight: 800, fontSize: 'clamp(1.6rem,5vw,2rem)',
          color: C.text, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '4px',
        }}>
          Room Information
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: C.muted, fontSize: '0.85rem', fontWeight: 500 }}>
          <i className="bi bi-geo-alt-fill" style={{ color: C.labSelected }} />
          <span>4th Floor · HCD Department · R&amp;D Building</span>
        </div>
      </div>

      {/* SEARCH */}
      <div style={{
        position: 'relative', marginBottom: '14px',
        backgroundColor: C.bgCard, border: `1.5px solid ${C.border}`,
        borderRadius: '14px', display: 'flex', alignItems: 'center',
        padding: '0 14px', boxShadow: '0 2px 8px rgba(26,92,88,0.06)',
      }}>
        <i className="bi bi-search" style={{ color: C.muted, marginRight: '10px', fontSize: '0.95rem' }} />
        <input
          type="search" value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search labs, faculty rooms, or room numbers..."
          style={{
            flex: 1, border: 'none', outline: 'none',
            padding: '12px 0', fontSize: '0.9rem',
            color: C.text, backgroundColor: 'transparent',
          }}
          aria-label="Search rooms" id="room-search-input"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.muted, padding: '4px' }}
            aria-label="Clear search"
          >
            <i className="bi bi-x-circle-fill" />
          </button>
        )}
      </div>

      {/* FILTER CHIPS */}
      <div style={{
        display: 'flex', gap: '8px', flexWrap: 'nowrap',
        overflowX: 'auto', paddingBottom: '4px', marginBottom: '20px',
        WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none',
      }}>
        {FILTERS.map(f => (
          <button
            key={f.key} onClick={() => setActiveFilter(f.key)}
            style={{
              flexShrink: 0, border: `1.5px solid ${activeFilter === f.key ? C.chipActive : C.chipBorder}`,
              borderRadius: '20px', padding: '6px 16px', fontSize: '0.82rem',
              fontWeight: 700, cursor: 'pointer', outline: 'none',
              backgroundColor: activeFilter === f.key ? C.chipActive : C.bgCard,
              color: activeFilter === f.key ? C.chipActiveTxt : C.text,
              transition: 'all 0.15s',
            }}
            aria-pressed={activeFilter === f.key}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* FLOOR MAP PANEL */}
      <div style={{
        backgroundColor: C.bgCard, border: `1.5px solid ${C.border}`,
        borderRadius: '20px', padding: '16px', marginBottom: '24px',
        boxShadow: '0 4px 16px rgba(26,92,88,0.07)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.92rem', color: C.text }}>
              4th Floor · HCD Department
            </div>
            <div style={{ fontSize: '0.73rem', color: C.muted }}>
              Tap a room to see details · Schematic only — positions approximate
            </div>
          </div>
          {selectedRoom && (
            <button
              onClick={() => setSelectedRoom(null)}
              style={{
                background: 'none', border: `1px solid ${C.border}`,
                borderRadius: '8px', padding: '4px 10px',
                fontSize: '0.73rem', color: C.muted, cursor: 'pointer',
              }}
            >
              Clear selection
            </button>
          )}
        </div>

        <FloorMap selected={selectedRoom} onSelect={handleSelectRoom} />

        <div style={{
          marginTop: '12px', padding: '10px 14px',
          backgroundColor: '#F8FAF9', border: `1px solid ${C.border}`,
          borderRadius: '10px', fontSize: '0.75rem', color: C.muted, lineHeight: 1.5,
        }}>
          <i className="bi bi-info-circle me-1" style={{ color: C.labSelected }} />
          <strong style={{ color: C.text }}>Status unavailable:</strong> Live room availability is not connected.
          The interface is ready to integrate a real status feed when available.
        </div>
      </div>

      {/* SELECTED ROOM HIGHLIGHT */}
      {selectedRoom && (
        <div style={{
          backgroundColor: '#F0FAFA', border: `2px solid ${C.labSelected}`,
          borderRadius: '16px', padding: '14px 18px', marginBottom: '20px',
        }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: C.labSelected, letterSpacing: '0.08em', marginBottom: '4px' }}>
            SELECTED ROOM
          </div>
          <div style={{ fontWeight: 800, fontSize: '1.05rem', color: C.text }}>{selectedRoom.name}</div>
          {selectedRoom.roomNumber && (
            <div style={{ fontSize: '0.82rem', color: C.muted, marginTop: '2px' }}>{selectedRoom.roomNumber}</div>
          )}
        </div>
      )}

      {/* ROOMS & LABORATORIES HEADING */}
      <div style={{ marginBottom: '14px' }}>
        <h2 style={{ fontWeight: 800, fontSize: '1.2rem', color: C.text, marginBottom: '4px' }}>
          Rooms &amp; Laboratories
        </h2>
        <p style={{ fontSize: '0.82rem', color: C.muted, margin: 0 }}>
          Explore research spaces and faculty rooms on the HCD floor.
        </p>
      </div>

      {/* OPEN NOW explanation */}
      {activeFilter === 'open-now' && (
        <div style={{
          backgroundColor: '#FFFBEB', border: '1.5px solid #FDE68A',
          borderRadius: '14px', padding: '16px 18px', marginBottom: '16px',
        }}>
          <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#92400E', marginBottom: '4px' }}>
            <i className="bi bi-clock me-2" />Live room status is unavailable
          </div>
          <p style={{ fontSize: '0.8rem', color: '#78350F', margin: 0, lineHeight: 1.55 }}>
            The "Open Now" filter requires a verified real-time data source (e.g. a TA check-in
            system or room-booking API). No such source is currently connected to HCD Connect.
            Displaying this filter result without live data would show inaccurate information.
            This will update automatically once a live status feed is integrated.
          </p>
        </div>
      )}

      {/* ROOM CARDS */}
      {filteredRooms.length === 0 && activeFilter !== 'open-now' ? (
        <div style={{
          textAlign: 'center', padding: '40px 20px',
          backgroundColor: C.bgCard, borderRadius: '16px',
          border: `1px solid ${C.border}`,
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🔍</div>
          <div style={{ fontWeight: 700, color: C.text, marginBottom: '6px' }}>No rooms found</div>
          <div style={{ fontSize: '0.82rem', color: C.muted }}>
            Try adjusting your search or selecting a different filter.
          </div>
          <button
            onClick={() => { setSearchQuery(''); setActiveFilter('all'); }}
            style={{
              marginTop: '12px', padding: '8px 18px',
              backgroundColor: C.labFill, color: '#FFFFFF',
              border: 'none', borderRadius: '10px',
              fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer',
            }}
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div>
          {filteredRooms.map(room => (
            <RoomCard
              key={room.id} room={room}
              isSelected={selectedRoom?.id === room.id}
              onSelect={handleSelectRoom}
            />
          ))}
        </div>
      )}

      {/* BOTTOM DATA-SOURCE NOTICE */}
      <div style={{
        marginTop: '24px', padding: '14px 18px',
        backgroundColor: C.bgCard, border: `1px solid ${C.border}`,
        borderRadius: '14px', fontSize: '0.75rem', color: C.muted,
        lineHeight: 1.6, textAlign: 'center',
      }}>
        <i className="bi bi-camera me-1" />
        Floor layout derived from HCD Department corridor photographs and the physical
        directory signboard (TCS Foundation / CDNM). All positions are approximate.
        Faculty room numbers from <strong>hcd.iiitd.ac.in</strong>. Not architecturally surveyed.
      </div>
    </div>
  );
}
