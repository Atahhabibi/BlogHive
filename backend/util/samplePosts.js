// Sample data for the Post schema
const samplePosts = [
  // Technology Posts
  {
    title: "The Future of AI",
    description:
      "Exploring the advancements and challenges in artificial intelligence.",
    image:
      "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Technology",
    UserPost: "638df5b2f9a8ab0016c21d8b",
    comments: [
      {
        user: "638df5b2f9a8ab0016c21d8b",
        text: "This is a fascinating topic!",
        createdAt: new Date()
      }
    ]
  },
  {
    title: "The Rise of Quantum Computing",
    description: "An introduction to the emerging field of quantum computing.",
    image:
      "https://images.pexels.com/photos/7567535/pexels-photo-7567535.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Technology",
    UserPost: "638df5b2f9a8ab0016c21d8b",
    comments: []
  },
  {
    title: "Blockchain Beyond Cryptocurrency",
    description: "Exploring the applications of blockchain technology.",
    image:
      "https://images.pexels.com/photos/29822187/pexels-photo-29822187/free-photo-of-bitcoin-on-digital-market-chart-background.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Technology",
    UserPost: "638df5b2f9a8ab0016c21d8b",
    comments: []
  },
  {
    title: "The Evolution of Smartphones",
    description: "How smartphones have changed the way we live.",
    image:
      "https://images.pexels.com/photos/29831434/pexels-photo-29831434/free-photo-of-bitcoin-coins-on-led-lit-keyboard.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Technology",
    UserPost: "638df5b2f9a8ab0016c21d8b",
    comments: []
  },

  // Health Posts
  {
    title: "10 Tips for Healthy Living",
    description: "Practical advice for maintaining a healthy lifestyle.",
    image:
      "https://images.pexels.com/photos/7456521/pexels-photo-7456521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Health",
    UserPost: "638df5b2f9a8ab0016c21d8c",
    comments: []
  },
  {
    title: "Mental Health Awareness",
    description: "Breaking the stigma around mental health issues.",
    image:
      "https://images.pexels.com/photos/5425828/pexels-photo-5425828.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Health",
    UserPost: "638df5b2f9a8ab0016c21d8c",
    comments: []
  },
  {
    title: "The Benefits of Regular Exercise",
    description: "Why staying active is crucial for overall health.",
    image:
      "https://images.pexels.com/photos/5593308/pexels-photo-5593308.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Health",
    UserPost: "638df5b2f9a8ab0016c21d8c",
    comments: []
  },
  {
    title: "Eating for Longevity",
    description: "Foods that help promote a long and healthy life.",
    image:
      "https://images.pexels.com/photos/3768913/pexels-photo-3768913.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Health",
    UserPost: "638df5b2f9a8ab0016c21d8c",
    comments: []
  },

  // Travel Posts
  {
    title: "Top Travel Destinations in 2024",
    description:
      "Discover the most popular travel destinations for the upcoming year.",
    image:
      "https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Travel",
    UserPost: "638df5b2f9a8ab0016c21d8d",
    comments: []
  },
  {
    title: "Tips for Solo Travelers",
    description: "How to stay safe and enjoy traveling alone.",
    image:
      "https://images.pexels.com/photos/29813714/pexels-photo-29813714/free-photo-of-young-woman-sitting-on-railroad-tracks-outdoors.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Travel",
    UserPost: "638df5b2f9a8ab0016c21d8d",
    comments: []
  },
  {
    title: "Exploring Hidden Gems",
    description: "Unveiling lesser-known travel destinations.",
    image:
      "https://images.pexels.com/photos/6544060/pexels-photo-6544060.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Travel",
    UserPost: "638df5b2f9a8ab0016c21d8d",
    comments: []
  },
  {
    title: "Travel on a Budget",
    description: "How to explore the world without breaking the bank.",
    image:
      "https://images.pexels.com/photos/5223544/pexels-photo-5223544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Travel",
    UserPost: "638df5b2f9a8ab0016c21d8d",
    comments: []
  },

  // Business Posts
  {
    title: "Mastering Remote Work",
    description: "Strategies and tools for effective remote work.",
    image:
      "https://images.pexels.com/photos/3184416/pexels-photo-3184416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Business",
    UserPost: "638df5b2f9a8ab0016c21d8e",
    comments: []
  },
  {
    title: "How to Start a Business",
    description: "Steps to successfully launch your own business.",
    image:
      "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Business",
    UserPost: "638df5b2f9a8ab0016c21d8e",
    comments: []
  },
  {
    title: "The Importance of Networking",
    description: "Building valuable connections in the business world.",
    image:
      "https://images.pexels.com/photos/5831260/pexels-photo-5831260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Business",
    UserPost: "638df5b2f9a8ab0016c21d8e",
    comments: []
  },
  {
    title: "Understanding Financial Literacy",
    description: "Key concepts for managing your finances.",
    image:
      "https://images.pexels.com/photos/109919/pexels-photo-109919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Business",
    UserPost: "638df5b2f9a8ab0016c21d8e",
    comments: []
  },

  // Education Posts
  {
    title: "The Power of Continuous Learning",
    description: "How to stay ahead with lifelong learning.",
    image:
      "https://images.pexels.com/photos/5206086/pexels-photo-5206086.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Education",
    UserPost: "638df5b2f9a8ab0016c21d8f",
    comments: []
  },
  {
    title: "Top Online Learning Platforms",
    description: "Explore the best platforms for online education.",
    image:
      "https://images.pexels.com/photos/7972538/pexels-photo-7972538.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Education",
    UserPost: "638df5b2f9a8ab0016c21d8f",
    comments: []
  },
  {
    title: "Building Study Habits",
    description: "Tips for effective studying and retention.",
    image:
      "https://images.pexels.com/photos/9829493/pexels-photo-9829493.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Education",
    UserPost: "638df5b2f9a8ab0016c21d8f",
    comments: []
  },
  {
    title: "The Future of Education",
    description: "How technology is transforming learning.",
    image:
      "https://images.pexels.com/photos/3769017/pexels-photo-3769017.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Education",
    UserPost: "638df5b2f9a8ab0016c21d8f",
    comments: []
  },

  // Lifestyle Posts
  {
    title: "Sustainable Lifestyle Choices",
    description:
      "Simple ways to live a more sustainable and eco-friendly life.",
    image:
      "https://images.pexels.com/photos/29818217/pexels-photo-29818217/free-photo-of-rustic-beach-scene-with-boat-and-anchor.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Lifestyle",
    UserPost: "638df5b2f9a8ab0016c21d90",
    comments: []
  },
  {
    title: "Minimalist Living",
    description: "The benefits of decluttering your life.",
    image:
      "https://images.pexels.com/photos/29574758/pexels-photo-29574758/free-photo-of-boats-docked-in-canakkale-turkey-harbor.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Lifestyle",
    UserPost: "638df5b2f9a8ab0016c21d90",
    comments: []
  },
  {
    title: "Creating a Morning Routine",
    description: "Start your day on the right foot.",
    image:
      "https://images.pexels.com/photos/4164764/pexels-photo-4164764.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Lifestyle",
    UserPost: "638df5b2f9a8ab0016c21d90",
    comments: []
  },
  {
    title: "Balancing Work and Life",
    description: "How to achieve a healthy work-life balance.",
    image:
      "https://images.pexels.com/photos/3838409/pexels-photo-3838409.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Lifestyle",
    UserPost: "638df5b2f9a8ab0016c21d90",
    comments: []
  }
];

// Export the sample data
module.exports = samplePosts;
