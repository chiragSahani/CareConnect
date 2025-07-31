import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  SimpleGrid,
  Image,
  Flex,
  Icon,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { ArrowForwardIcon, StarIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import { Search, Calendar, Shield, Clock } from 'lucide-react';
import CountUp from 'react-countup';

const MotionBox = motion(Box);

const Home: React.FC = () => {
  const features = [
    {
      icon: Search,
      title: 'Find Specialists',
      description: 'Search through our network of qualified healthcare professionals',
      color: 'blue.500',
    },
    {
      icon: Calendar,
      title: 'Easy Booking',
      description: 'Schedule appointments with just a few clicks',
      color: 'green.500',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your health information is protected with enterprise-grade security',
      color: 'purple.500',
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Get help whenever you need it with our AI assistant',
      color: 'orange.500',
    },
  ];

  const stats = [
    { number: 500, label: 'Doctors' },
    { number: 10000, label: 'Happy Patients' },
    { number: 25, label: 'Specialties' },
    { number: 4.9, label: 'Rating' },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Container maxW="7xl" py={{ base: 20, md: 32 }}>
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={12} alignItems="center">
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Heading as="h1" size="3xl" mb={4}>
              Your Health, <Text as="span" color="blue.500">Our Priority</Text>
            </Heading>
            <Text fontSize="xl" color="gray.600" mb={8}>
              Connect with top healthcare professionals and book appointments seamlessly.
              Experience healthcare the modern way with CareConnect.
            </Text>
            <Stack direction={{ base: 'column', sm: 'row' }} spacing={4}>
              <Link to="/doctors">
                <Button colorScheme="blue" size="lg" rightIcon={<ArrowForwardIcon />}>
                  Find Doctors
                </Button>
              </Link>
              <Link to="/chat">
                <Button variant="outline" colorScheme="teal" size="lg">
                  Try AI Assistant
                </Button>
              </Link>
            </Stack>
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6} mt={12}>
              {stats.map((stat, index) => (
                <MotionBox
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  textAlign="center"
                >
                  <Text fontSize={{ base: '2xl', md: '3xl' }} fontWeight="bold" color="blue.500">
                    <CountUp end={stat.number} duration={2.75} separator="," />
                    {index === 3 ? '' : '+'}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    {stat.label}
                  </Text>
                </MotionBox>
              ))}
            </SimpleGrid>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            position="relative"
          >
            <Box position="relative" bg="white" rounded="2xl" shadow="2xl" p={8}>
              <Image
                src="https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Healthcare professional"
                w="full"
                h={96}
                objectFit="cover"
                rounded="xl"
              />
              <Box
                position="absolute"
                bottom={-4}
                right={-4}
                bg="green.500"
                color="white"
                p={4}
                rounded="xl"
                shadow="lg"
              >
                <Flex align="center">
                  <Icon as={StarIcon} mr={2} />
                  <Text fontWeight="semibold">4.9/5 Rating</Text>
                </Flex>
              </Box>
            </Box>
          </MotionBox>
        </SimpleGrid>
      </Container>

      {/* Features Section */}
      <Box py={20} bg={useColorModeValue('gray.50', 'gray.800')}>
        <Container maxW="7xl">
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            textAlign="center"
            mb={16}
          >
            <Heading as="h2" size="2xl" mb={4}>
              Why Choose CareConnect?
            </Heading>
            <Text fontSize="xl" color="gray.600" maxW="3xl" mx="auto">
              We make healthcare accessible, convenient, and reliable for everyone
            </Text>
          </MotionBox>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
            {features.map((feature, index) => (
              <MotionBox
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
                bg="white"
                p={6}
                rounded="xl"
                shadow="lg"
                _hover={{ shadow: 'xl' }}
                border="1px"
                borderColor="gray.100"
              >
                <Flex
                  w={12}
                  h={12}
                  rounded="lg"
                  bg={useColorModeValue(`${feature.color}.100`, `${feature.color}.900`)}
                  align="center"
                  justify="center"
                  mb={4}
                >
                  <Icon as={feature.icon} w={6} h={6} color={feature.color} />
                </Flex>
                <Heading as="h3" size="lg" mb={2}>
                  {feature.title}
                </Heading>
                <Text color="gray.600">{feature.description}</Text>
              </MotionBox>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box py={20} bgGradient="linear(to-r, blue.500, teal.500)">
        <Container maxW="7xl" textAlign="center">
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Heading as="h2" size="2xl" color="white" mb={4}>
              Ready to Experience Better Healthcare?
            </Heading>
            <Text fontSize="xl" color="blue.100" maxW="2xl" mx="auto" mb={8}>
              Join thousands of satisfied patients who trust CareConnect for their healthcare needs
            </Text>
            <Link to="/doctors">
              <Button
                colorScheme="whiteAlpha"
                size="lg"
                rightIcon={<ArrowForwardIcon />}
              >
                Get Started Today
              </Button>
            </Link>
          </MotionBox>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;