import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, X, Upload, Camera, Sparkles, Heart, ZoomIn, Trash2 } from 'lucide-react';
import { MemoryPhoto } from '../types';
import { playSoftBell } from '../utils/audio';

const defaultMemories: MemoryPhoto[] = [
  {
    id: '1',
    title: 'Ordinary College Days',
    caption: "One of those quiet campus days I'll remember forever.",
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Unexpected Smiles',
    caption: "Didn't know this simple moment would become a lifelong memory.",
    imageUrl: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'Unbreakable Support',
    caption: 'The moments of genuine care that mattered the most.',
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: '4',
    title: 'A Bond for Life',
    caption: 'Forever a sister in my heart and in my prayers.',
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1000&auto=format&fit=crop',
  },
];

export const MemoryGallery: React.FC = () => {
  const [memories, setMemories] = useState<MemoryPhoto[]>(defaultMemories);
  const [selectedPhoto, setSelectedPhoto] = useState<MemoryPhoto | null>(null);
  const [activeUploadId, setActiveUploadId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handlePhotoClick = (photo: MemoryPhoto) => {
    playSoftBell(783.99);
    setSelectedPhoto(photo);
  };

  const handleUploadTrigger = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveUploadId(id);
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && activeUploadId) {
      const url = URL.createObjectURL(file);
      setMemories(prev =>
        prev.map(m => (m.id === activeUploadId ? { ...m, imageUrl: url } : m))
      );
      if (selectedPhoto && selectedPhoto.id === activeUploadId) {
        setSelectedPhoto(prev => prev ? { ...prev, imageUrl: url } : null);
      }
      playSoftBell(880);
      setActiveUploadId(null);
    }
  };

  const handleAddNewFrame = () => {
    const newId = String(Date.now());
    const newMemory: MemoryPhoto = {
      id: newId,
      title: `Memory #${memories.length + 1}`,
      caption: 'A cherished moment we shared together.',
    };
    setMemories(prev => [...prev, newMemory]);
    playSoftBell(523);
  };

  const handleDeletePhoto = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMemories(prev => prev.filter(m => m.id !== id));
    if (selectedPhoto?.id === id) {
      setSelectedPhoto(null);
    }
    playSoftBell(440);
  };

  return (
    <section className="min-h-screen relative flex items-center justify-center px-4 py-20 z-10">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      <div className="max-w-6xl w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-[#ffb366] text-xs font-semibold uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(255,107,53,0.2)]">
            <Camera className="w-3.5 h-3.5 text-[#ffd700]" />
            <span>Nostalgia Gallery • स्मृति मञ्जूषा</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#ff6b35] via-[#ffb366] to-[#ffd700] bg-clip-text text-transparent font-display">
            Our Memories
          </h2>
          <p className="text-gray-300 text-sm sm:text-base mt-2 font-light">
            Full-frame memories of our cherished moments. Click to view or replace with your own photos.
          </p>
        </motion.div>

        {/* Full-Frame Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {memories.map((photo, idx) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => handlePhotoClick(photo)}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden glass-card-neon border border-orange-500/30 hover:border-[#ffd700] hover:shadow-[0_0_30px_rgba(255,107,53,0.4)] transition-all duration-300 cursor-pointer shadow-xl"
            >
              {/* Full-size Photo or Full-size Upload Frame */}
              {photo.imageUrl ? (
                <div className="relative w-full h-full">
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Subtle edge vignette and bottom gradient for elegance */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300" />

                  {/* Clean text overlay at bottom */}
                  <div className="absolute bottom-0 inset-x-0 p-4 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-sm font-semibold text-white font-display mb-1 drop-shadow-md">
                      {photo.title}
                    </h3>
                    <p className="text-xs text-[#ffd700] italic line-clamp-2 leading-relaxed drop-shadow">
                      "{photo.caption}"
                    </p>
                  </div>

                  {/* Top action buttons */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={(e) => handleUploadTrigger(photo.id, e)}
                      title="Replace with your photo"
                      className="w-8 h-8 rounded-full bg-black/75 hover:bg-orange-600 border border-white/20 text-white flex items-center justify-center backdrop-blur-md shadow-md transition hover:scale-105"
                    >
                      <Upload className="w-3.5 h-3.5 text-[#ffd700]" />
                    </button>
                    <button
                      onClick={() => handlePhotoClick(photo)}
                      title="Enlarge photo"
                      className="w-8 h-8 rounded-full bg-black/75 hover:bg-black border border-white/20 text-white flex items-center justify-center backdrop-blur-md shadow-md transition hover:scale-105"
                    >
                      <ZoomIn className="w-3.5 h-3.5 text-white" />
                    </button>
                  </div>
                </div>
              ) : (
                /* Full size placeholder upload area */
                <div
                  onClick={(e) => handleUploadTrigger(photo.id, e)}
                  className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#151424]/90 to-[#0c0a18]/95 hover:from-[#1e1c33] hover:to-[#121024] transition-all border-2 border-dashed border-orange-500/40 hover:border-[#ffd700]"
                >
                  <div className="w-14 h-14 rounded-2xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center mb-3 text-[#ffd700] group-hover:scale-110 group-hover:bg-orange-500/30 transition shadow-[0_0_20px_rgba(255,107,53,0.3)]">
                    <Camera className="w-7 h-7" />
                  </div>
                  <span className="text-sm font-semibold text-white mb-1">
                    Insert Full Photo
                  </span>
                  <p className="text-xs text-gray-400 font-light">
                    Click to upload a picture from your device
                  </p>
                  <div className="mt-4 px-3 py-1 rounded-full bg-white/10 text-[11px] text-[#ffb366] flex items-center gap-1">
                    <Upload className="w-3 h-3 text-[#ffd700]" />
                    <span>Upload Image</span>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Add Memory Button */}
        {memories.length < 12 && (
          <div className="text-center mt-10">
            <button
              onClick={handleAddNewFrame}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-orange-500/30 hover:border-orange-500/60 text-gray-200 text-xs font-semibold hover:text-white transition shadow-lg shadow-orange-500/10 hover:scale-105"
            >
              <Plus className="w-4 h-4 text-[#ffd700]" />
              <span>Add Another Memory Frame</span>
            </button>
          </div>
        )}
      </div>

      {/* Photo Lightbox Modal for Full-Resolution Viewing */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full glass-card-gold rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-[#ffd700]/50 text-center overflow-hidden"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-full bg-black/50 hover:bg-black/80 transition z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Full-size image in modal */}
              {selectedPhoto.imageUrl ? (
                <div className="w-full max-h-[65vh] rounded-2xl overflow-hidden mb-5 border border-white/20 shadow-2xl bg-black">
                  <img
                    src={selectedPhoto.imageUrl}
                    alt={selectedPhoto.title}
                    className="w-full h-full max-h-[65vh] object-contain mx-auto"
                  />
                </div>
              ) : (
                <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-tr from-[#ff6b35] to-[#ffd700] flex items-center justify-center shadow-xl shadow-orange-500/40 mb-6">
                  <Heart className="w-12 h-12 fill-white text-white" />
                </div>
              )}

              <h3 className="text-2xl font-bold text-white mb-2 font-display">
                {selectedPhoto.title}
              </h3>
              <p className="text-base sm:text-lg text-[#ffd700] italic mb-6 leading-relaxed">
                "{selectedPhoto.caption}"
              </p>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={(e) => handleUploadTrigger(selectedPhoto.id, e)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500/30 hover:bg-orange-500/45 border border-orange-500/60 text-[#ffd700] text-xs font-semibold transition hover:scale-105 shadow-md shadow-orange-500/20"
                >
                  <Upload className="w-4 h-4 text-[#ffd700]" />
                  <span>{selectedPhoto.imageUrl ? 'Replace Photo' : 'Upload Photo for This Memory'}</span>
                </button>

                {memories.length > 1 && (
                  <button
                    onClick={(e) => handleDeletePhoto(selectedPhoto.id, e)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-300 text-xs font-semibold transition hover:scale-105"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                    <span>Delete Frame</span>
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
