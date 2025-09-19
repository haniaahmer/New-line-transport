import React, { useState, useEffect } from 'react';
import { MapPin, Users, Truck, Navigation, RefreshCw, Maximize2, Settings, Clock } from 'lucide-react';

const DriverTrackingMap = () => {
  const [selectedDriverType, setSelectedDriverType] = useState('All');
  const [isLive, setIsLive] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Mock driver data
  const drivers = [
    { id: 1, name: 'Mike S', type: 'Owner Driver', lat: 31.5804, lng: 74.3587, status: 'Active', vehicle: 'Van-001', lastUpdate: '2 min ago' },
    { id: 2, name: 'Sarah L', type: 'Fleet Driver', lat: 31.5904, lng: 74.3687, status: 'On Job', vehicle: 'Truck-205', lastUpdate: '1 min ago' },
    { id: 3, name: 'Tom R', type: 'Subcontractor Driver', lat: 31.5704, lng: 74.3487, status: 'Available', vehicle: 'Van-103', lastUpdate: '3 min ago' },
    { id: 4, name: 'John D', type: 'Owner Driver', lat: 31.5654, lng: 74.3537, status: 'Break', vehicle: 'Car-007', lastUpdate: '5 min ago' },
    { id: 5, name: 'Lisa M', type: 'Fleet Driver', lat: 31.5754, lng: 74.3637, status: 'Active', vehicle: 'Truck-301', lastUpdate: '1 min ago' },
  ];

  const stats = [
    { title: 'Total Active Drivers', value: drivers.filter(d => d.status === 'Active').length, icon: Users, color: 'green' },
    { title: 'Drivers on Job', value: drivers.filter(d => d.status === 'On Job').length, icon: Navigation, color: 'blue' },
    { title: 'Available Drivers', value: drivers.filter(d => d.status === 'Available').length, icon: Truck, color: 'orange' },
    { title: 'Total Vehicles', value: drivers.length, icon: MapPin, color: 'purple' }
  ];

  const getDriverTypeColor = (type) => {
    switch (type) {
      case 'Owner Driver': return '#10B981'; // green
      case 'Fleet Driver': return '#3B82F6'; // blue
      case 'Subcontractor Driver': return '#F59E0B'; // yellow
      default: return '#6B7280'; // gray
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      'Active': 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
      'On Job': 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
      'Available': 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
      'Break': 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
    };
    return (
      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${colors[status]}`}>
        {status}
      </span>
    );
  };

  const filteredDrivers = selectedDriverType === 'All' 
    ? drivers 
    : drivers.filter(driver => driver.type === selectedDriverType);

  useEffect(() => {
    if (isLive) {
      const interval = setInterval(() => {
        setLastUpdate(new Date());
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [isLive]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Driver Tracking</h1>
              <p className="text-gray-600 dark:text-gray-400">Track all of your active drivers at one place</p>
              <div className="flex items-center gap-2 mt-2">
                <Clock size={16} className="text-gray-400" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Last updated: {lastUpdate.toLocaleTimeString()}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsLive(!isLive)}
                className={`px-4 py-2 rounded-xl font-medium flex items-center gap-2 transition-all duration-200 ${
                  isLive 
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' 
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-600 dark:text-gray-300'
                }`}
              >
                <RefreshCw size={16} className={isLive ? 'animate-spin' : ''} />
                {isLive ? 'Live' : 'Paused'}
              </button>
              <button className="p-3 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors duration-200">
                <Settings size={20} />
              </button>
            </div>
          </div>
        </div>

       
      
          
        
            

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Map */}
          <div className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Live Map</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Real-time driver locations</p>
              </div>
              <div className="flex items-center gap-3">
                <select
                  className="px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                  value={selectedDriverType}
                  onChange={(e) => setSelectedDriverType(e.target.value)}
                >
                  <option value="All">All Drivers</option>
                  <option value="Owner Driver">Owner Driver</option>
                  <option value="Fleet Driver">Fleet Driver</option>
                  <option value="Subcontractor Driver">Subcontractor Driver</option>
                </select>
                <button className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200">
                  <Maximize2 size={16} />
                </button>
              </div>
            </div>

            <div className="relative bg-gray-100 dark:bg-gray-700" style={{ height: '600px' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
                <div className="absolute inset-0 opacity-10">
                  {[...Array(20)].map((_, i) => (
                    <div key={`h-${i}`} className="absolute w-full h-px bg-gray-300 dark:bg-gray-600" style={{ top: `${i * 5}%` }} />
                  ))}
                  {[...Array(20)].map((_, i) => (
                    <div key={`v-${i}`} className="absolute h-full w-px bg-gray-300 dark:bg-gray-600" style={{ left: `${i * 5}%` }} />
                  ))}
                </div>

                {/* Driver markers */}
                {filteredDrivers.map((driver) => (
                  <div
                    key={driver.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                    style={{
                      left: `${20 + (driver.id * 15)}%`,
                      top: `${20 + (driver.id * 12)}%`
                    }}
                  >
                    <div 
                      className="w-4 h-4 rounded-full border-2 border-white shadow-lg animate-pulse"
                      style={{ backgroundColor: getDriverTypeColor(driver.type) }}
                    ></div>

                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                      <div className="font-medium">{driver.name}</div>
                      <div className="text-xs opacity-75">{driver.vehicle}</div>
                      <div className="text-xs opacity-75">{driver.status}</div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                    </div>
                  </div>
                ))}

                <div className="absolute bottom-4 right-4 text-xs text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 px-2 py-1 rounded">
                  © Mapbox © OpenStreetMap
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Active Drivers</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{filteredDrivers.length} drivers online</p>
            </div>
            
            <div className="max-h-96 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-700">
              {filteredDrivers.map((driver) => (
                <div key={driver.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150 flex justify-between items-start">
                  <div className="flex items-start gap-3">
                    <div 
                      className="w-3.5 h-3.5 rounded-full mt-1 shadow-sm"
                      style={{ backgroundColor: getDriverTypeColor(driver.type) }}
                    ></div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{driver.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{driver.vehicle}</p>
                      <p className="text-xs text-gray-500 mt-1">{driver.lastUpdate}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(driver.status)}
                    <p className="text-xs text-gray-500 mt-1">{driver.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Driver Types</h3>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-400 shadow-sm"></div>
              <span className="text-gray-700 dark:text-gray-300 text-sm">Owner Driver</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-400 shadow-sm"></div>
              <span className="text-gray-700 dark:text-gray-300 text-sm">Fleet Driver</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-yellow-400 shadow-sm"></div>
              <span className="text-gray-700 dark:text-gray-300 text-sm">Subcontractor Driver</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverTrackingMap;
