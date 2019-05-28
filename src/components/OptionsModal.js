import React from "react";
import { Modal, Button, InputNumber } from "antd";
import styled from "styled-components";

const StyledModalContentWrapper = styled.div`
  width: 100%;
  text-align: center;
  .InputRow {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    &__label {
      padding-top: 12px;
      margin-right: 10px;
    }
  }
`;

const OptionsModal = ({
  onProbabilityChange,
  initialProbability,
  onCellSizeChange,
  cellSize,
  onGridXChange,
  gridX,
  onGridYChange,
  gridY,
  visible,
  onOptionsSubmit
}) => {
  return (
    <div>
      <Modal
        visible={visible}
        title={null}
        onOk={() => {}}
        onCancel={() => {}}
        footer={[
          <Button key="back" onClick={() => {}}>
            Return
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={onOptionsSubmit}
          >
            Submit
          </Button>
        ]}
      >
        <StyledModalContentWrapper>
          <div className="InputRow">
            <p className="InputRow__label">Initial probability:</p>
            <InputNumber
              min={0}
              max={1}
              value={initialProbability}
              step={0.05}
              onChange={onProbabilityChange}
            />
          </div>
          <div className="InputRow">
            <p className="InputRow__label">Cell size:</p>
            <InputNumber
              min={6}
              max={16}
              value={cellSize}
              step={1}
              onChange={onCellSizeChange}
            />
          </div>
          <div className="InputRow">
            <p className="InputRow__label">Grid rows:</p>
            <InputNumber
              min={20}
              max={100}
              value={gridX}
              step={5}
              onChange={onGridXChange}
            />
          </div>
          <div className="InputRow">
            <p className="InputRow__label">Grid columns:</p>
            <InputNumber
              min={20}
              max={100}
              value={gridY}
              step={5}
              onChange={onGridYChange}
            />
          </div>
        </StyledModalContentWrapper>
      </Modal>
    </div>
  );
};

export default OptionsModal;
