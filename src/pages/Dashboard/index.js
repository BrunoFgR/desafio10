import React from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';

// import { Container } from './styles';

import Background from '~/components/Background';

export default function Dashboard() {
  return <Background />;
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="format-list-bulleted" size={20} color={tintColor} />
  ),
};
