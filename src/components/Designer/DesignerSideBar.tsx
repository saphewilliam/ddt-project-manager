import cx from 'clsx';
import React, { Dispatch, ReactElement, SetStateAction, useState } from 'react';
import Button from '@components/Button';
import Modal from '@components/Modal';
import useWasm from '@hooks/useWasm';
import { fontColorFromBackgroundRgb } from '@lib/util';
import { ToolIndex, Tool, ColorIndex, colors, Color } from 'src/pages/designer';
import DesignerSideBarSection from './DesignerSideBarSection';

export interface Props {
  tools: { [P in keyof typeof ToolIndex]: Tool };
  selectedTool: ToolIndex;
  setSelectedTool: Dispatch<SetStateAction<ToolIndex>>;
  palette: { [P in ColorIndex]: Color };
  setPalette: Dispatch<SetStateAction<{ [P in ColorIndex]: Color }>>;
  selectedColor: ColorIndex;
  setSelectedColor: Dispatch<SetStateAction<ColorIndex>>;
}

export default function DesignerSideBar(props: Props): ReactElement {
  const [showColorsModal, setShowColorsModal] = useState(false);
  const { instance } = useWasm();

  return (
    <div className={cx('bg-gray-900', 'text-gray-200', 'w-80', 'min-w-[20rem]')}>
      <DesignerSideBarSection title="Options">
        <div>
          <p>TODO</p>
          <ul>
            <li>Design size</li>
            <li>Stroke width, color</li>
            <li>Canvas background color</li>
          </ul>
        </div>
        <Button
          label="Better save than sorry"
          onClick={() => console.log(instance?.exports.save())}
        />
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
              'h-14',
              'rounded-md',
            )}
          >
            {props.selectedTool === toolIndex ? (
              <tool.selectedIcon width={20} />
            ) : (
              <tool.icon width={20} />
            )}

            <span className={cx('font-bold', 'text-sm')}>{tool.label}</span>
          </button>
        ))}
      </DesignerSideBarSection>

      <Modal
        show={showColorsModal}
        setShow={setShowColorsModal}
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
                  className={cx('flex-grow', 'py-1')}
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
    </div>
  );
}
