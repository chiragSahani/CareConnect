import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Icon,
  VStack,
  useColorModeValue,
  Flex,
  Button,
  Image,
} from '@chakra-ui/react';
import { Heart, Shield, Users, Target, Globe, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { Link } from 'react-router-dom';
import { ArrowForwardIcon } from '@chakra-ui/icons';

const MotionBox = motion(Box);

const About: React.FC = () => {
  const values = [
    {
      icon: Heart,
      title: 'Patient-Centered Care',
      description: 'We put patients at the heart of everything we do, ensuring accessible and quality healthcare for all.',
    },
    {
      icon: Users,
      title: 'Expert Network',
      description: 'Our platform connects you with qualified healthcare professionals across multiple specialties.',
    },
    {
      icon: Award,
      title: 'Quality Assurance',
      description: 'All doctors on our platform are verified and maintain the highest standards of medical practice.',
    },
    {
      icon: Globe,
      title: 'Accessibility',
      description: 'Making healthcare accessible to everyone, everywhere, through our user-friendly platform.',
    },
    {
      icon: Target,
      title: 'Innovation',
      description: 'Leveraging technology to improve healthcare delivery and patient experience.',
    },
    {
      icon: Shield,
      title: 'Privacy & Security',
      description: 'Your health information is protected with enterprise-grade security and privacy measures.',
    },
  ];

  const stats = [
    { number: 500, label: 'Healthcare Professionals' },
    { number: 10000, label: 'Happy Patients' },
    { number: 25, label: 'Medical Specialties' },
    { number: 99.9, label: 'Platform Uptime' },
  ];

  return (
    <Box>
      <Box bg={useColorModeValue('gray.50', 'gray.800')} py={20}>
        <Container maxW="7xl">
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            textAlign="center"
          >
            <Heading as="h1" size="3xl" mb={6}>
              About <Text as="span" color="blue.500">CareConnect</Text>
            </Heading>
            <Text fontSize="xl" color="gray.600" maxW="3xl" mx="auto">
              We're revolutionizing healthcare by making it easier for patients to connect with qualified medical professionals.
              Our mission is to provide accessible, quality healthcare for everyone.
            </Text>
          </MotionBox>
        </Container>
      </Box>

      <Box py={20}>
        <Container maxW="7xl">
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={12} alignItems="center">
            <MotionBox
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Heading as="h2" size="2xl" mb={6}>
                Our Mission
              </Heading>
              <Text fontSize="lg" color="gray.600" mb={6} lineHeight="tall">
                At CareConnect, we believe healthcare should be accessible, transparent, and patient-focused.
                We're building a platform that removes barriers between patients and healthcare providers,
                making it easier than ever to find, connect with, and book appointments with qualified medical professionals.
              </Text>
              <Text fontSize="lg" color="gray.600" lineHeight="tall">
                Our AI-powered assistant provides 24/7 support, helping patients navigate their healthcare journey
                and get the information they need, when they need it.
              </Text>
            </MotionBox>
            <MotionBox
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Image
                src="https://images.pexels.com/photos/4033148/pexels-photo-4033148.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Healthcare team"
                rounded="xl"
                shadow="lg"
              />
            </MotionBox>
          </SimpleGrid>
        </Container>
      </Box>

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
              Our Values
            </Heading>
            <Text fontSize="xl" color="gray.600" maxW="3xl" mx="auto">
              These core values guide everything we do and shape how we serve our community
            </Text>
          </MotionBox>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {values.map((value, index) => (
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
              >
                <Flex
                  w={12}
                  h={12}
                  rounded="lg"
                  bg="blue.100"
                  align="center"
                  justify="center"
                  mb={4}
                >
                  <Icon as={value.icon} w={6} h={6} color="blue.500" />
                </Flex>
                <Heading as="h3" size="lg" mb={3}>
                  {value.title}
                </Heading>
                <Text color="gray.600">{value.description}</Text>
              </MotionBox>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      <Box py={20} bg="blue.500">
        <Container maxW="7xl">
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            textAlign="center"
            mb={12}
          >
            <Heading as="h2" size="2xl" color="white" mb={4}>
              Our Impact
            </Heading>
            <Text fontSize="xl" color="blue.100">
              Making a difference in healthcare, one connection at a time
            </Text>
          </MotionBox>

          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={8}>
            {stats.map((stat, index) => (
              <MotionBox
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
                textAlign="center"
              >
                <Text fontSize={{ base: '4xl', md: '5xl' }} fontWeight="bold" color="white" mb={2}>
                  <CountUp end={stat.number} duration={2.75} separator="," />
                  {index === 3 ? '' : '+'}
                </Text>
                <Text color="blue.100">{stat.label}</Text>
              </MotionBox>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      <Box py={20}>
        <Container maxW="7xl">
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            bgGradient="linear(to-r, blue.50, teal.50)"
            rounded="2xl"
            p={{ base: 8, md: 12 }}
            textAlign="center"
          >
            <Heading as="h3" size="2xl" mb={4}>
              Ready to Experience Better Healthcare?
            </Heading>
            <Text fontSize="lg" color="gray.600" mb={8} maxW="2xl" mx="auto">
              Join thousands of patients who trust CareConnect for their healthcare needs.
              Start your journey to better health today.
            </Text>
            <Link to="/doctors">
              <Button colorScheme="blue" size="lg" rightIcon={<ArrowForwardIcon />}>
                Find a Doctor Today
              </Button>
            </Link>
          </MotionBox>
        </Container>
      </Box>
    </Box>
  );
};

export default About;