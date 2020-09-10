
## Modern React with Redux (2020 Update) - Streams Project
This project was built as part of the above Udemy course taught by Stephen Grider. I left in some commented out code representing different stages of refactoring throughout the project, as well as some notes

## Concepts used:

- Redux
- Redux Thunk
- Redux Form
- Google OAuth
- [JSON Server](https://www.npmjs.com/package/json-server) for API (/api directory)
    - manually initialized npm package.json:
        - npm init
    - added db.json and start command under scripts: 
        - "start": "json-server -p 3001 -w db.json"
- Lodash 
- Portals
- [Node Media Server](https://github.com/illuspas/Node-Media-Server) for RTMP (/rtmpserver directory)
    - manually initialized npm package.json:
        - npm init
        - added app.js with Singlecore mode configuration from docs
        - added start command under scripts:
            - "start": "node app.js"
            - note: strayed slightly from the course here to follow the more recent project docs