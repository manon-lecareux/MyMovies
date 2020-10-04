import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Film } from "./components/films";
import { Container, Row, Button, Nav, NavItem, NavLink, Popover, PopoverHeader, PopoverBody, ListGroup, ListGroupItem } from "reactstrap";
import "./App.css";

function App() {

    

// ------------------- déclaration des états -------------------------    
    const [favorisList, setFavorisList] = useState([]);
    const [favorisCount, setFavorisCount] = useState(0);
    const [newFilms, setNewFilms] = useState([]);



  
    useEffect(() => {
        async function loadData() {

            var response = await fetch('/new-movies');
            var jsonResponse = await response.json();
            setNewFilms(jsonResponse);

            var responseFav = await fetch('/favorislist');
            var jsonResponseFav = await responseFav.json();

            setFavorisList(jsonResponseFav);
            setFavorisCount(jsonResponseFav.length);

        }
        loadData()
      }, []);

      console.log(favorisList);


// -------- execution like via clic favoris dans films.js --------    
    var likeClick = async (name,img) => {
        setFavorisCount(favorisCount+1);
        setFavorisList([...favorisList, {titre:name,image:img}]);

        var response = await fetch('/addfavoris', {
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: `nameFetch=${name}&imgFetch=${img}`
        });

        // var jsonResponse = await response.json();
        // setNewFilms(jsonResponse);
        
        
    };

    var dislikeClick = async (name) => {
        setFavorisCount(favorisCount-1);
        setFavorisList( favorisList.filter((e)=>(e.name !== name) ))

        var response = await fetch(`/supprfavoris/${name}`, {
            method: 'DELETE',
        });
    };


// ------------ lien Webservice liste films -----------    


    // var filmsData = [
    //     { src: "/starwars.jpg", title: "Star Wars : L'Ascension de Skywalker", desc: "La conclusion de la saga Skywalker. De nouvelles légendes vont naître dans cette ...", note: 3.5, votes: 2 },
    //     { src: "/maleficent.jpg", title: "Maléfique : Le pouvoir du mal", desc: "Plusieurs années après avoir découvert pourquoi la plus célèbre méchante Disney avait un ...", note: 4.7, votes: 4 },
    //     { src: "/jumanji.jpg", title: "Jumanji : The Next Level", desc: "L'équipe est de retour mais le jeu a changé. Alors qu'ils retournent dans Jumanji pour secourir ...", note: 2.2, votes: 5 },
    //     { src: "/once_upon.jpg", title: "Once Upon A Time in Hollywood", desc: "En 1969, la star de télévision Rick Dalton et le cascadeur Cliff Booth, sa doublure de ...", note: 4.9, votes: 3 },
    //     { src: "/frozen.jpg", title: "La reine des neiges 2", desc: "Pourquoi Elsa est-elle née avec des pouvoirs magiques ? La jeune fille rêve de l’apprendre ...", note: 2.7, votes: 4 },
    //     { src: "/terminator.jpg", title: "Terminator : Dark Fate", desc: "De nos jours à Mexico. Dani Ramos, 21 ans, travaille sur une chaîne de montage dans ...", note: 2.7, votes: 2 },
    // ];

    var filmsList = [];

    
    

    for (var i = 0; i < newFilms.length; i++) {

        if(newFilms[i].backdrop_path === null){
            var imgCheck = "/generique.jpg";
        }else{
            imgCheck = "http://image.tmdb.org/t/p/w500" + newFilms[i].backdrop_path;
        }
    
    
        if(newFilms[i].overview.length>160){
            var descCheck= newFilms[i].overview.slice(0,160)+" ..."
        }else{
            descCheck = newFilms[i].overview
        }

        filmsList.push(<Film likeClickParent={likeClick} dislikeClickParent={dislikeClick} filmImg={imgCheck} filmTitle={newFilms[i].title} filmDesc={descCheck} filmsNote={newFilms[i].vote_count} filmsMoy={newFilms[i].vote_average}  />);
    }


// ------------------- styles css ---------------------
    var container = {
        backgroundColor: "#232528",
        width: "100%",
        justifyContent: "center",
    };

    var bar = {
        padding: "10px 5%",
        display: "flex",
        alignItems: "center",
    };

    var liens = {
        color: "white",
    };

    var raw = {
        width: "100%",
        margin: "0",
    };


// ------------ gestion pop-up favoris via reactstrap -----------
    const [popoverOpen, setPopoverOpen] = useState(false);
    const toggle = () => setPopoverOpen(!popoverOpen);

     var affichage = [];
    for (var i=0; i<favorisList.length; i++) {
        affichage.push (<ListGroupItem>
                        <img width="100%" alt="film" src={favorisList[i].image} /> {favorisList[i].titre}
                        </ListGroupItem>)
    };
    // -----------alternative en map -----------
    //  var affichage = favorisList.map((film,i) => {
    //     return (<ListGroupItem>
    //                <img width="100%" alt="film" src={film.image} /> {film.titre}
    //             </ListGroupItem>)
    // });




// ------------------- html retourné au navigateur via export final  ---------------------
    return (
        <div style={container}>
            <Nav style={bar}>
                <img src="/logo.png" alt="logo" width="30" height="30" className="d-inline-block align-top" />
                <NavItem>
                    <NavLink style={liens}>MyMovies</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink style={liens}>
                        <Button id="Popover1" type="button">
                            {favorisCount} favoris
                        </Button>
                        <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={toggle}>
                            <PopoverHeader>Mes Favoris</PopoverHeader>
                            <PopoverBody>
                                <ListGroup>
                                    {affichage}
                                </ListGroup>
                            </PopoverBody>
                        </Popover>
                    </NavLink>
                </NavItem>
            </Nav>
            <Container>
                <Row style={raw}>{filmsList}</Row>
            </Container>
        </div>
    );
}

export default App;
