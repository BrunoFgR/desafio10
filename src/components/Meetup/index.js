import React, { useMemo } from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';
import api from '~/services/api';

import Button from '~/components/Button';

import {
  Container,
  Banner,
  Avatar,
  Title,
  Info,
  InfoData,
  InfoText,
  ContainerButton,
} from './styles';

export default function Meetup({ data }) {
  const date = useMemo(
    () =>
      format(
        parseISO(data.meetup ? data.meetup.date : data.date),
        "dd 'de' MMMM', às' HH'h'",
        { locale: pt }
      ),
    [data.date, data.meetup]
  );

  async function handleSubscription(id) {
    try {
      await api.post(`meetups/${id}/subscriptions`);

      Alert.alert('Sucesso!', 'Inscrição criada com sucesso!');
    } catch (error) {
      if (error.response) {
        switch (error.response.data.error) {
          case "Can't subscribe to two meetups at the same time": {
            Alert.alert(
              'Erro na inscrição',
              'O usuário não pode se inscrever em dois meetups no mesmo horário'
            );
            break;
          }
          case "Can't subscribe to you own meetups": {
            Alert.alert(
              'Erro na inscrição',
              'O usuário não pode se inscrever em um meetup em que é dono'
            );
            break;
          }
          default:
        }
      }
    }
  }

  async function handleCancelSubscription(id) {
    try {
      await api.delete(`subscriptions/${id}`);

      Alert.alert('Sucesso!', 'Inscrição cancelada com sucesso!');
    } catch (error) {
      if (error.response) {
        switch (error.response.data.error) {
          case 'Meetup not found': {
            Alert.alert('Erro no cancelamento', 'O meetup não foi encontrado!');
            break;
          }
          case 'User cannot delete past meetups': {
            Alert.alert(
              'Erro no cancelamento',
              'O usuário não pode cancelar inscrições que ja aconteceram'
            );
            break;
          }
          default:
        }
      }
    }
  }

  return (
    <Container>
      <Banner>
        <Avatar
          source={{
            uri: `${data.meetup ? data.meetup.image.url : data.image.url}`,
          }}
        />
      </Banner>

      <Title>{data.meetup ? data.meetup.title : data.title}</Title>

      <Info>
        <InfoData>
          <Icon name="event" size={20} color="#999" />
          <InfoText>{date}</InfoText>
        </InfoData>
        <InfoData>
          <Icon name="place" size={20} color="#999" />
          <InfoText>
            {data.meetup ? data.meetup.location : data.location}
          </InfoText>
        </InfoData>
        <InfoData>
          <Icon name="person" size={20} color="#999" />
          <InfoText>
            Organizador: {data.meetup ? data.meetup.user.name : data.user.name}
          </InfoText>
        </InfoData>
      </Info>

      <ContainerButton>
        <Button
          onPress={() =>
            data.meetup
              ? handleCancelSubscription(data.meetup.id)
              : handleSubscription(data.id)
          }
        >
          {data.meetup ? 'Cancelar inscrição' : 'Realizar inscrição'}
        </Button>
      </ContainerButton>
    </Container>
  );
}

Meetup.propTypes = {
  data: PropTypes.shape({
    date: PropTypes.string,
    image: PropTypes.shape({
      url: PropTypes.string,
    }),
    location: PropTypes.string,
    title: PropTypes.string,
    user: PropTypes.shape({
      name: PropTypes.string,
    }),
    meetup: PropTypes.shape({
      image: PropTypes.shape({
        url: PropTypes.string,
      }),
      location: PropTypes.string,
      user: PropTypes.shape({
        name: PropTypes.string,
      }),
      title: PropTypes.string,
      date: PropTypes.string,
    }),
  }).isRequired,
};
