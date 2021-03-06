function host(endpoint){
    return `https://api.backendless.com/E9557377-8DA4-7C50-FFAA-126ECD352200/CCC395AD-8AA7-4A89-88EB-1AC597469E81/${endpoint}`
}

const endpoints ={
    REGISTER: 'users/register',
    LOGIN:'users/login',
    LOGOUT:'users/logout',
    MOVIES:'data/movies',
    MOVIE_BY_ID:'data/movies/'
};

async function register (username, password){
    return (await fetch (host(endpoints.REGISTER),{
        method :'POST',
        headers:{
        'Content-Type':'application/json'
        },
        body:JSON.stringify({
            username,
            password
        })
    })).json();
}

async function login (username, password){
   const result = await(await fetch (host(endpoints.LOGIN),{
        method :'POST',
        headers:{
        'Content-Type':'application/json'
        },
        body:JSON.stringify({
            login: username,
            password
        })
    })).json();

    localStorage.setItem('userToken', result['user-token'])
    localStorage.setItem('username', result.username)
    localStorage.setItem('userId',result.objectId)

    return result;
}

async function logout(){
    const token = localStorage.getItem('userToken')

    return  fetch (host(endpoints.LOGOUT), {
        headers:{
            'users-token': token
        }
    })
}

//get all movies
async function getMovies(){
    const token = localStorage.getItem('userToken');

   return (await fetch(host(endpoints.MOVIES),{
        headers:{
            'user-token': token
        }
    })).json();
}

//get movie by ID
async function getMovieById(id){
    const token = localStorage.getItem('userToken')
    return (await fetch(host(endpoints.MOVIE_BY_ID + id),{
        headers:{
            'user-token': token
        }
        })).json();
}
//create movie
async function createMovie(movie){
    const token = localStorage.getItem('userToken');
        
    const result = (await fetch (host(endpoints.MOVIES),{
        method :'POST',
        headers:{
        'Content-Type':'application/json',
        'user-token':token
        },
        body:JSON.stringify(movie)
    })).json()

    return result;
}

//edit movie
async function updateMovie(id, updateProps){
    const token = localStorage.getItem('userToken');
        
    return (await fetch (host(endpoints.MOVIE_BY_ID + id),{
        method :'PUT',
        headers:{
        'Content-Type':'application/json',
        'user-token':token
        },
        body:JSON.stringify(updateProps)
    })).json();
}

//delete movie
async function deleteMovie(id){
    const token = localStorage.getItem('userToken');
        
    return (await fetch (host(endpoints.MOVIE_BY_ID + id),{
        method :'DELETE',
        headers:{
        'Content-Type':'application/json',
        'user-token':token
        }
    })).json();
}



//get movies by users Id
async function getMovieByOwner(ownerId){
    const token = localStorage.getItem('userToken');
    

    return (await fetch(host(endpoints.MOVIES + `?where=ownerId%3D%27${ownerId}%27`),{
        headers:{
            'Content-Type':'application/json',
            'user-token':token
            } 
    })).json()
}

//buy ticket 
async function buyTicket (movie){
    //const token = localStorage.getItem('userToken');
    //const ownerId = localStorage.getItem('userId');

    const newTickets = movie.tickets - 1;
    const movieId = movie.objectId;

    return updateMovie(movieId, {tickets: newTickets})
}