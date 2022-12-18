import React, { useMemo } from "react";
import { IStateHeaderProps } from "@/components/headers/Headers.types";
import StoreIcon from "@mui/icons-material/Store";
import AssignmentIcon from "@mui/icons-material/Assignment";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

// @ts-ignore
import styles from "./header.module.scss";
import cn from "classnames";
import { EAppEntities } from "@/models/App";
import StateChangeButton from "@/components/UI/forms/StateChangeButton";
import { useChangePointStateMutation } from "@/redux/services/baseApi";
import { useAppError } from "@/lib/hooks/useAppError";
import { EPointState, getPointNextStateOptions, PrivilegeUtils } from "@/models/Point";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { selectSelectedPoint, setSelectedPoint } from "@/redux/reducers/selectedPointReducer";
import { selectCurrentUserRole } from "@/redux/reducers/authReducer";

const StateHeader: React.FC<IStateHeaderProps> = ({ entity, name, state, description, id }) => {
  const [changeState, { error, isLoading }] = useChangePointStateMutation();
  useAppError(error);
  const nextStates = getPointNextStateOptions(state);
  const selectedPoint = useAppSelector((state) => selectSelectedPoint(state));
  const dispatch = useAppDispatch();
  const role = useAppSelector(selectCurrentUserRole);

  const canChangeStatus = useMemo(() => PrivilegeUtils.checkCanChangeStatus(role, state), [state, role]);

  let icon;

  switch (entity) {
    case EAppEntities.COMPANY:
      icon = <StoreIcon />;
      break;

    case EAppEntities.PROJECT:
      icon = <AssignmentIcon />;
      break;

    case EAppEntities.POINT:
      icon = <RadioButtonCheckedIcon />;
      break;

    default:
      icon = <></>;
  }

  const changeStateHandler = (newState: EPointState) => {
    changeState({ pointId: id, newState });
    dispatch(setSelectedPoint({ point: { ...selectedPoint, stage: newState } }));
  };
  return (
    <>
      <div className={styles.container}>
        <span className={styles.icon}>{icon}</span>
        <h3 className={styles.title}>
          <span className={styles.entityName}>{name}</span>
        </h3>
        <span className={cn(styles.state, state && styles[state.toLowerCase()])}>{state}</span>
        {nextStates.map(({ state, action }) => (
          <StateChangeButton
            disabled={!canChangeStatus}
            key={action}
            onClick={() => changeStateHandler(state)}
            showLoader={isLoading}
            nextState={state}
            size="md"
          >
            {action}
          </StateChangeButton>
        ))}
      </div>
      <div>{description}</div>
    </>
  );
};

export default StateHeader;
