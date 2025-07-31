import React from 'react';
import {
  Box,
  Heading,
  Text,
} from '@chakra-ui/react';

const Dashboard: React.FC = () => {
  return (
    <Box p={8}>
      <Heading as="h1" size="xl" mb={4}>
        Dashboard
      </Heading>
      <Text fontSize="lg">
        Welcome to your dashboard. Here you can see your appointments and other information.
      </Text>
    </Box>
  );
};

export default Dashboard;
