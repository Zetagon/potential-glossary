/*jslint node: true*/
/*jslint esversion: 6*/
'use strict';
let checkMatchBoolean = require('../util/checkAnswer').checkMatchBoolean;

let io,
    getUser,
    db,
    answer,
    nextDescription,
    allClients = [];
module.exports = function init(pIo, pDb, sessionMiddleware) {
    db = pDb;
    io = pIo;
    let description;

    io.use(function(socket, next) {
        sessionMiddleware(socket.request, {}, next);
    });

    if (process.env.DEPLOY == 'dev') {
      console.log('In development mode')
        description = [ // Example of valid description array
            {
              text: "",
              url: "https://o.quizlet.com/p-ihaSIZTtWTzdqfkrF6UA_m.png"
            },
            {
              text: "",
              url: "https://upload.wikimedia.org/wikipedia/commons/6/68/Triethanolamine.png"
            },
            {
                text: "Tvådimensionell ritning av en molekyl",
                url: ""
            }
        ];
        nextDescription = function() {
          return  [ // Example of valid description array
            {
              text: "hej hej",
              url: "https://www.smashingmagazine.com/wp-content/uploads/2015/06/10-dithering-opt.jpg"
            },
            {
              text: "andra grejen",
              url: "http://www.roadtovr.com/wp-content/uploads/2016/02/htc-vive-large-1.png"
            },
            {
              text: "Här är det ingen bild\nMen det är desto mer text\n\n blablablaha\n\n\n\n\n\ndfhsdfhsdfh",
              url: ""
            },
            {
              text: "",
              url: "https://s3-us-west-1.amazonaws.com/powr/defaults/image-slider2.jpg"
            }
          ];
        };
        getUser = function(){ return 'Testuser'; };

        answer = {
            synonyms: [
                {
                    alternatives: [
                        {text: "hej"},
                        {text: "hejsan"}
                    ]
                },
                {
                    alternatives: [
                        {text: "god kväll"},
                        {text: "god afton"}
                    ]
                }
            ]
        } 
    }

    io.on('connection', function(socket) {
        // if ( socket.request.session.passport && socket.request.session.passport.user){ TODO: Do proper error handling of undefined user/passport
            // let user = socket.request.session.passport.user; 
      let user;

            if(process.env.MOCK_USER ){
              user = process.env.MOCK_USER;
            }
            console.log('New connection with id: ' + socket.id + 'and username: ' + user);
            allClients.push(socket);

            socket.on('getDescription', function() {
                socket.emit('getDescriptionResponse', description);
                description = nextDescription();
            });

            socket.on('sendUserInput', function(inputAry){
                console.log(inputAry)
                // socket.emit('sendUserInputResponse', [true, true , true, true, true]);
                let returnAry = []
                for( let i = 0; i < inputAry.length; i++){
                    returnAry.push(checkMatchBoolean(inputAry[i], answer) );
                }
                socket.emit('sendUserInputResponse', returnAry);
            });


            socket.on('disconnect', function(reason) {
                allClients.splice(allClients.indexOf(socket), 1);
                console.log('Connection with socket ' + socket.id + 'has been lost due to reason: ' + reason);
            });
        // }
    });

};
