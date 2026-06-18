/**
 * AeroSquad — Drone Fleet Command Center
 * app.js — Core Application Logic
 */

// ============================
// MOCK DATA
// ============================
const DRONE_DATA = [
  {
    id: 'DRN-094',
    operator: 'Alpha Ops',
    team: 'Strike Team A',
    battery: 87,
    fleetTag: 'ALPHA-1',
    altitude: '142m',
    status: 'In-Flight',
    speed: '48 km/h',
    signal: '98%',
    flightTime: '1h 22m',
    lastPing: '0.3s ago',
    avatarColor: '#00D4FF',
    avatarBg: 'rgba(0,212,255,0.15)',
    avatarInitials: 'AO',
  },
  {
    id: 'DRN-017',
    operator: 'Bravo Command',
    team: 'Intel Division',
    battery: 61,
    fleetTag: 'BRAVO-3',
    altitude: '89m',
    status: 'In-Flight',
    speed: '32 km/h',
    signal: '94%',
    flightTime: '0h 48m',
    lastPing: '0.5s ago',
    avatarColor: '#00E87A',
    avatarBg: 'rgba(0,232,122,0.15)',
    avatarInitials: 'BC',
  },
  {
    id: 'DRN-203',
    operator: 'Echo Unit',
    team: 'Recon Fleet',
    battery: 12,
    fleetTag: 'ECHO-7',
    altitude: '0m',
    status: 'Critical Alert',
    speed: '0 km/h',
    signal: '23%',
    flightTime: '3h 02m',
    lastPing: '4.8s ago',
    avatarColor: '#FF3B5C',
    avatarBg: 'rgba(255,59,92,0.15)',
    avatarInitials: 'EU',
  },
  {
    id: 'DRN-158',
    operator: 'Delta Force',
    team: 'Strike Team B',
    battery: 99,
    fleetTag: 'DELTA-2',
    altitude: '0m',
    status: 'Idle',
    speed: '0 km/h',
    signal: '100%',
    flightTime: '0h 00m',
    lastPing: '0.1s ago',
    avatarColor: '#4D8EFF',
    avatarBg: 'rgba(77,142,255,0.15)',
    avatarInitials: 'DF',
  },
  {
    id: 'DRN-312',
    operator: 'Foxtrot Sys',
    team: 'Maintenance Crew',
    battery: 45,
    fleetTag: 'FOX-1',
    altitude: '0m',
    status: 'Maintenance',
    speed: '0 km/h',
    signal: '76%',
    flightTime: '2h 15m',
    lastPing: '1.2s ago',
    avatarColor: '#FFB800',
    avatarBg: 'rgba(255,184,0,0.15)',
    avatarInitials: 'FS',
  },
  {
    id: 'DRN-007',
    operator: 'Ghost Recon',
    team: 'Shadow Ops',
    battery: 78,
    fleetTag: 'GHOST-X',
    altitude: '210m',
    status: 'In-Flight',
    speed: '61 km/h',
    signal: '89%',
    flightTime: '0h 31m',
    lastPing: '0.4s ago',
    avatarColor: '#00D4FF',
    avatarBg: 'rgba(0,212,255,0.15)',
    avatarInitials: 'GR',
  },
  {
    id: 'DRN-441',
    operator: 'Hotel Squad',
    team: 'Perimeter Watch',
    battery: 55,
    fleetTag: 'HOTEL-4',
    altitude: '55m',
    status: 'In-Flight',
    speed: '25 km/h',
    signal: '92%',
    flightTime: '1h 05m',
    lastPing: '0.6s ago',
    avatarColor: '#00E87A',
    avatarBg: 'rgba(0,232,122,0.15)',
    avatarInitials: 'HS',
  },
  {
    id: 'DRN-089',
    operator: 'India Base',
    team: 'Logistics Hub',
    battery: 33,
    fleetTag: 'INDIA-2',
    altitude: '0m',
    status: 'Maintenance',
    speed: '0 km/h',
    signal: '65%',
    flightTime: '4h 12m',
    lastPing: '0.8s ago',
    avatarColor: '#FFB800',
    avatarBg: 'rgba(255,184,0,0.15)',
    avatarInitials: 'IB',
  },
  {
    id: 'DRN-560',
    operator: 'Juliet Wing',
    team: 'Air Recon',
    battery: 92,
    fleetTag: 'JULIET-6',
    altitude: '178m',
    status: 'In-Flight',
    speed: '54 km/h',
    signal: '97%',
    flightTime: '0h 14m',
    lastPing: '0.2s ago',
    avatarColor: '#4D8EFF',
    avatarBg: 'rgba(77,142,255,0.15)',
    avatarInitials: 'JW',
  },
  {
    id: 'DRN-773',
    operator: 'Kilo Unit',
    team: 'Strike Team C',
    battery: 72,
    fleetTag: 'KILO-3',
    altitude: '0m',
    status: 'Idle',
    speed: '0 km/h',
    signal: '100%',
    flightTime: '0h 00m',
    lastPing: '0.1s ago',
    avatarColor: '#4D8EFF',
    avatarBg: 'rgba(77,142,255,0.15)',
    avatarInitials: 'KU',
  },
  {
    id: 'DRN-228',
    operator: 'Lima Core',
    team: 'Logistics Hub',
    battery: 8,
    fleetTag: 'LIMA-1',
    altitude: '0m',
    status: 'Critical Alert',
    speed: '0 km/h',
    signal: '11%',
    flightTime: '5h 44m',
    lastPing: '9.1s ago',
    avatarColor: '#FF3B5C',
    avatarBg: 'rgba(255,59,92,0.15)',
    avatarInitials: 'LC',
  },
  {
    id: 'DRN-499',
    operator: 'Mike Force',
    team: 'Strike Team A',
    battery: 66,
    fleetTag: 'MIKE-9',
    altitude: '115m',
    status: 'In-Flight',
    speed: '41 km/h',
    signal: '88%',
    flightTime: '0h 58m',
    lastPing: '0.5s ago',
    avatarColor: '#00D4FF',
    avatarBg: 'rgba(0,212,255,0.15)',
    avatarInitials: 'MF',
  },
];

// ============================
// STATE
// ============================
let currentPage = 1;
const PAGE_SIZE = 10;
let currentFilter = 'all';
let searchQuery = '';
let activeTooltipId = null;

// ============================
// HELPERS
// ============================
function getBatteryClass(pct) {
  if (pct >= 60) return 'battery-high';
  if (pct >= 30) return 'battery-mid';
  return 'battery-low';
}
function getBatteryFillClass(pct) {
  if (pct >= 60) return 'battery-fill-high';
  if (pct >= 30) return 'battery-fill-mid';
  return 'battery-fill-low';
}
function getBatteryBarColor(pct) {
  if (pct >= 60) return '#00E87A';
  if (pct >= 30) return '#FFB800';
  return '#FF3B5C';
}
function getStatusBadge(status) {
  const map = {
    'In-Flight': { cls: 'badge-inflight', testid: 'status-badge-inflight' },
    'Idle': { cls: 'badge-idle', testid: 'status-badge-idle' },
    'Maintenance': { cls: 'badge-maintenance', testid: 'status-badge-maintenance' },
    'Critical Alert': { cls: 'badge-critical', testid: 'status-badge-critical' },
  };
  return map[status] || { cls: 'badge-idle', testid: 'status-badge-idle' };
}

// ============================
// FILTER + SEARCH
// ============================
function getFilteredData() {
  return DRONE_DATA.filter(d => {
    const matchFilter = currentFilter === 'all' || d.status === currentFilter;
    const q = searchQuery.toLowerCase();
    const matchSearch = !q ||
      d.id.toLowerCase().includes(q) ||
      d.operator.toLowerCase().includes(q) ||
      d.team.toLowerCase().includes(q) ||
      d.fleetTag.toLowerCase().includes(q) ||
      d.status.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });
}

// ============================
// RENDER TABLE
// ============================
function renderTable() {
  const filtered = getFilteredData();
  const tbody = document.getElementById('drone-table-body');
  const empty = document.getElementById('empty-state');
  const pagination = document.getElementById('pagination');
  const tableCount = document.getElementById('table-count');

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  if (currentPage > totalPages) currentPage = totalPages;

  const start = (currentPage - 1) * PAGE_SIZE;
  const end = Math.min(start + PAGE_SIZE, total);
  const pageData = filtered.slice(start, end);

  // Update count
  tableCount.textContent = `${total} unit${total !== 1 ? 's' : ''}`;

  // Empty state
  if (total === 0) {
    tbody.innerHTML = '';
    empty.classList.remove('hidden');
    pagination.style.display = 'none';
    return;
  }

  empty.classList.add('hidden');
  pagination.style.display = '';

  // Skeleton → real rows
  tbody.innerHTML = pageData.map((d, i) => {
    const badge = getStatusBadge(d.status);
    const batClass = getBatteryClass(d.battery);
    const batFill = getBatteryFillClass(d.battery);
    const rowIndex = start + i;
    return `
      <tr data-testid="drone-row-${d.id}" data-drone-id="${d.id}" class="drone-row">
        <td>
          <span class="drone-id-cell" data-testid="drone-id-${d.id}">${d.id}</span>
        </td>
        <td>
          <div class="operator-cell">
            <div class="op-avatar" style="color:${d.avatarColor};background:${d.avatarBg};">${d.avatarInitials}</div>
            <div>
              <div class="op-name" data-testid="drone-operator-name">${d.operator}</div>
              <div class="op-team">${d.team}</div>
            </div>
          </div>
        </td>
        <td>
          <div class="battery-cell ${batClass}" data-testid="drone-battery-${d.id}">
            <div class="battery-icon">
              <div class="battery-fill ${batFill}" style="width:${d.battery}%"></div>
            </div>
            <span class="battery-pct ${batClass}">${d.battery}%</span>
          </div>
        </td>
        <td>
          <span class="fleet-tag" data-testid="drone-fleet-tag-${d.id}">${d.fleetTag}</span>
        </td>
        <td>
          <div class="altitude-cell" data-testid="drone-altitude-${d.id}">
            ${d.altitude}<span> ASL</span>
          </div>
        </td>
        <td>
          <span class="status-badge ${badge.cls}" data-testid="${badge.testid}">${d.status}</span>
        </td>
        <td>
          <button
            class="action-btn"
            data-testid="drone-action-tooltip-trigger"
            data-drone-id="${d.id}"
            onclick="showTooltip(event, '${d.id}')"
            aria-label="View diagnostics for ${d.id}"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="currentColor" stroke-width="1.2"/><path d="M6 5V8" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><circle cx="6" cy="3.5" r="0.6" fill="currentColor"/></svg>
            Diagnostics
          </button>
        </td>
      </tr>
    `;
  }).join('');

  renderPagination(total, totalPages);
}

// ============================
// PAGINATION RENDER
// ============================
function renderPagination(total, totalPages) {
  const info = document.getElementById('pagination-info');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const pageNumbers = document.getElementById('page-numbers');

  const start = (currentPage - 1) * PAGE_SIZE + 1;
  const end = Math.min(currentPage * PAGE_SIZE, total);
  info.textContent = `Showing ${total === 0 ? 0 : start}–${end} of ${total}`;

  prevBtn.disabled = currentPage <= 1;
  nextBtn.disabled = currentPage >= totalPages;

  // Page number buttons
  pageNumbers.innerHTML = '';
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.className = `page-num${i === currentPage ? ' active' : ''}`;
    btn.textContent = i;
    btn.dataset.testid = `page-num-${i}`;
    btn.setAttribute('aria-label', `Go to page ${i}`);
    btn.addEventListener('click', () => {
      currentPage = i;
      renderTable();
    });
    pageNumbers.appendChild(btn);
  }
}

// ============================
// DIAGNOSTIC TOOLTIP
// ============================
function showTooltip(event, droneId) {
  const drone = DRONE_DATA.find(d => d.id === droneId);
  if (!drone) return;

  const tooltip = document.getElementById('diagnostic-tooltip');

  document.getElementById('tooltip-drone-id').textContent = drone.id;
  document.getElementById('td-battery').textContent = `${drone.battery}%`;
  document.getElementById('td-altitude').textContent = drone.altitude;
  document.getElementById('td-speed').textContent = drone.speed;
  document.getElementById('td-signal').textContent = drone.signal;
  document.getElementById('td-flighttime').textContent = drone.flightTime;
  document.getElementById('td-lastping').textContent = drone.lastPing;

  const bar = document.getElementById('td-battery-bar');
  bar.style.width = `${drone.battery}%`;
  bar.style.background = getBatteryBarColor(drone.battery);

  document.getElementById('td-status-label').textContent = `${drone.battery}% charge`;

  // Position tooltip near click
  const rect = event.currentTarget.getBoundingClientRect();
  const tooltipW = 290;
  const tooltipH = 230;

  let top = rect.bottom + 8;
  let left = rect.left;

  if (left + tooltipW > window.innerWidth - 16) {
    left = window.innerWidth - tooltipW - 16;
  }
  if (top + tooltipH > window.innerHeight - 16) {
    top = rect.top - tooltipH - 8;
  }

  tooltip.style.top = `${top + window.scrollY}px`;
  tooltip.style.left = `${left}px`;
  tooltip.classList.remove('hidden');
  activeTooltipId = droneId;
}

function closeTooltip() {
  document.getElementById('diagnostic-tooltip').classList.add('hidden');
  activeTooltipId = null;
}

document.getElementById('tooltip-close').addEventListener('click', closeTooltip);

document.addEventListener('click', (e) => {
  const tooltip = document.getElementById('diagnostic-tooltip');
  if (!tooltip.contains(e.target) && !e.target.closest('[data-testid="drone-action-tooltip-trigger"]')) {
    closeTooltip();
  }
});

// ============================
// SIDEBAR TOGGLE
// ============================
document.getElementById('sidebar-toggle-btn').addEventListener('click', () => {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('collapsed');
});

// ============================
// SEARCH
// ============================
const searchInput = document.getElementById('search-input');
let searchDebounce;
searchInput.addEventListener('input', (e) => {
  clearTimeout(searchDebounce);
  searchDebounce = setTimeout(() => {
    searchQuery = e.target.value.trim();
    currentPage = 1;
    renderTable();
  }, 200);
});

function resetSearch() {
  searchInput.value = '';
  searchQuery = '';
  currentPage = 1;
  renderTable();
}

// ============================
// FILTER TABS
// ============================
document.querySelectorAll('.filter-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    currentPage = 1;
    renderTable();
  });
});

// ============================
// PAGINATION BUTTONS
// ============================
document.getElementById('prev-btn').addEventListener('click', () => {
  if (currentPage > 1) { currentPage--; renderTable(); }
});
document.getElementById('next-btn').addEventListener('click', () => {
  const total = getFilteredData().length;
  const totalPages = Math.ceil(total / PAGE_SIZE);
  if (currentPage < totalPages) { currentPage++; renderTable(); }
});

// ============================
// SIMULATE API ERROR
// (for QA testing / demo)
// ============================
function simulateApiError(code = 500) {
  const tbody = document.getElementById('drone-table-body');
  const empty = document.getElementById('empty-state');
  const errorState = document.getElementById('error-state');
  const desc = document.getElementById('error-desc');
  const pagination = document.getElementById('pagination');

  tbody.innerHTML = '';
  empty.classList.add('hidden');
  pagination.style.display = 'none';

  const messages = {
    500: 'Internal Server Error (500): The command server failed to process your request.',
    401: 'Unauthorized (401): Your session token has expired. Please re-authenticate.',
    403: 'Forbidden (403): You do not have clearance to access this resource.',
    503: 'Service Unavailable (503): Fleet API is currently offline for maintenance.',
  };

  desc.textContent = messages[code] || messages[500];
  errorState.classList.remove('hidden');
}

function retryLoad() {
  const errorState = document.getElementById('error-state');
  const pagination = document.getElementById('pagination');
  errorState.classList.add('hidden');
  pagination.style.display = '';
  renderTable();
}

// ============================
// EXPORT BUTTON (demo)
// ============================
document.getElementById('export-btn').addEventListener('click', () => {
  const filtered = getFilteredData();
  const csv = [
    ['Drone ID', 'Operator', 'Team', 'Battery', 'Fleet Tag', 'Altitude', 'Status', 'Speed', 'Signal'],
    ...filtered.map(d => [d.id, d.operator, d.team, `${d.battery}%`, d.fleetTag, d.altitude, d.status, d.speed, d.signal])
  ].map(row => row.join(',')).join('\n');

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'aerosquad-fleet-export.csv';
  a.click();
  URL.revokeObjectURL(url);
});

// ============================
// KEYBOARD SHORTCUT: ⌘K
// ============================
document.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    searchInput.focus();
    searchInput.select();
  }
  if (e.key === 'Escape') {
    closeTooltip();
  }
});

// ============================
// INIT
// ============================
document.addEventListener('DOMContentLoaded', () => {
  renderTable();
});
