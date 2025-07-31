import React from 'react';
import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
  SimpleGrid,
  Icon,
  HStack,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { Heart, Phone, Mail, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

export default function Footer() {
  return (
    <MotionBox
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      bg={useColorModeValue('gray.900', 'gray.900')}
      color={useColorModeValue('gray.400', 'gray.400')}
    >
      <Container as={Stack} maxW={'7xl'} py={12}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack spacing={4}>
            <HStack>
              <Box bg="blue.500" p={2} rounded="lg">
                <Heart size={20} color="white" />
              </Box>
              <Text fontSize="xl" fontWeight="bold" color="white">
                CareConnect
              </Text>
            </HStack>
            <Text fontSize={'sm'}>
              Your trusted healthcare partner, connecting you with the best medical professionals for comprehensive care.
            </Text>
          </Stack>
          <Stack align={'flex-start'}>
            <Text fontWeight={'500'} fontSize={'lg'} mb={2} color="white">
              Quick Links
            </Text>
            <RouterLink to={'/doctors'}>Find Doctors</RouterLink>
            <RouterLink to={'/appointments'}>Book Appointment</RouterLink>
            <RouterLink to={'/about'}>About Us</RouterLink>
            <RouterLink to={'/chat'}>AI Assistant</RouterLink>
          </Stack>
          <Stack align={'flex-start'}>
            <Text fontWeight={'500'} fontSize={'lg'} mb={2} color="white">
              Services
            </Text>
            <Text>Cardiology</Text>
            <Text>Dermatology</Text>
            <Text>Pediatrics</Text>
            <Text>Orthopedics</Text>
          </Stack>
          <Stack align={'flex-start'}>
            <Text fontWeight={'500'} fontSize={'lg'} mb={2} color="white">
              Contact Us
            </Text>
            <HStack>
              <Icon as={Phone} color="blue.400" />
              <Text>+1 (555) 123-4567</Text>
            </HStack>
            <HStack>
              <Icon as={Mail} color="blue.400" />
              <Text>support@careconnect.com</Text>
            </HStack>
            <HStack>
              <Icon as={MapPin} color="blue.400" />
              <Text>123 Healthcare St, Medical City</Text>
            </HStack>
          </Stack>
        </SimpleGrid>
      </Container>
      <Box
        borderTopWidth={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.700', 'gray.700')}
      >
        <Container
          as={Stack}
          maxW={'7xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}
        >
          <Text>© 2024 CareConnect. All rights reserved.</Text>
          <Stack direction={'row'} spacing={6}>
            <RouterLink to={'#'}>Privacy Policy</RouterLink>
            <RouterLink to={'#'}>Terms of Service</RouterLink>
          </Stack>
        </Container>
      </Box>
    </MotionBox>
  );
}