import styled from "@emotion/styled";
import { FaWindowClose } from "react-icons/fa";

export default function PreviewAlert() {
  return (
    <PreviewStyled>
      <div className="preview-alert">
        <h4>(Preview Mode)</h4>
        <a href="#">
          <FaWindowClose />
        </a>
      </div>
    </PreviewStyled>
  );
}

const PreviewStyled = styled.div`
  .preview-alert {
    position: relative;
    margin-bottom: 2rem;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    a {
      display: flex;
      left: 0;
      padding-left: 1rem;
      position: absolute;
      &:hover {
        transform: scale(1.06);
      }
    }
  }
`;
