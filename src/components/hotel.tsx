import "../styling/hotelComponent.css"

export const HotelComponent = (hotel: Hotel) => {
    return (
        <div>
            <h2>
                Post {hotel.name}: 
                <img src={hotel.image}/>
            </h2>
        </div>
    );
};

export class Hotel {
    name: string
    image: string

    constructor(name: string, image: string) {
        this.name = name;
        this.image = image;
    }
}