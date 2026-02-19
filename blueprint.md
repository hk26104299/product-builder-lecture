# Lotto Number Generator

## Overview

This project is a simple web application that generates random lottery numbers. It is built using modern web technologies, including HTML, CSS, and JavaScript, with a focus on creating a clean, responsive, and user-friendly experience.

## Design and Features

### Visual Design

*   **Layout:** A centered, card-like interface that is responsive and works well on both desktop and mobile devices.
*   **Color Palette:** A modern and vibrant color scheme with a gradient background and subtle shadows to create depth. Supports both light and dark modes.
*   **Typography:** Clear and readable fonts with a hierarchy for headings and numbers.
*   **Interactivity:** A "Generate" button with a glowing effect and a smooth transition when hovered over.
*   **Theme Toggle:** A toggle switch to allow users to switch between light and dark themes.

### Features

*   **Number Generation:** Generates 3 sets of 6 unique random numbers between 1 and 45.
*   **Display:** The generated numbers are displayed in 3 distinct sets, each with a label.
*   **Theme Persistence:** The selected theme (light/dark) is saved in the user's browser.
*   **Affiliation Inquiry Form:** A simple contact form integrated with Formspree for partnership requests.
*   **Web Component:** The entire lottery number generator is encapsulated in a custom HTML element (`<lotto-generator>`) for reusability and maintainability.

## Current Plan

*   Implement a dark mode/light mode theme toggle.
*   Modify the generator to create and display 3 sets of numbers simultaneously.
*   Add a partnership inquiry form using Formspree.
*   Update the UI/UX to handle multiple components elegantly.
*   Update the CSS to use variables for theming.
*   Use JavaScript to handle theme switching and persistence in localStorage.
