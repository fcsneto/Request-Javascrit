var onGoingRequest = []; //List of request
var last = 0; //Last request

//Request OBJ
function newRequest(url){
    last++;
    onGoingRequest.push({
        id: last,
        url: url,
    });
    if(onGoingRequest.length<5){
        request(url, last, 0);
    }
}

//Request function
function request(url, id, reTry){
    axios.get(url)
        .then(function(response){
            success(response);
            finish(posId(id), id);
        })
        .catch(function(error){
            fail(error);
            //Try 3 times
            if(reTry<3){
                reTry++;
                request(url, id, reTry);
            }else{
                finish(posId(id),  id);
            }
        });
}

//Position by ID
function posId(id){
    return onGoingRequest.findIndex(x => x.id === id);
}

//Request success
function success(response){
    console.log(response);
}

//Request error
function fail(error){
    console.warn(error);
}

//Complete request
function finish(pos, id){
    onGoingRequest.splice(pos,1);
    console.log('Resquent ID('+id+') is finish');
}

//ACTIONS TEST
newRequest('https://api.githgub.com/users/fcsneto');
newRequest('https://api.github.com/users/fcsneto');
