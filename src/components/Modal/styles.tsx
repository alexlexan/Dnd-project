import styled, { css } from "styled-components";
import { motion } from "framer-motion";
import { Color } from "react-color";

export const Container = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BackDrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

export const Body = styled(motion.div)`
  position: absolute;
  left: 50%;
  max-width: 500px;
  min-width: 320px;
  margin: 0 auto;
  padding: 40px 20px;
  background: white;
  border-radius: 10px;
  text-align: center;
  z-index: 2;
  }

  p {
    color: #444;
    font-weight: bold;
  }

  div {
    text-align: left;
  }
`;

export const Button = styled.button<{ primary?: string }>`
  color: #fff;
  border-color: #444;
  font-weight: bold;
  margin-top: 20px;

  padding: 10px 30px;
  font-size: 1em;
  border-radius: 50px;
  border: 1px solid white;
  margin: 40px auto 0;
  cursor: pointer;
  opacity: 0.7;
  transition: all 0.5s ease;
  background: #3b5bfd;

  ${(props) =>
    props.primary &&
    css`
      background: ${props.primary};
      color: #3b5bfd;
      margin-left: 20px;
    `};

  &:hover {
    color: #fff;
    background: #fa2226;
    transition: all 0.5s ease;
  }
`;

export const ColorSection = styled.div`
  display: flex;
`;

type SpanProps = {
  background: Color;
};

export const ColorSquare = styled.div`
  margin: 20px 0;
  padding: 5px;
  background: #fff;
  border-radius: 1px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  display: inline-block;
  cursor: pointer;
`;

export const Span = styled.div<SpanProps>`
  width: 36px;
  height: 14px;
  border-radius: 2px;
  background: ${(props) => props.background as string};
`;

export const ColorPickerContainer = styled.div`
  position: absolute;
  z-index: 2;
  top: 130px;
`;

export const ColorPicker = styled.div`
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`;

export const Description = styled.div``;
