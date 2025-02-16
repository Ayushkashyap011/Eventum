import "./feedback.css";

const feedbackData = [
  {
    name: "John Doe",
    feedback: "The event was truly magical! Everything was perfect and well-organized.",
  },
  {
    name: "Emily Smith",
    feedback: "Amazing experience! The decorations and planning were top-notch.",
  },
  {
    name: "Michael Brown",
    feedback: "Couldn't have asked for a better event. Thank you for making it memorable!",
  },
  {
    name: "Sophia Williams",
    feedback: "Absolutely wonderful! The attention to detail was outstanding.",
  },
  {
    name: "Daniel Johnson",
    feedback: "The best event I’ve ever attended! Everything was seamless and beautiful.",
  },
  {
    name: "Olivia Martinez",
    feedback: "Highly recommended! They made my dream event come true.",
  },
  {
    name: "James Anderson",
    feedback: "Professional team, smooth execution, and an unforgettable experience.",
  },
  {
    name: "Emma Wilson",
    feedback: "I loved every moment! The team was super friendly and helpful.",
  },
];

const Feedback = () => {
  return (
    <div className="feedback-container">
      <h2 className="feedback-title">What Our Clients Say</h2>
      <div className="feedback-cards">
        {feedbackData.map((item, index) => (
          <div className="feedback-card" key={index}>
            <p className="feedback-text">"{item.feedback}"</p>
            <h4 className="feedback-name">- {item.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feedback;
