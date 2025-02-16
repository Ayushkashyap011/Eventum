import "./services.css";
import birthdayImg from "../assets/birthday.jpg";
import bandImg from "../assets/band-performance.jpg";
import weddingImg from "../assets/wedding.jpg";
import destinationWeddingImg from "../assets/destination-wedding.jpeg";
import corporateImg from "../assets/corporate-event.jpeg";
import poolPartyImg from "../assets/pool-party.jpg";

const Services = () => {
  const services = [
    { 
      title: "Birthday Party", 
      description: "“Birthdays are nature’s way of telling us to eat more cake!”", 
      image: birthdayImg 
    },
    { 
      title: "Band Performance", 
      description: "“Where words fail, music speaks. Experience the magic of live music.”", 
      image: bandImg 
    },
    { 
      title: "Wedding", 
      description: "“Two souls, one story. Let us craft your perfect wedding day.”", 
      image: weddingImg 
    },
    { 
      title: "Destination Wedding", 
      description: "“Say ‘I Do’ in paradise. Your dream wedding, our perfect execution.”", 
      image: destinationWeddingImg 
    },
    { 
      title: "Pool Party", 
      description: "“Dive into fun and let the good times float!”", 
      image: poolPartyImg 
    },
    { 
      title: "Corporate Events", 
      description: "“Turning professional gatherings into memorable experiences.”", 
      image: corporateImg 
    }
  ];
  
  return (
    <div className="services">
      <h2 className="services-title">Our Services</h2>
      <div className="service-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card" style={{ backgroundImage: `url(${service.image})` }}>
            <div className="service-overlay">
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
