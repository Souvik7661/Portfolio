import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ExternalLink, Navigation, X, Compass, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

const SHYAMNAGAR_LAT = 22.8351;
const SHYAMNAGAR_LNG = 88.3687;

interface UserLocation {
  lat: number;
  lng: number;
  distanceKm: number | null;
}

export const LocationMapModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loadingGeo, setLoadingGeo] = useState(false);
  const [userLoc, setUserLoc] = useState<UserLocation | null>(null);
  const [geoError, setGeoError] = useState<string | null>(null);

  const calculateDistanceKm = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Earth radius in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c * 10) / 10;
  };

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setGeoError('Geolocation is not supported by your browser.');
      return;
    }

    setLoadingGeo(true);
    setGeoError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const distance = calculateDistanceKm(latitude, longitude, SHYAMNAGAR_LAT, SHYAMNAGAR_LNG);

        setUserLoc({
          lat: latitude,
          lng: longitude,
          distanceKm: distance,
        });
        setLoadingGeo(false);
      },
      (error) => {
        setLoadingGeo(false);
        if (error.code === error.PERMISSION_DENIED) {
          setGeoError('Location access was denied. Please allow location access to calculate real-time distance.');
        } else {
          setGeoError('Unable to retrieve your location at this time.');
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const googleMapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Shyamnagar, West Bengal, India'
  )}`;

  const googleMapsDirectionsUrl = userLoc
    ? `https://www.google.com/maps/dir/?api=1&origin=${userLoc.lat},${userLoc.lng}&destination=${SHYAMNAGAR_LAT},${SHYAMNAGAR_LNG}`
    : `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent('Shyamnagar, West Bengal, India')}`;

  const embedMapUrl = `https://maps.google.com/maps?q=${SHYAMNAGAR_LAT},${SHYAMNAGAR_LNG}&hl=en&z=13&output=embed`;

  return (
    <>
      {/* Location Card trigger matching user design */}
      <motion.button
        type="button"
        onClick={() => setIsOpen(true)}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="p-5 rounded-2xl bg-white border border-[#EAECE9] hover:border-[#E8702A]/50 hover:shadow-lg transition-all flex items-center justify-between gap-4 group cursor-pointer w-full text-left relative overflow-hidden"
      >
        <div className="flex items-center gap-4 min-w-0">
          <div className="p-3 rounded-xl bg-[#1C2E1E]/5 text-[#1C2E1E] group-hover:bg-[#E8702A] group-hover:text-white transition-colors shrink-0">
            <MapPin className="w-5 h-5 text-[#E8702A] group-hover:text-white transition-colors" />
          </div>
          <div className="overflow-hidden">
            <div className="flex items-center gap-2">
              <p className="text-xs font-mono uppercase tracking-wider text-[#738273]">Location</p>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-mono font-medium border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Map
              </span>
            </div>
            <p className="text-sm font-semibold text-[#1C2E1E] mt-0.5 group-hover:text-[#E8702A] transition-colors truncate">
              Shyamnagar, West Bengal
            </p>
          </div>
        </div>

        <div className="shrink-0 text-xs font-mono text-[#738273] group-hover:text-[#E8702A] flex items-center gap-1">
          <Compass className="w-4 h-4" />
        </div>
      </motion.button>

      {/* Google Maps & Real-time Location Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5, bounce: 0.2 }}
              className="relative w-full max-w-2xl bg-[#0A0A0A] border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden text-white z-10 my-auto"
            >
              {/* Modal Header */}
              <div className="p-5 sm:p-6 border-b border-neutral-800 flex items-center justify-between bg-gradient-to-r from-neutral-900 to-black">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#E8702A]/10 text-[#E8702A] border border-[#E8702A]/20">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                      Shyamnagar, West Bengal
                      <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300 font-normal">
                        India
                      </span>
                    </h3>
                    <p className="text-xs font-mono text-neutral-400">
                      22.8351° N, 88.3687° E · Creative Developer Base
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Embedded Google Map */}
              <div className="relative w-full h-64 sm:h-80 bg-neutral-900">
                <iframe
                  title="Google Maps Shyamnagar"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'contrast(1.05) saturate(1.1)' }}
                  loading="lazy"
                  allowFullScreen
                  src={embedMapUrl}
                />

                {/* Map Overlay Floating Badge */}
                <div className="absolute top-3 left-3 bg-[#0A0A0A]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-neutral-800 text-xs font-mono text-neutral-300 flex items-center gap-2 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>Google Maps View</span>
                </div>
              </div>

              {/* Real-time Location Control & Info Bar */}
              <div className="p-5 sm:p-6 space-y-4 bg-neutral-950">
                {/* Distance status display */}
                {userLoc && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 flex items-start gap-3 text-sm"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-emerald-200">
                        Real-time location detected!
                      </p>
                      <p className="text-xs text-emerald-300/90 mt-0.5 font-mono">
                        You are approximately <strong className="text-white">{userLoc.distanceKm} km</strong> away from Shyamnagar, West Bengal.
                      </p>
                    </div>
                  </motion.div>
                )}

                {geoError && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 text-amber-300 flex items-start gap-3 text-sm"
                  >
                    <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-amber-200">Location Status</p>
                      <p className="text-xs text-amber-300/90 mt-0.5 font-mono">{geoError}</p>
                    </div>
                  </motion.div>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleDetectLocation}
                    disabled={loadingGeo}
                    className="px-5 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-mono font-medium border border-neutral-700 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {loadingGeo ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#E8702A]" />
                        <span>Detecting GPS Location...</span>
                      </>
                    ) : (
                      <>
                        <Navigation className="w-4 h-4 text-[#E8702A]" />
                        <span>{userLoc ? 'Recalibrate Real-Time Distance' : 'Detect My Real-Time Distance'}</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-2">
                    <a
                      href={googleMapsDirectionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-initial px-4 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white text-xs font-mono border border-neutral-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Navigation className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Get Directions</span>
                    </a>

                    <a
                      href={googleMapsSearchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-[#E8702A] hover:bg-[#d65f1b] text-white text-xs font-mono font-semibold transition-colors flex items-center justify-center gap-2 shadow-md shadow-orange-950/30"
                    >
                      <span>Open Google Maps</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
