import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import "./about.css"
import { useNavigate } from "react-router-dom";

function AboutGeminiAI() {
  const [selectedVideo, setSelectedVideo] = useState(null);



  useEffect(() => {
    setSelectedVideo(videos[0]);
  }, []);
const navigate = useNavigate("/auth")
  const videos = [
    {
      title: "The Evolution of Artificial Intelligence",
      description:
        "Explore the journey of AI from its inception to modern advancements in machine learning, neural networks, and generative AI models.",
      src: ` ${assets.videos1}`,
      image: "https://miro.medium.com/v2/resize:fit:800/1*i5lWPdCc-p58TcgQjmCeTw.jpeg",
    },
    {
      title: "How AI is Transforming the World",
      description:
        "Understand how AI is impacting industries such as healthcare, finance, education, and entertainment with real-world examples.",
      src  : ` ${assets.videos2}` ,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT2GAn0g9pvwC_7e0DPBj7VY5pkMuxQO6JzQ&s", 
    },
    {
      title: "AI and the Future of Work",
      description:  
        "Learn about the role of AI in reshaping jobs, creating new opportunities, and automating repetitive tasks in workplaces." ,
      src: ` ${assets.videos3}`  ,
      image: "https://systango-website.s3.ap-south-1.amazonaws.com/blog/wp-content/uploads/2023/12/12115325/12th-Dec-2023_1-1.jpg",
    },
  ];

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  return (
    <div style={styles.container}>
      <button
        className="back-arrow"
        onClick={() => navigate('/auth')}
        style={{
          cursor: 'pointer',
          fontSize: '18px',
          display: 'flex',
          alignItems: 'center',
          background: 'none',
          border: 'none',
          color:"white",
          padding: '10px',
          position:"relative",
          left:"-45%",
          marginBottom: '10px',
        }}
      >
        ← Back 
      </button>

      <div style={styles.videoSection}>
        <div  className="videoList" style={styles.videoList}>
          {videos.map((video, index) => (
            <div
              key={index}
              style={styles.videoCard}
              onClick={() => handleVideoSelect(video)}
            >
              <img
                src={video.image}
                alt={video.title}
                style={styles.videoCardImage}
              />
              <h4 style={styles.videoCardTitle}>{video.title}</h4>
            </div>
          ))}
        </div>

        <div className="selectedVideoSection" style={styles.selectedVideoSection}>
          {selectedVideo ? (
            <div style={styles.selectedVideoContainer}>
              <video
                src={selectedVideo.src}
                controls
                autoPlay
                style={styles.selectedVideo}
              />
              <h4 style={styles.selectedVideoTitle}>{selectedVideo.title}</h4>
              <p style={styles.selectedVideoDescription}>
                {selectedVideo.description}
              </p>
            </div>
          ) : (
            <div style={styles.placeholderContent}>
              <p style={styles.placeholderText}>Select a video to watch</p>
            </div>
          )}
        </div>
      </div>


      <div style={styles.textContainer}>
        <h2 style={styles.heading}>VedaMind AI Project</h2>
        <p style={styles.description}>
          <strong>VedaMind AI</strong> is a state-of-the-art platform designed to
          harness the power of artificial intelligence to revolutionize
          communication and automation. It combines the capabilities of
          conversational AI, predictive analytics, and content generation to
          empower users across various industries.
        </p>

        <h3 style={styles.subHeading}>What is VedaMind AI ?</h3>
        <p style={styles.description}>
        VedaMind AI is inspired by the human ability to think, learn, and adapt.
          It uses advanced AI technologies such as machine learning and
          natural language processing (NLP) to deliver seamless interactions.
          Whether it's creating content, answering questions, or making
          decisions, Gemini AI simplifies complex tasks with precision.
        </p>

        <h3 style={styles.subHeading}>Applications of VedaMind AI</h3>
        <ul style={styles.featuresList}>
          <li style={styles.li}>
            <strong>Healthcare:</strong> Automating patient interactions,
            providing medical advice, and analyzing patient data.
          </li>
          <li style={styles.li}>
            <strong>Education:</strong> Delivering personalized learning
            experiences, virtual tutors, and generating lesson plans.
          </li>
          <li style={styles.li}>
            <strong>Marketing:</strong> Crafting compelling content, analyzing
            trends, and automating campaigns.
          </li>
          <li style={styles.li}>
            <strong>Customer Support:</strong> Providing instant responses,
            resolving issues, and streamlining workflows.
          </li>
        </ul>

    
        <h3 style={styles.subHeading}>VedaMind AI Features</h3>
        <div style={styles.featureCardsContainer}>
          <div style={styles.featureCard}>
            <h4 style={styles.featureCardTitle}>AI-Powered Assistance</h4>
            <p style={styles.featureCardDescription}>
              AI-driven support for efficient decision-making and problem-solving.
            </p>
          </div>
          <div style={styles.featureCard}>
            <h4 style={styles.featureCardTitle}>Predictive Analytics</h4>
            <p style={styles.featureCardDescription}>
              Leveraging data insights to forecast trends and behaviors.
            </p>
          </div>
          <div style={styles.featureCard}>
            <h4 style={styles.featureCardTitle}>Natural Language Processing</h4>
            <p style={styles.featureCardDescription}>
              Enabling machines to understand and interact with human language.
            </p>
          </div>
          <div style={styles.featureCard}>
            <h4 style={styles.featureCardTitle}>Automation</h4>
            <p style={styles.featureCardDescription}>
              Automating repetitive tasks to improve productivity.
            </p>
          </div>
        </div>


        <h3 style={styles.subHeading}>Benefits of VedaMind AI I</h3>
        <ul style={styles.featuresList}>
          <li style={styles.li}>Improved decision-making through data-driven insights.</li>
          <li style={styles.li}>Enhanced user engagement through personalized interactions.</li>
          <li style={styles.li}>Increased efficiency by automating repetitive tasks.</li>
          <li style={styles.li}>Scalability to meet growing demands in real-time.</li>
        </ul>

        <h3 style={styles.subHeading}>Technologies Used in VedaMind AI </h3>
        <ul style={styles.featuresList}>
          <li style={styles.li}><strong>Backend:</strong> Node.js, Express.js, and MongoDB.</li>
          <li style={styles.li}><strong>Frontend:</strong> React.js, Redux, and Bootstrap.</li>
          <li style={styles.li}><strong>AI Technologies:</strong> Natural Language Processing, Machine Learning, and Deep Learning.</li>
          <li style={styles.li}><strong>Cloud:</strong> AWS for hosting and scalability.</li>
        </ul>

        <h3 style={styles.subHeading}>Future of VedaMind AI I</h3>
        <p style={styles.description}>
          Gemini AI continues to evolve, incorporating the latest advancements in
          AI research. The future of Gemini AI lies in enhancing the accuracy of
          its predictions, improving the natural flow of conversations, and
          creating a more intuitive user experience across various devices.
        </p>
      </div>
    </div>
  );
}

const styles = {
  li : {
   color: "white",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    padding: "30px",
    alignItems: "center",
    background: "linear-gradient(135deg, #1e1e1e, #2a2a2a)",
    borderRadius: "15px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
    flexWrap: "wrap",
    animation: "fadeIn 1s ease-in-out",
    width: "100%",
  },
  videoSection: {
    display: "flex",
    flexDirection: "row",
    gap: "30px",
    marginBottom: "30px",
    width: "100%",
    flexWrap: "wrap", 
  },
  videoList: {
    display: "flex",
    flexDirection: "column", 
    width: "25%",
    gap: "15px",
  },
  videoCard: {
    backgroundColor: "#333",
    padding: "10px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
    cursor: "pointer",
    transition: "transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0px 6px 15px rgba(255, 165, 0, 0.6)",
      backgroundColor: "#444",
    },
  },
  videoCardImage: {
    width: "100%",
    height: "auto",
    borderRadius: "8px",
    marginBottom: "10px",
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  videoCardTitle: {
    fontSize: "1rem",
    color: "#ffa726",
    textAlign: "center",
    transition: "color 0.3s ease",
    "&:hover": {
      color: "#ffcc80",
    },
  },
  selectedVideoSection: {
    width: "70%",
  },
  selectedVideoContainer: {
    backgroundColor: "#333",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.5)",
  },
  selectedVideo: {
    width: "100%",
    borderRadius: "8px",
    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.4)",
  },
  placeholderContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "200px",
    backgroundColor: "#444",
    borderRadius: "8px",
    color: "#fff",
    fontSize: "18px",
    textAlign: "center",
  },
  placeholderText: {
    color: "#fff",
    fontSize: "18px",
  },
  textContainer: {
    width: "100%",
    maxWidth: "1200px",
    padding: "20px",
    backgroundColor: "#1e1e1e",
    borderRadius: "15px",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.4)",
    animation: "slideInRight 1s ease-in-out",
  },
  heading: {
    fontSize: "32px",
    color: "#ffffff",
    fontWeight: "bold",
    marginBottom: "15px",
    background: "linear-gradient(90deg, #ff7eb3, #ff758c)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  subHeading: {
    fontSize: "24px",
    color: "#ffa726",
    fontWeight: "bold",
    marginTop: "20px",
  },
  description: {
    fontSize: "18px",
    color: "#ffffff",
    lineHeight: "1.8",
    marginBottom: "15px",
  },
  featuresList: {
    listStyleType: "none",
    paddingLeft: "0",
  },
  featureCardsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    marginTop: "20px",
  },
  featureCard: {
    backgroundColor: "#333",
    padding: "15px",
    borderRadius: "10px",
    width: "150px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
    textAlign: "center",
    transition: "transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
      transform: "scale(1.1)",
      backgroundColor: "#444",
      boxShadow: "0px 6px 15px rgba(255, 165, 0, 0.6)",
    },
  },
  featureCardTitle: {
    fontSize: "16px",
    color: "#ffa726",
    fontWeight: "bold",
    transition: "color 0.3s ease",
    "&:hover": {
      color: "#ffcc80",
      transform: "scale(1.5)",
    },
  },
  featureCardDescription: {
    fontSize: "14px",
    color: "#e0e0e0",
    marginTop: "10px",
  },

  "@media (max-width: 1024px)": {
    videoSection: {
      flexDirection: "column", 
      gap: "20px",
    },
  
    selectedVideoSection: {
      width: "100%",
    },
    textContainer: {
      padding: "15px",
    },
  },

  "@media (max-width: 768px)": {
    videoSection: {
      flexDirection: "column",
      gap: "20px",
    },
  
    featureCardsContainer: {
      justifyContent: "center",
    },
  },

  // "@media (max-width: 425px)": {
  //   container: {
  //     padding: "5px",
  //     flexDirection: "column",
  //     width : "100%",
  //   },

  //   videoSection: {
  //     flexDirection: "column",
  //     width: "100%",
  //     gap: "15px",
  //   },
  //   videoList: {
  //     width: "1000px",
  //     gap: "10px", 
  //     fontSize :"5rem",
  //   },
  //   videoCardTitle: {
  //     fontSize: "8.8rem", 
  //   },
  //   featureCardsContainer: {
  //     flexDirection: "column",
  //     gap: "10px",
  //   },
  //   heading: {
  //     fontSize: "1rem",
  //   },
  //   subHeading: {
  //     fontSize: "1rem",
  //   },
  //   description: {
  //     fontSize: "0.8rem",
  //   },
  //   li : {
  //     backgroundColor : "white",
  //   }
  // },
};

export default AboutGeminiAI;