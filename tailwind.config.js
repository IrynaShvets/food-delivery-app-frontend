module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        "fade-in": {
          "0%": {
            opacity: 0,
            transform: "rotateY(100%)",
          },
          "25%": {
            opacity: 0.25,
            transform: "rotateY(75%)",
          },
          "50%": {
            opacity: 0.5,
            transform: "rotateY(50%)",
          },
          "75%": {
            opacity: 0.75,
            transform: "rotateY(25%)",
          },
          "100%": {
            opacity: 1,
            transform: "rotateY(0)",
          },
        },
        "fade-out": {
          "100%": {
            opacity: 0,
            transform: "rotateY(100%)",
          },
          "75%": {
            opacity: 0.75,
            transform: "rotateY(75%)",
          },
          "50%": {
            opacity: 0.5,
            transform: "rotateY(50%)",
          },
          "25%": {
            opacity: 0.25,
            transform: "rotateY(25%)",
          },
          "0%": {
            opacity: 1,
            transform: "rotateY(0)",
          },
        },
      },
      animation: {
        "fade-in": "fade-in 1s ease-in",
        "fade-out": "fade-out 1s ease-out",
      },
    },
  },
  plugins: [],
};
