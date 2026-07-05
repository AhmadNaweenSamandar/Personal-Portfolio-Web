const surveyQuestions = [
  {
    id: 1,
    type: "rating",
    question: "How would you rate your overall shopping experience with MeshMesh?",
    required: true
  },
  {
    id: 2,
    type: "multiple",
    question: "What brought you to MeshMesh today?",
    options: [
      "Looking for a specific product",
      "Browsing for inspiration",
      "A friend recommended MeshMesh",
      "Saw an advertisement",
      "Returning customer"
    ],
    required: true
  },
  {
    id: 3,
    type: "rating",
    question: "How easy was it to find what you were looking for?",
    required: true
  },
  {
    id: 4,
    type: "multiple",
    question: "Which features matter most to you when choosing footwear?",
    options: [
      "Comfort",
      "Style / Design",
      "Price",
      "Durability",
      "Brand reputation",
      "Sustainability"
    ],
    allowMultiple: true,
    required: true
  },
  {
    id: 5,
    type: "rating",
    question: "How likely are you to recommend MeshMesh to a friend?",
    required: true
  },
  {
    id: 6,
    type: "text",
    question: "Is there anything we could do to make your experience even better? We genuinely love hearing from you!",
    placeholder: "Share your thoughts — every word helps us improve...",
    required: false
  }
];

export default surveyQuestions;
