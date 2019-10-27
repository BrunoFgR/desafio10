import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  border-radius: 4px;
  background: #fff;
  justify-content: center;

  margin-bottom: 20px;
`;

export const Banner = styled.View`
  height: 150px;
  border-radius: 4px;
`;

export const Avatar = styled.Image`
  height: 100%;
  width: 100%;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-top: 20px;
  margin-left: 18px;
`;

export const Info = styled.View`
  margin: 10px 0 15px;
  margin-left: 18px;
`;

export const InfoData = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 3px 0;
`;

export const InfoText = styled.Text`
  font-size: 13px;
  color: #999;
  margin-left: 5px;
`;

export const ContainerButton = styled.View`
  flex: 1;
  padding: 0 20px 20px;
`;
