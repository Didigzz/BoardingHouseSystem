import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { roomAPI, boarderAPI } from '../services/api';
import EditRoomModal from '../components/EditRoomModal';
import './Rooms.css';

function Rooms() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [boarders, setBoarders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const roomsRes = await roomAPI.getAllRooms();
      const boardersRes = await boarderAPI.getAllBoarders();
      
      setRooms(roomsRes.data.data || []);
      setBoarders(boardersRes.data.data || []);
      setError(null);
    } catch (err) {
      setError('Failed to fetch data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getOccupancyInfo = (roomId) => {
    const roomBoarders = boarders.filter((b) => b.room_id === roomId && b.status === 'Active');
    const occupancy = roomBoarders.length;
    const capacity = 4;
    const available = capacity - occupancy;

    let status = '';
    if (occupancy === 0) status = 'Empty';
    else if (occupancy === 1) status = '1 Boarder';
    else if (occupancy === 2) status = '2 Boarders';
    else if (occupancy === 3) status = '3 Boarders';
    else if (occupancy >= 4) status = 'Full';

    return { occupancy, capacity, available, status };
  };

  const handleEditClick = (room) => {
    setSelectedRoom(room);
    setShowEditModal(true);
  };

  const handleRoomUpdated = (updatedRoom) => {
    setRooms(rooms.map((r) => (r.id === updatedRoom.id ? updatedRoom : r)));
    setShowEditModal(false);
    setSelectedRoom(null);
  };

  if (loading) return <div className="rooms-loading">Loading rooms...</div>;
  if (error) return <div className="rooms-error">{error}</div>;

  return (
    <div className="rooms">
      <div className="rooms-header">
        <div>
          <h1>🏠 Rooms Management</h1>
          <p className="header-subtitle">4 bed-spaces per room • ₱600/bed or ₱2,400 full room • 10 Total Rooms</p>
        </div>
      </div>

      <div className="rooms-grid">
        {rooms.sort((a, b) => a.room_number - b.room_number).map((room) => {
          const occupancy = getOccupancyInfo(room.id);
          const roomNumber = `Room ${room.room_number}`;
          
          return (
            <div key={room.id} className="room-card">
              <div className="room-header">
                <h3>{roomNumber}</h3>
                <span className={`room-status ${getStatusClass(occupancy.status)}`}>
                  {occupancy.status}
                </span>
              </div>

              <div className="room-body">
                <div className="occupancy-info">
                  <p className="occupancy-text">
                    <strong>{occupancy.occupancy}/{occupancy.capacity}</strong> Boarders
                  </p>
                  <p className="availability-text">
                    {occupancy.available} bed-space{occupancy.available !== 1 ? 's' : ''} available
                  </p>
                </div>

                <div className="room-pricing">
                  <div className="price-item">
                    <span className="price-label">Per Bed-space:</span>
                    <span className="price-value">₱600</span>
                  </div>
                  <div className="price-item">
                    <span className="price-label">Full Room:</span>
                    <span className="price-value">₱2,400</span>
                  </div>
                </div>

                <p className="room-type">
                  <strong>Type:</strong> Shared (4 Beds)
                </p>

                {occupancy.occupancy > 0 && (
                  <div className="room-boarders">
                    <strong>Boarders:</strong>
                    <div className="boarders-list">
                      {boarders
                        .filter((b) => b.room_id === room.id && b.status === 'Active')
                        .map((boarder) => (
                          <div key={boarder.id} className="boarder-item">
                            <button
                              className="boarder-link"
                              onClick={() => navigate(`/boarders/${boarder.id}`)}
                            >
                              👤 {boarder.name}
                            </button>
                            <span className="boarder-info">({boarder.sex})</span>
                            <span className="boarder-contact">📱 {boarder.contact_number || 'N/A'}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="room-footer">
                <button
                  className="btn btn-small btn-primary"
                  onClick={() => handleEditClick(room)}
                >
                  ✏️ Edit Details
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {showEditModal && selectedRoom && (
        <EditRoomModal
          isOpen={showEditModal}
          room={selectedRoom}
          roomBoarders={boarders.filter((b) => b.room_id === selectedRoom.id && b.status === 'Active')}
          onClose={() => {
            setShowEditModal(false);
            setSelectedRoom(null);
          }}
          onRoomUpdated={handleRoomUpdated}
        />
      )}
    </div>
  );
}

function getStatusClass(status) {
  const statusMap = {
    'Empty': 'gray',
    '1 Boarder': 'yellow',
    '2 Boarders': 'yellow',
    '3 Boarders': 'orange',
    'Full': 'green',
  };
  return statusMap[status] || 'gray';
}

export default Rooms;
