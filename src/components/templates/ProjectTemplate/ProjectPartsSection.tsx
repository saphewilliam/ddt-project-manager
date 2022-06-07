import { ExclamationIcon, PlusIcon, TrashIcon } from '@heroicons/react/outline';
import { MenuIcon } from '@heroicons/react/solid';
import cx from 'clsx';
import React, { CSSProperties, ReactElement, ReactNode } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Button, { ButtonType } from '@components/Button';
import { ProjectQuery, ProjectType } from '@graphql/__generated__/codegen-self';
import { projectTypeToString } from '@lib/projectTypeHelpers';
import { GeneralPanelSection } from './GeneralPanel';
import useProjectPartsSectionState from './hooks/useProjectPartsSectionState';

export interface Props {
  swrKey: string;
  project: NonNullable<ProjectQuery['project']>;
}

// TODO error, success, and warning color
const Warning = (props: { children: ReactNode }): ReactElement => (
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
    <span>Warning: {props.children}</span>
  </div>
);

const getStyle = (style: CSSProperties | undefined) =>
  style?.transform
    ? { ...style, transform: `translate(0px, ${style.transform.split(',').pop()}` }
    : style;

export default function ProjectPartsSection(props: Props): ReactElement {
  const { state, actions, isLoading } = useProjectPartsSectionState(props.project, props.swrKey);

  return (
    <GeneralPanelSection title="Parts" {...state} {...props} {...actions}>
      {state.isEditing ? (
        <DragDropContext
          onDragEnd={(result) => {
            if (!result.destination) return;
            if (result.source.index === result.destination.index) return;
            actions.drop(result.source.index, result.destination.index);
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
                            disabled={isLoading}
                            onChange={(e) => actions.changeName(part.id, e.target.value)}
                          />
                          <select
                            className={cx('py-1')}
                            value={part.type}
                            disabled={isLoading}
                            onChange={(e) =>
                              actions.changeType(part.id, e.target.value as ProjectType)
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
                          onClick={() => actions.delete(part.id)}
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

          <div className={cx('flex', 'justify-center', 'mt-3', 'text-gray-600')}>
            <button
              onClick={() => actions.add()}
              className={cx('border', 'rounded-full', 'border-gray-600', 'p-1', 'mr-4')}
            >
              <PlusIcon width={16} />
            </button>
          </div>

          {state.showTypeWarning && (
            <Warning>
              You have changed the technique of a project part. This may have unintended,
              irreversable effects on the project design.
            </Warning>
          )}
          {state.showDeleteWarning && (
            <Warning>
              You have deleted one or more project parts. This will permanently delete the project
              design, stones list and attributes list associated with it.
            </Warning>
          )}
          <div className={cx('mt-4', 'flex', 'space-x-3')}>
            <Button
              label="Save parts"
              loading={isLoading}
              disabled={!state.canSubmit}
              onClick={() => actions.save()}
            />
            <Button
              label="Cancel"
              loading={isLoading}
              buttonType={ButtonType.EMPTY}
              onClick={() => actions.reset()}
            />
          </div>
        </DragDropContext>
      ) : (
        <ul>
          {props.project.parts.length === 0 ? (
            <p>No parts found</p>
          ) : (
            props.project.parts.map((part) => (
              <li key={part.id}>
                #{props.project.number}.{part.number} {part.name} ({projectTypeToString(part.type)})
              </li>
            ))
          )}
        </ul>
      )}
    </GeneralPanelSection>
  );
}
