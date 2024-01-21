import {useState} from "react";

import "../styling/hotelComponent.css"

export const HotelComponent = (hotel: Hotel) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % hotel.images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + hotel.images.length) % hotel.images.length);
    };

    return (
        <div>
            <h2>
                {hotel.name}:
            </h2>
            <div className="image-overlay" onClick={nextImage}>
                <img src={hotel.images[currentImageIndex]} />
                <div className="prev-arrow" onClick={(e) => { e.stopPropagation(); prevImage(); }}>&#8249;</div>
                <div className="next-arrow" onClick={(e) => { e.stopPropagation(); nextImage(); }}>&#8250;</div>
            </div>
        </div>
    );
};

export class Hotel {
    name: string
    images: string[]

    constructor(name: string, images: string[]) {
        this.name = name;
        this.images = images;
    }
}