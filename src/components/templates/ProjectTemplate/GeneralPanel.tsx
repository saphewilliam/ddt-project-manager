import { ExclamationIcon, TrashIcon } from '@heroicons/react/outline';
import { MenuIcon } from '@heroicons/react/solid';
import { useAsyncReducer } from '@saphe/react-use';
import cx from 'clsx';
import React, { CSSProperties, ReactElement } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Button, { ButtonType } from '@components/Button';
import ProjectStatusBadge from '@components/ProjectStatusBadge';
import { ProjectQuery, ProjectType } from '@graphql/__generated__/codegen-self';
import { projectTypeToString } from '@lib/util';

export interface Props {
  project: NonNullable<ProjectQuery['project']>;
}

const getStyle = (style: CSSProperties | undefined) =>
  style?.transform
    ? { ...style, transform: `translate(0px, ${style.transform.split(',').pop()}` }
    : style;

export default function GeneralPanel({ project }: Props): ReactElement {
  const initialState = {
    parts: project.parts,
    showTypeWarning: false,
    showDeleteWarning: false,
    isEditing: false,
    canSubmit: true,
  };

  const { state, actions } = useAsyncReducer(initialState, {
    startEditing: () => ({ ...initialState, isEditing: true }),
    stopEditing: () => initialState,
    handleDrop: (prevState, srcId: number, destId: number) => {
      const parts = [...prevState.parts];
      const item = parts.splice(srcId, 1)[0];
      if (!item) return prevState;

      parts.splice(destId, 0, item);
      return { ...prevState, parts };
    },
    handleDelete: (prevState, id: string) => ({
      ...prevState,
      showDeleteWarning: true,
      parts: prevState.parts.filter((part) => part.id !== id),
    }),
    handleNameChange: (prevState, id: string, targetValue: string) => ({
      ...prevState,
      canSubmit:
        targetValue !== '' &&
        !prevState.parts.reduce<boolean>(
          (prev, curr) => prev || (curr.id !== id && curr.name === ''),
          false,
        ),
      parts: prevState.parts.map((part) =>
        part.id === id ? { ...part, name: targetValue } : part,
      ),
    }),
    handleTechniqueChange: (prevState, id: string, targetValue: ProjectType) => ({
      ...prevState,
      showTypeWarning: !prevState.parts.reduce(
        (prev, curr) => prev || curr.type !== project.parts.find((p) => p.id === curr.id)?.type,
        false,
      ),
      parts: prevState.parts.map((part) =>
        part.id === id ? { ...part, type: targetValue } : part,
      ),
    }),
    save: (prevState) => {
      // TODO
      return prevState;
    },
  });

  return (
    <>
      <ul>
        <li>
          <span className={cx('font-bold')}>Supervisor: </span>
          {project.supervisor?.displayName}
        </li>
        <li>
          <span className={cx('font-bold')}>Subtheme: </span>
          {project.subtheme.name} ({project.subtheme.event.name})
        </li>
        <li>
          <ProjectStatusBadge status={project.status} />
        </li>
      </ul>

      <hr className={cx('my-4')} />

      <h3 className={cx('font-bold')}>Description</h3>
      <p>{project.description || 'No general description found'}</p>

      <hr className={cx('my-4')} />

      <h3 className={cx('font-bold')}>Parts</h3>
      {state.isEditing ? (
        <DragDropContext
          onDragEnd={(result) => {
            if (!result.destination) return;
            if (result.source.index === result.destination.index) return;
            actions.handleDrop(result.source.index, result.destination.index);
          }}
        >
          <Droppable droppableId="parts">
            {(provided) => (
              <ul className={cx('pt-3')} ref={provided.innerRef} {...provided.droppableProps}>
                {state.parts.map((part, idx) => (
                  <Draggable key={part.id} draggableId={part.id} index={idx}>
                    {({ draggableProps, dragHandleProps, innerRef }) => (
                      <li
                        {...draggableProps}
                        ref={innerRef}
                        style={getStyle(draggableProps.style)}
                        className={cx('flex', 'items-center', 'space-x-5', 'mb-2')}
                      >
                        <div {...dragHandleProps}>
                          <MenuIcon width={20} height={20} className={cx('text-gray-400')} />
                        </div>
                        <div className={cx('grid', 'grid-cols-2', 'w-full', 'gap-x-5')}>
                          <input
                            className={cx('py-1')}
                            type="text"
                            value={part.name}
                            onChange={(e) => actions.handleNameChange(part.id, e.target.value)}
                          />
                          <select
                            className={cx('py-1')}
                            value={part.type}
                            onChange={(e) =>
                              actions.handleTechniqueChange(part.id, e.target.value as ProjectType)
                            }
                          >
                            {Object.keys(ProjectType).map((type) => (
                              <option key={type} value={type}>
                                {projectTypeToString(type as ProjectType)}
                              </option>
                            ))}
                          </select>
                        </div>
                        {/* TODO error, success, and warning color, plus hover effect */}
                        <button
                          className={cx('bg-ddt-red', 'text-white', 'p-2', 'rounded-md')}
                          onClick={() => actions.handleDelete(part.id)}
                        >
                          <TrashIcon width={18} height={18} />
                        </button>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
          {state.showTypeWarning && (
            // TODO error, success, and warning color
            <div
              className={cx(
                'flex',
                'items-center',
                'space-x-4',
                'bg-primary-400',
                'px-5',
                'py-1',
                'text-white',
                'rounded-md',
                'mt-4',
              )}
            >
              <ExclamationIcon width={20} height={20} className={cx('shrink-0')} />
              <span>
                Warning: You have changed the technique of a project part. This may have unintended,
                irreversable effects on the project design.
              </span>
            </div>
          )}
          {state.showDeleteWarning && (
            // TODO code duplication
            // TODO error, success, and warning color
            <div
              className={cx(
                'flex',
                'items-center',
                'space-x-4',
                'bg-primary-400',
                'px-5',
                'py-1',
                'text-white',
                'rounded-md',
                'mt-4',
              )}
            >
              <ExclamationIcon width={20} height={20} className={cx('shrink-0')} />
              <span>
                Warning: You have deleted a project part. This will permanently delete the project
                design, stones list and attributes list associated with it.
              </span>
            </div>
          )}
          <div className={cx('mt-4', 'flex', 'space-x-3')}>
            <Button label="Save parts" disabled={!state.canSubmit} onClick={() => actions.save()} />
            <Button
              label="Cancel"
              buttonType={ButtonType.EMPTY}
              onClick={() => actions.stopEditing()}
            />
          </div>
        </DragDropContext>
      ) : (
        <div className={cx('flex', 'space-x-3')}>
          <Button label="Edit parts" onClick={() => actions.startEditing()} />
        </div>
      )}
    </>
  );
}
