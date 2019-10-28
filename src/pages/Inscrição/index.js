import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Logo from '~/assets/M.png';
import api from '~/services/api';

import Background from '~/components/Background';
import Meetup from '~/components/Meetup';

import { Container, Header, List } from './styles';

export default function Inscricao() {
  const [meetup, setMeetup] = useState([]);

  async function loadSubscription() {
    const response = await api.get('subscriptions');

    setMeetup(response.data);
  }

  useEffect(() => {
    loadSubscription();
  }, []);

  return (
    <Background>
      <Container>
        <Header>
          <Image source={Logo} size={20} />
        </Header>

        <List
          data={meetup}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <Meetup data={item} />}
        />
      </Container>
    </Background>
  );
}

Inscricao.navigationOptions = {
  tabBarLabel: 'Incrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};
