#! /bin/bash

# This command will open new terminal tab and will run different commands on each one
osascript -e 'tell app "Terminal" to do script "cd $(pwd)/Desktop/Nosql-react/client &&
ls -al && 
npm start"'

osascript -e 'tell app "Terminal" to do script "cd $(pwd)/Desktop/Nosql-react/server &&
npm run server"'