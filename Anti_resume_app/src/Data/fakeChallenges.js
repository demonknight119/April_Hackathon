const fakeChallenges = [
  {
    id: "react_basics",
    title: "React Basics",
    skill: "React",
    questions: [
      {
        id: 1,
        question: "What is the purpose of useState in React?",
        options: [
          "To manage styles",
          "To manage side effects",
          "To manage state",
          "To manage routes",
        ],
        correctAnswer: "To manage state",
      },
      {
        id: 2,
        question: "Which hook is used to perform side effects in React?",
        options: ["useEffect", "useState", "useCallback", "useMemo"],
        correctAnswer: "useEffect",
      },
      {
        id: 3,
        question: "What does JSX stand for?",
        options: [
          "JavaScript XML",
          "Java Standard XML",
          "Java Syntax Extension",
          "None of the above",
        ],
        correctAnswer: "JavaScript XML",
      },
      {
        id: 4,
        question: "How do you pass data from parent to child component?",
        options: ["Props", "State", "Context", "Emit"],
        correctAnswer: "Props",
      },
      {
        id: 5,
        question: "What is the default port for a React app?",
        options: ["3000", "8080", "5000", "8000"],
        correctAnswer: "3000",
      },
      {
        id: 6,
        question: "Which method is used to render a React component?",
        options: [
          "ReactDOM.render()",
          "React.mount()",
          "renderComponent()",
          "displayComponent()",
        ],
        correctAnswer: "ReactDOM.render()",
      },
      {
        id: 7,
        question: "What is the key prop used for in React lists?",
        options: [
          "Identify unique elements",
          "Style list items",
          "Handle events",
          "Track state",
        ],
        correctAnswer: "Identify unique elements",
      },
      {
        id: 8,
        question: "Which React hook helps in memoizing functions?",
        options: ["useMemo", "useRef", "useCallback", "useEffect"],
        correctAnswer: "useCallback",
      },
      {
        id: 9,
        question: "What is a pure component?",
        options: [
          "A stateless component",
          "A component that doesn't update",
          "A component that only re-renders if props/state change",
          "A component without JSX",
        ],
        correctAnswer: "A component that only re-renders if props/state change",
      },
      {
        id: 10,
        question: "How do you handle forms in React?",
        options: [
          "Using state and onChange",
          "With HTML only",
          "With Redux",
          "Using useEffect",
        ],
        correctAnswer: "Using state and onChange",
      },
    ],
  },
  {
    id: "firebase_auth",
    title: "Firebase Auth",
    skill: "Firebase",
    questions: [
      {
        id: 1,
        question: "Which Firebase product is used for authentication?",
        options: ["Firestore", "Auth", "Functions", "Hosting"],
        correctAnswer: "Auth",
      },
      {
        id: 2,
        question:
          "Which method is used to sign in users with email and password?",
        options: [
          "signInWithEmailAndPassword",
          "signUser",
          "loginUser",
          "authEmailLogin",
        ],
        correctAnswer: "signInWithEmailAndPassword",
      },
      {
        id: 3,
        question: "What does onAuthStateChanged do?",
        options: [
          "Logs out the user",
          "Redirects to login",
          "Listens for auth changes",
          "Creates a user",
        ],
        correctAnswer: "Listens for auth changes",
      },
      {
        id: 4,
        question: "Where is user role typically stored?",
        options: ["Auth metadata", "Firestore", "Realtime DB", "Storage"],
        correctAnswer: "Firestore",
      },
      {
        id: 5,
        question: "What is required to initialize Firebase in your app?",
        options: ["firebaseConfig object", "App.jsx", "Router", "Redux"],
        correctAnswer: "firebaseConfig object",
      },
      {
        id: 6,
        question: "Which method is used to create a user?",
        options: [
          "createUserWithEmailAndPassword",
          "registerUser",
          "signupFirebase",
          "newUser",
        ],
        correctAnswer: "createUserWithEmailAndPassword",
      },
      {
        id: 7,
        question: "Which Firebase tool lets you read/write structured data?",
        options: ["Firestore", "Functions", "Auth", "Analytics"],
        correctAnswer: "Firestore",
      },
      {
        id: 8,
        question: "How do you protect a route in React using Firebase?",
        options: [
          "AuthContext + ProtectedRoute",
          "PrivateRoute only",
          "Redux",
          "Router hooks",
        ],
        correctAnswer: "AuthContext + ProtectedRoute",
      },
      {
        id: 9,
        question: "How can you observe Firebase auth state globally?",
        options: ["AuthContext", "Redux", "setInterval", "useRef"],
        correctAnswer: "AuthContext",
      },
      {
        id: 10,
        question: "What is returned by getAuth()?",
        options: ["auth instance", "user object", "session", "config"],
        correctAnswer: "auth instance",
      },
    ],
  },
  {
    id: "javascript_fundamentals",
    title: "JavaScript Fundamentals",
    skill: "JavaScript",
    questions: [
      {
        id: 1,
        question: "Which type is not a primitive in JavaScript?",
        options: ["string", "boolean", "object", "null"],
        correctAnswer: "object",
      },
      {
        id: 2,
        question: "What is the result of typeof null?",
        options: ["object", "null", "undefined", "boolean"],
        correctAnswer: "object",
      },
      {
        id: 3,
        question: "Which array method modifies the original array?",
        options: ["map", "filter", "slice", "splice"],
        correctAnswer: "splice",
      },
      {
        id: 4,
        question: "What is hoisting in JavaScript?",
        options: [
          "Moving functions and variables to the top",
          "Declaring variables only",
          "Arrow functions only",
          "Looping arrays",
        ],
        correctAnswer: "Moving functions and variables to the top",
      },
      {
        id: 5,
        question: "What is the output of '2' + 2 in JavaScript?",
        options: ["22", "4", "NaN", "undefined"],
        correctAnswer: "22",
      },
      {
        id: 6,
        question: "What does === check for?",
        options: ["Value only", "Reference only", "Value and type", "None"],
        correctAnswer: "Value and type",
      },
      {
        id: 7,
        question: "What is a closure?",
        options: [
          "A function inside another function",
          "A loop",
          "A variable",
          "An object",
        ],
        correctAnswer: "A function inside another function",
      },
      {
        id: 8,
        question: "Which keyword declares a constant variable?",
        options: ["const", "var", "let", "constant"],
        correctAnswer: "const",
      },
      {
        id: 9,
        question: "What does isNaN() check?",
        options: [
          "If a value is NaN",
          "If it's a string",
          "If it's null",
          "If it's undefined",
        ],
        correctAnswer: "If a value is NaN",
      },
      {
        id: 10,
        question: "Which method converts JSON to a JavaScript object?",
        options: [
          "JSON.parse()",
          "JSON.stringify()",
          "JSON.convert()",
          "parse.JSON()",
        ],
        correctAnswer: "JSON.parse()",
      },
    ],
  },
];

export default fakeChallenges;
