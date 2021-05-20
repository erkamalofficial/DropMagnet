import styled from "styled-components";

export const FormWrapper = styled.div`
  border: 1px solid #464040;
  box-shadow: 0 2px 4px rgb(0 0 0 / 50%);
  padding: 24px;
  width: 400px;
  margin: 20% auto;
`;
export const GridItem = styled.div`
padding-bottom 16px;
`;
export const FormLabel = styled.label`
  display: inline-block;
  margin-bottom: 0.5rem;
`;
export const FormInput = styled.input`
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
`;
export const FormBtn = styled.button`
  display: inline-block;
  font-weight: 400;
  color: #212529;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  margin-bottom: 16px;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  width: 100%;
  background: blue;

  line-height: 40px;
  background-color: var(--darkBlue);
  color: var(--grey300);
  border: 1px solid var(--purple500);
  border-radius: 5px;
  font-size: var(--font-size-xs);
  font-weight: 700;
  padding: 0 14px;
  margin-right: 16px;
  cursor: pointer;
`;

export const FormAlert = styled.div`
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
`;
export const FormSuccess = styled.div`
  color: #155724;
  background-color: #d4edda;
  border-color: #c3e6cb;
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
`;
