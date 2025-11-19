# Reflection – Assignment 3.8

This assignment was definitely the most challenging one so far, mainly because it brought together so many features at the same time. Working with third-party APIs, hardware features, Firebase Functions, and cross-platform compatibility forced me to think more like an actual mobile developer instead of just following tutorials. I felt overwhelmed at first, but little by little things started coming together.

The hardest part for me was the third-party API integration, especially with the weather API. Normally I would just put the API key inside the app and call the endpoint directly, but the assignment required using Firebase Functions for security. I had never used Functions this way before, so figuring out how to proxy the request, deploy it, and then call it from my Expo app took a little time. Once I saw it working, it made a lot more sense, and now I understand how important it is not to expose keys in the client.

Firebase in general was a learning experience. I had to set up Auth, Firestore, and Functions, and then make everything connect together. It actually made me feel like I was working on a real production app. If I had more time, I would improve the structure of the backend and add more validation to the data I store in Firestore.

The device hardware features were surprising in a good way. The camera on mobile worked immediately, but the web camera was more sensitive. I learned that the browser has different permission rules, and sometimes the preview behaves differently. The QR scanner was also fun, and it was interesting to see how cross-platform differences affect camera performance. Maps were also easier than I expected once I had location permissions working.

If I had extra time, I would smooth out the UI and possibly add more detailed screens or animations. I would also improve error handling so the user sees more friendly messages when something fails.

Overall, this project pushed me a lot, but it also made me feel more confident. I now understand how all these separate pieces—APIs, location, camera, Firebase, and Expo Router—fit together in one app. Even though it was stressful at times, this assignment made me realize I can actually build a real connected mobile application from start to finish.
