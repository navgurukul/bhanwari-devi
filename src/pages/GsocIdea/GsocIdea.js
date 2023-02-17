import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import CreateClassComponent from "../../components/Class";
import ClassesList from "../../components/Class/ClassList";
import { useSelector } from "react-redux";
import "../../components/Class/ClassList/styles.scss";
import axios from "axios";
import { METHODS } from "../../services/api";
// import "./styles.scss";
import useStyles from "./styles";
import {
  Container,
  Button,
  Modal,
  useMediaQuery,
  Box,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { List, ListItem, ListSubheader } from "@mui/material";
import { breakpoints } from "../../theme/constant";
import ClassForm from "../../components/Class/ClassForm";

import SuccessModel from "../../components/Class/SuccessModel";
import NewVolunteerCard from "../../components/Class/NewVolunteerCard";

function GscoIdea() {
  const classes = useStyles();

  return (
    <Container
      maxWidth="md"
      sx={{
        marginTop: "64px",
      }}
    >
      <Typography variant="body1">
        NavGurukul has developed a mobile-first platform called Meraki, which is
        already used by more than 55,000 learners across Haryana and
        Maharashtra. The students are taught skills such as Python, English,
        Typing, Scratch, and Web Development using a simple android phone and a
        keyboard (optional.)
      </Typography>
      <Typography variant="subtitle1" marginTop="32px" mb="16px">
        Alexa Chatbot:
      </Typography>
      <Typography variant="body1">
        To introduce the learners to skills such as AI, ML, NLP, and IOT, we
        want to build a specific functionality in the application (both mobile -
        kotlin and web - reactjs) that will allow the learners to create an
        Alexa chatbot using blocks. In simpler words, without writing any code -
        students will be able to make functional chatbots that they can test on
        their phones or on Alexa devices. The Alexa Skills Kit (ASK) is a
        software development framework that enables you to create content called
        skills. Skills are like apps for Alexa. NavGurukul has already
        integrated Scratch - a block-based programming language with a simple
        visual interface that allows young people to create digital stories,
        games, and animations.
      </Typography>
      <Typography variant="body1" paddingTop="32px">
        This project involves building the following capabilities:
      </Typography>
      <List
        sx={{
          listStyleType: "ol",
          pl: 2,
          pt: "0",
          "& .MuiListItem-root": {
            display: "list-item",
          },
        }}
        className={classes.listItem}
      >
        <ListItem pb="0px">
          Define and implement a basic set of scratch blocks to create the Alexa
          skill/app,
        </ListItem>
        <ListItem pb="0px">
          Define and implement character blocks, motion blocks, control blocks,
          event blocks, and custom blocks mapped to the corresponding Alexa
          Programming Language.
        </ListItem>
        <ListItem pb="0px">
          Define and implement a block to publish the Alexa skill/app to
          Alexa-enabled devices.
        </ListItem>
      </List>
      <Typography variant="subtitle1" mt="32px" mb="16px">
        Build a playground to learn blockchain:
      </Typography>
      <List
        sx={{
          listStyleType: "ol",
          pl: 2,
          pt: "0",
          "& .MuiListItem-root": {
            display: "list-item",
          },
        }}
        className={classes.listItem}
      >
        <ListItem>
          To build a playground for learning blockchain, the first step would be
          to create a chatbot that can explain the basics of blockchain
          technology to users. The chatbot should be able to answer questions
          about blockchain and provide helpful information, such as what a
          blockchain is, who invented it, and how it works. Additionally, it
          should be able to provide examples of real-world applications of
          blockchain technology and explain the benefits and risks associated
          with using it.
        </ListItem>
        <ListItem>
          Once the basics have been established, the chatbot can provide more
          advanced topics, such as how to create a blockchain, how to use smart
          contracts, and how to develop decentralized applications. The chatbot
          should also be able to provide resources and tutorials to help users
          get started with blockchain development.
        </ListItem>
        <ListItem>
          Finally, the chatbot can provide an interactive playground where users
          can practice using blockchain technology. This would include
          activities such as setting up a private blockchain network,
          programming a smart contract, or building a decentralized application.
          The chatbot should be able to provide helpful feedback and resources
          to help users complete the activities.
        </ListItem>
      </List>
      <Typography variant="subtitle1" mt="32px" mb="16px">
        Building a platform to learn technology in the user-preferred language:
      </Typography>
      <Typography variant="body1">
        The goal of this project is to build a platform that leverages AI to
        identify language proficiency levels and create personalized language
        learning experiences for users. The platform will use a combination of
        natural language processing and machine learning algorithms to determine
        the learner's current level of proficiency in a target language and
        provide content that is tailored to their needs.
        <br />
        To achieve this, the following steps will be undertaken:
      </Typography>
      <List
        sx={{
          listStyleType: "ol",
          pl: 2,
          pt: "0",
          "& .MuiListItem-root": {
            display: "list-item",
          },
        }}
        className={classes.listItem}
      >
        <ListItem>
          Develop an algorithm to identify the learner's current level of
          proficiency in the target language based on factors such as grammar,
          vocabulary, and writing style.
        </ListItem>
        <ListItem>
          Create a platform for delivering the learning content that can track
          the learner's progress and adjust the content based on their
          performance.
        </ListItem>
        <ListItem>
          Incorporate machine learning algorithms to continuously evaluate and
          improve the content, tailoring it to the individual needs and
          preferences of each learner.
        </ListItem>
        <ListItem>
          Offer a wide range of subjects, such as English as a Second Language,
          to accommodate a diverse group of learners.
        </ListItem>
        <ListItem>
          Continuously gather feedback from learners and make improvements to
          the platform based on that feedback to ensure that the solution is
          constantly evolving and improving.
        </ListItem>
      </List>
      <Typography variant="body1">
        This project aligns well with the goals of Google Summer of Code as it
        involves using AI to improve education and make it more accessible and
        personalized for learners.
      </Typography>
    </Container>
  );
}

export default GscoIdea;
