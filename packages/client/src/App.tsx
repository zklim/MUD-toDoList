import React from "react";
import "./index.css";
import {
  AppContainer,
  Container,
  Card,
  HeaderDiv,
  Subtitle,
  Title,
  Footer,
  TextLink,
} from "./theme";

import { useMUD } from "./MUDContext";
import { Has, getComponentValueStrict } from "@latticexyz/recs";
import { useEntityQuery } from "@latticexyz/react";
import { ToDoForm } from "./ToDoForm";
import { ToDoItem } from "./ToDoItem";

export const App = () => {
  const {
    components: {
      ToDo,
    },
  } = useMUD();

  const ToDoIds = useEntityQuery([Has(ToDo)]);

  return (
    <Container>
      <AppContainer>
        <HeaderDiv>
          <Title>MUD x React Workshop</Title>
          <Subtitle>Creating a todo list using MUD</Subtitle>
        </HeaderDiv>

        <Card>
          {[...ToDoIds].map(id => {
            const toDoData = getComponentValueStrict(ToDo, id);
            return <ToDoItem key={id} id={id} {...toDoData} />
          })}
          <ToDoForm/>
        </Card>

        <Footer>
          <TextLink href="https://v2.mud.dev">MUD docs</TextLink>
        </Footer>
      </AppContainer>
    </Container>
  );
};
