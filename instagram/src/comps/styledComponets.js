import styled from 'styled-components';

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const FlexCenterA = styled(Flex)`
  align-items: center;
`;

const FlexCenterAJ = styled(FlexCenterA)`
  justify-content: center;
`;

export const MainApp = styled.div`
  padding: 3rem 0;
  width: 80%;
  max-width: 800px;
  text-align: center;
  margin: 0 auto;

  header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    border-bottom: 1px solid lightgray;
  }
`;

export const RightHeading = styled(FlexCenterA)`
  width: 32%;
  padding-left: 1rem;

  h1 {
    margin-left: 2rem;
    border-left: 2px solid black;
    padding-left: 1.5rem;
  }
`;

export const SearchBar = styled(FlexCenterAJ)`
  width: 32%;

  input {
    padding-left: 5px;
  }
`;

export const LeftHeading = styled(FlexCenterA)`
  width: 32%;
  justify-content: flex-end;
  padding-right: 1rem;

  div {
    display: flex;
    flex-wrap: wrap;
    width: 50%;
    justify-content: space-between;
  }
`;

export const Post = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 2rem;
  border-top: 3px solid lightgray;
`;

export const InnerPostCont = styled.div`
  margin-top: 4rem;
  border: 1px solid lightgray;
`;

export const PostHeading = styled(FlexCenterA)`
  img {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    padding: 1rem;
  }

  h2 {
    margin-left: 2rem;
  }
`;

export const CommentsContainer = styled.div`
  padding-top: 2rem;
  padding-right: 2rem;
  padding-left: 2rem;
  text-align: left;
`;

export const CommentsImg = styled(Flex)`
  padding-bottom: 2rem;
  padding-left: 1rem;
  width: 55px;
  justify-content: space-between;
`;

export const Likes = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  padding-left: 3px;
`;

export const UserComments = styled(Flex)`
  font-size: 1.5rem;
`;

export const Comment = styled.p.attrs({
  fontWeight: props => props.font || 'normal',
  paddingRight: props => props.padding || 'none',
})`
  margin: 0.3rem;
  font-weight: ${props => props.font};
  padding-right: ${props => props.padding};

  &:hover {
    cursor: pointer;
  }
`;
