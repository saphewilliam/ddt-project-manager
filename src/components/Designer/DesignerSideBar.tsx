import useForm, { Field } from '@saphe/react-form';
import cx from 'clsx';
import React, { Dispatch, ReactElement, SetStateAction, useState } from 'react';
import Button from '@components/Button';
import FormFields from '@components/FormFields';
import Modal from '@components/Modal';
import useWasm from '@hooks/useWasm';
import { fontColorFromBackgroundRgb } from '@lib/util';
import { ToolIndex, Tool, ColorIndex, colors, Color } from 'src/pages/designer';
import { CanvasOptions } from './Canvas';
import DesignerSideBarSection from './DesignerSideBarSection';

export interface Props {
  tools: { [P in keyof typeof ToolIndex]: Tool };
  selectedTool: ToolIndex;
  setSelectedTool: Dispatch<SetStateAction<ToolIndex>>;
  palette: { [P in ColorIndex]: Color };
  setPalette: Dispatch<SetStateAction<{ [P in ColorIndex]: Color }>>;
  selectedColor: ColorIndex;
  setSelectedColor: Dispatch<SetStateAction<ColorIndex>>;
  canvasOptions: CanvasOptions;
  setCanvasOptions: Dispatch<SetStateAction<CanvasOptions>>;
}

export default function DesignerSideBar(props: Props): ReactElement {
  const [showColorsModal, setShowColorsModal] = useState(false);
  const { instance } = useWasm();

  const { form: canvasOptionsForm } = useForm({
    name: 'canvasOptionsForm',
    fieldPack: FormFields,
    submitButton: { hidden: true },
    fields: {
      strokeWidth: {
        type: Field.NUMBER,
        placeholder: '1',
        initialValue: props.canvasOptions.strokeWidth ?? undefined,
      },
      strokeColor: {
        type: Field.COLOR,
        placeholder: '#000000',
        initialValue: props.canvasOptions.strokeColor ?? '#000000',
      },
      selectedStrokeColor: {
        type: Field.COLOR,
        placeholder: '#ff0000',
        initialValue: props.canvasOptions.selectedStrokeColor ?? '#ff0000',
      },
      backgroundColor: {
        type: Field.COLOR,
        placeholder: '#ffffff',
        initialValue: props.canvasOptions.backgroundColor ?? '#ffffff',
      },
    },
    onChange: props.setCanvasOptions,
  });

  return (
    <div
      className={cx(
        'bg-gray-900',
        'text-gray-200',
        'w-80',
        'min-w-[20rem]',
        'scrollbar-thin',
        'scrollbar-track-gray-800',
        'scrollbar-thumb-gray-600',
      )}
    >
      <DesignerSideBarSection title="Options">
        <div className={cx('w-full')}>
          {/* TODO design size? */}
          {canvasOptionsForm}
        </div>
      </DesignerSideBarSection>

      <DesignerSideBarSection title="Tools" className={cx('flex-wrap')}>
        {Object.entries(props.tools).map(([toolIndex, tool]) => (
          <button
            key={toolIndex}
            onClick={() => props.setSelectedTool(toolIndex as ToolIndex)}
            title={tool.description}
            className={cx(
              'flex',
              'flex-col',
              'items-center',
              'justify-center',
              props.selectedTool === toolIndex
                ? 'bg-primary-200'
                : cx('bg-primary', 'hover:bg-primary-light'),
              'transition-colors',
              'text-gray-900',
              'w-[5.5rem]',
              'h-16',
              'rounded-md',
            )}
          >
            {props.selectedTool === toolIndex ? (
              <tool.selectedIcon width={18} />
            ) : (
              <tool.icon width={18} />
            )}

            <span className={cx('font-bold', 'text-xs')}>{tool.label}</span>
            <span className={cx('text-xs')}>({tool.shortcut})</span>
          </button>
        ))}
      </DesignerSideBarSection>

      <Modal
        isOpen={showColorsModal}
        close={() => setShowColorsModal(false)}
        title="Color Palette"
        body={
          <div className={cx('space-y-2')}>
            {Object.values(props.palette).map((color, i) => (
              <div className={cx('flex', 'space-x-3', 'items-center')} key={i}>
                <div
                  className={cx('border', 'border-gray-300', 'rounded-md', 'w-7', 'h-7')}
                  style={{ background: `rgb(${color.r}, ${color.g}, ${color.b})` }}
                />
                <select
                  value={color.name}
                  className={cx('grow', 'py-1')}
                  name={`colorPicker${i}`}
                  id={`colorPicker${i}`}
                  onChange={(e) =>
                    props.setPalette({
                      ...props.palette,
                      [i]: colors.find((c) => c.name === e.target.value),
                    })
                  }
                >
                  {colors.map((colorOption, j) => (
                    <option
                      key={j}
                      value={colorOption.name}
                      style={{
                        background: `rgb(${colorOption.r}, ${colorOption.g}, ${colorOption.b})`,
                        color: fontColorFromBackgroundRgb(
                          colorOption.r,
                          colorOption.g,
                          colorOption.b,
                        ),
                      }}
                    >
                      {colorOption.name}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        }
      />

      <DesignerSideBarSection title="Colors" moreButtonOnClick={() => setShowColorsModal(true)}>
        <div
          className={cx('w-16', 'rounded-md', 'transition-colors')}
          style={{
            background: `rgb(${props.palette[props.selectedColor].r}, ${
              props.palette[props.selectedColor].g
            }, ${props.palette[props.selectedColor].b})`,
          }}
        />
        <div className={cx('grid', 'grid-cols-5', 'grid-rows-2', 'gap-x-2', 'gap-y-1')}>
          {Object.entries(props.palette).map(([colorIndex, color], index) => (
            <button
              key={index}
              title={`${color.name} (ctrl + ${(index + 1) % 10})`}
              className={cx(
                'w-9',
                'h-9',
                'rounded-md',
                'hover:border-gray-400',
                'border-2',
                'border-gray-900',
              )}
              style={{ background: `rgb(${color.r}, ${color.g}, ${color.b})` }}
              onClick={() => {
                props.setSelectedColor(parseInt(colorIndex) as ColorIndex);
              }}
            />
          ))}
        </div>
      </DesignerSideBarSection>

      <DesignerSideBarSection title="Layers">TODO layers</DesignerSideBarSection>

      <DesignerSideBarSection title="Debug">
        <Button label="Save design" onClick={() => console.log(instance?.exports.save())} />
      </DesignerSideBarSection>
    </div>
  );
}
