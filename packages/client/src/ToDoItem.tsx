import styled from "styled-components";
import { useMUD } from "./MUDContext";
import { getComponentValue, setComponent } from "@latticexyz/recs";

type Props = {
  id: Entity;
  body: string;
  done: boolean;
}

const ToDoItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  color: white;
`;


export function ToDoItem({id, body, done}: Props) {
  const {
    systemCalls: {
      toggleDone,
    },
    components: {
      ToDo,
    },
  } = useMUD();

  const toDoData = getComponentValue(ToDo, id);
  if (!toDoData) return <></>

  return (
    <ToDoItemWrapper>
      <span>
        {body}
      </span>
      <input type="checkbox" checked={done} onChange={() => {
        ToDo.addOverride("done", {
          entity: id,
          value: {
            ...toDoData,
            done: !toDoData.done,
          }
        })
        toggleDone(id);
      }}/>
    </ToDoItemWrapper>
  )
}