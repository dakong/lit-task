# lit-task

Simple todo application built using lit-element. This will be a clone of Google's task application. Instead of it being integrated into gmail it will be a standalone application or extension.

The idea is to be lightweight and fast as possible. I will be leveraging indexedDB to store data on the client side, and web workers to sync data to the server. 

Below are the goals for this application:
- Make this into a PWA, and have it feel like a native mobile app
- Offer the same experience as Google's task application. Essentially make it a clone
- Use as little frameworks as possible. *This could be done using only the WebComponent standard, but learning lit-html seemed fun* :)
- Utilize indexedDB for client side storage.

## Technologies / standards used
- Redux
- lit-html
- indexedDB