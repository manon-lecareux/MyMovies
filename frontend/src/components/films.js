import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Col, CardImg, CardText, CardBody, Button, ButtonGroup } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar, faVideo } from "@fortawesome/free-solid-svg-icons";

function Film(props) {


// ------------------- déclaration des états -------------------------
    const [likeMovie, setLikeMovie] = useState(false);
    const [watchMovie, setWatchMovie] = useState(false);
    const [counterViews, setCounterViews] = useState(0);
    const [counterNote, setCounterNote] = useState(0);
    const [nbVotes, setnbVotes] = useState(props.filmsMoy);
    
    

// ------------------- fonction executées au clic ---------------------
    var videoClick = () => {
        setWatchMovie (true);
        setCounterViews(counterViews+1);
    };

    var lessClick = () => {
        if (counterNote > 0) {
            setCounterNote(counterNote - 1);
        }
    };

    var moreClick = () => {
        if (counterNote < 5) {
            setCounterNote(counterNote + 1);
            setnbVotes(props.filmsMoy + 1);
        }
    };

    var persoClick = (idstar) => {
        setCounterNote(idstar);
        setnbVotes(props.filmsMoy + 1);
    };


// ------------------- export des infos clic favoris ---------------------
    var likeClick = () => {
        setLikeMovie(!likeMovie);

        if(likeMovie === false){
            props.likeClickParent (props.filmTitle,props.filmImg);
        }else{
            props.dislikeClickParent (props.filmTitle,props.filmImg);
        }
    }



// ------------------- styles css ---------------------
    var card = {
        margin: "4% 0",
    };

    var cardBody = {
        minHeight: "370px",
    }


    if (likeMovie === true) {
        var colorLike = { color: "#fd6861",
                          marginLeft: "10px",
                          cursor: "pointer" };
    } else {
        colorLike = { color: "grey",
                      marginLeft: "10px",
                      cursor: "pointer" };
    }

 
    if (watchMovie === true) {
        var colorVideo = { color: "darkblue",
                       margin: "0 10px",
                       cursor: "pointer"};
    } else {
        colorVideo = { color: "grey",
                       margin: "0 10px",
                       cursor: "pointer"};
    }


// ------------------- note mon avis étoiles ---------------------
    var monAvis = [];
    for (var i = 0; i < 5; i++) {
        var colorMe = {};
        if (i < counterNote) {
            colorMe = { color: "#f1c40f" };
        }
        let counter = i + 1;
        monAvis.push(<FontAwesomeIcon onClick={() => persoClick(counter)} style={colorMe} icon={faStar} />);
    }


// ------------------- calcul moyenne étoiles ---------------------    
    var totalMoyenne = props.filmsNote * props.filmsMoy;

    totalMoyenne += counterNote;

    totalMoyenne = Math.round(totalMoyenne / props.filmsMoy + 1);

    var noteGlobale = [];

    for (var i = 1; i <= 5; i++) {
        var color = {};
        if (i < totalMoyenne) {
            color = { color: "#f1c40f" };
        }

        noteGlobale.push(<FontAwesomeIcon style={color} icon={faStar} />);
    }



// ------------------- html retourné à APP --------------------- 
    return (
        <Col xs="12" lg="6" xl="4">
            <Card style={card}>
                <CardImg src={props.filmImg} alt="Card image cap" />
                <CardBody style={cardBody}>
                    <CardText>
                        Favoris
                        <FontAwesomeIcon style={colorLike} icon={faHeart} onClick={() => likeClick()} />
                    </CardText>
                    <CardText>
                        Nombre de vues
                        <FontAwesomeIcon style={colorVideo} icon={faVideo} onClick={() => videoClick()} />
                        <Button type="button" style={{padding: "1px 5px", fontSize: "12px"}} >{counterViews}</Button>
                    </CardText>
                    <CardText>
                        <span style={{marginRight:"10px"}}>Mon avis</span>
                        {monAvis}
                        <ButtonGroup size="sm" style={{margin: "0 10px"}}>
                            <Button color="secondary" onClick={() => lessClick()}>
                                -
                            </Button>
                            <Button color="secondary" onClick={() => moreClick()}>
                                +
                            </Button>
                        </ButtonGroup>
                    </CardText>
                    <CardText>
                    <span style={{marginRight:"10px"}}>Moyenne</span>
                        {noteGlobale}({nbVotes})
                    </CardText>
                    <CardText>{props.filmTitle}</CardText>
                    <CardText>{props.filmDesc}</CardText>
                </CardBody>
            </Card>
        </Col>
    );
}

export { Film };
