"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageGalleryProps {
    images: string[];
    title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

    const openLightbox = (index: number) => {
        setPhotoIndex(index);
        setIsOpen(true);
    };

    const nextPhoto = () => {
        setPhotoIndex((prev) => (prev + 1) % images.length);
    };

    const prevPhoto = () => {
        setPhotoIndex((prev) => (prev + 1 + images.length - 2) % images.length + 1);
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:h-[400px] rounded-2xl overflow-hidden relative">
                {/* Main Image */}
                <div
                    className="md:col-span-2 h-[300px] md:h-full relative cursor-pointer group"
                    onClick={() => openLightbox(0)}
                >
                    <img
                        src={images[0]}
                        alt={title}
                        className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition" />
                </div>

                {/* Side Images */}
                <div className="hidden md:grid md:col-span-2 grid-cols-2 gap-2 h-full">
                    {images.slice(1, 5).map((img, idx) => (
                        <div
                            key={idx}
                            className="relative h-full cursor-pointer group overflow-hidden"
                            onClick={() => openLightbox(idx + 1)}
                        >
                            <img
                                src={img}
                                alt={`${title} - ${idx + 1}`}
                                className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition" />
                        </div>
                    ))}
                </div>

                {/* View All Button */}
                <button
                    onClick={() => openLightbox(0)}
                    className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-semibold shadow-lg hover:bg-white transition"
                >
                    View all photos
                </button>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 text-white hover:text-gray-300 p-2"
                        >
                            <X className="w-8 h-8" />
                        </button>

                        <button
                            onClick={prevPhoto}
                            className="absolute left-4 text-white hover:text-gray-300 p-2"
                        >
                            <ChevronLeft className="w-8 h-8" />
                        </button>

                        <img
                            src={images[photoIndex]}
                            alt={title}
                            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
                        />

                        <button
                            onClick={nextPhoto}
                            className="absolute right-4 text-white hover:text-gray-300 p-2"
                        >
                            <ChevronRight className="w-8 h-8" />
                        </button>

                        <div className="absolute bottom-4 text-white font-medium">
                            {photoIndex + 1} / {images.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
