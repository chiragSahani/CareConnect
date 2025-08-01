import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  useToast,
  Flex,
  Button,
  HStack,
  Tag,
  TagLabel,
  TagLeftIcon,
  Image,
  Divider,
  Icon,
  Stack,
} from '@chakra-ui/react';
import {
  Calendar,
  Clock,
  User,
  Phone,
  FileText,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import LoadingSpinner from '../components/common/LoadingSpinner';

const MotionBox = motion(Box);

const Appointments: React.FC = () => {
  const { appointments, doctors, setAppointments, isLoadingAppointments } = useApp();
  const toast = useToast();

  const getDoctor = (doctorId: string) => doctors.find(d => d.id === doctorId);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return CheckCircle;
      case 'cancelled':
        return XCircle;
      default:
        return Clock;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'green';
      case 'cancelled':
        return 'red';
      default:
        return 'yellow';
    }
  };

  const clearAppointments = () => {
    localStorage.removeItem('appointments');
    setAppointments([]);
    toast({
      title: 'Appointments cleared.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  if (isLoadingAppointments) {
    return (
      <Box bg="gray.50" minH="100vh" display="flex" alignItems="center" justifyContent="center">
        <LoadingSpinner size="xl" />
      </Box>
    );
  }

  if (appointments.length === 0) {
    return (
      <Box bg="gray.50" minH="100vh" py={28}>
        <Container maxW="4xl">
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            textAlign="center"
          >
            <Heading as="h1" size="2xl" mb={8}>
              My Appointments
            </Heading>
            <Box bg="white" rounded="xl" shadow="lg" p={12}>
              <Box
                bg="gray.100"
                rounded="full"
                w={24}
                h={24}
                display="flex"
                alignItems="center"
                justifyContent="center"
                mx="auto"
                mb={6}
              >
                <Icon as={Calendar} w={12} h={12} color="gray.400" />
              </Box>
              <Heading as="h2" size="lg" mb={4}>
                No appointments yet
              </Heading>
              <Text color="gray.600" mb={8}>
                You haven't booked any appointments. Start by finding a doctor.
              </Text>
              <Link to="/doctors">
                <Button colorScheme="blue" size="lg">
                  Find Doctors
                </Button>
              </Link>
            </Box>
          </MotionBox>
        </Container>
      </Box>
    );
  }

  return (
    <Box bg="gray.50" minH="100vh" pt={28} pb={8}>
      <Container maxW="4xl">
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          mb={8}
        >
          <Heading as="h1" size="2xl" mb={2}>
            My Appointments
          </Heading>
          <Text color="gray.600">
            Manage your upcoming and past appointments
          </Text>
        </MotionBox>

        <Flex justify="flex-end" mb={8}>
          <Button colorScheme="red" onClick={clearAppointments}>
            Clear All Appointments
          </Button>
        </Flex>

        <Stack spacing={6}>
          {appointments.map((appointment, index) => {
            const doctor = getDoctor(appointment.doctorId);
            if (!doctor) return null;

            return (
              <MotionBox
                key={appointment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                bg="white"
                rounded="xl"
                shadow="lg"
                overflow="hidden"
                _hover={{ shadow: 'xl' }}
              >
                <Box p={6}>
                  <Flex
                    direction={{ base: 'column', lg: 'row' }}
                    justify="space-between"
                    gap={4}
                  >
                    <Flex
                      direction={{ base: 'column', md: 'row' }}
                      gap={4}
                      flex="1"
                      align="flex-start"
                      wrap="wrap"
                    >
                      <Image
                        src={doctor.image}
                        alt={doctor.name}
                        w={16}
                        h={16}
                        minW={16}
                        minH={16}
                        rounded="full"
                        objectFit="cover"
                      />
                      <Box>
                        <Heading as="h3" size="lg" mb={1}>
                          {doctor.name}
                        </Heading>
                        <Text color="blue.500" fontWeight="medium" mb={2}>
                          {doctor.specialization}
                        </Text>
                        <VStack
                          align="flex-start"
                          spacing={1}
                          color="gray.600"
                          fontSize="sm"
                        >
                          <HStack>
                            <Icon as={Calendar} w={4} h={4} />
                            <Text>
                              {format(new Date(appointment.date), 'EEEE, MMMM d, yyyy')}
                            </Text>
                          </HStack>
                          <HStack>
                            <Icon as={Clock} w={4} h={4} />
                            <Text>{appointment.time}</Text>
                          </HStack>
                          <HStack>
                            <Icon as={User} w={4} h={4} />
                            <Text>{appointment.patientName}</Text>
                          </HStack>
                          <HStack>
                            <Icon as={Phone} w={4} h={4} />
                            <Text>{appointment.patientPhone}</Text>
                          </HStack>
                        </VStack>
                      </Box>
                    </Flex>

                    <Box
                      mt={{ base: 4, lg: 0 }}
                      textAlign={{ base: 'left', lg: 'right' }}
                      minW={{ lg: '200px' }}
                    >
                      <Tag
                        size="lg"
                        variant="subtle"
                        colorScheme={getStatusColor(appointment.status)}
                        mb={2}
                      >
                        <TagLeftIcon
                          boxSize="12px"
                          as={getStatusIcon(appointment.status)}
                        />
                        <TagLabel textTransform="capitalize">
                          {appointment.status}
                        </TagLabel>
                      </Tag>
                      <Text fontSize="sm" color="gray.500">
                        Booked on {format(new Date(appointment.createdAt), 'MMM d, yyyy')}
                      </Text>
                    </Box>
                  </Flex>

                  {appointment.symptoms && (
                    <>
                      <Divider my={4} />
                      <HStack align="flex-start">
                        <Icon as={FileText} color="gray.400" mt={1} />
                        <Box>
                          <Text fontWeight="medium" mb={1}>
                            Symptoms/Reason:
                          </Text>
                          <Text color="gray.600">{appointment.symptoms}</Text>
                        </Box>
                      </HStack>
                    </>
                  )}
                </Box>
              </MotionBox>
            );
          })}
        </Stack>
      </Container>
    </Box>
  );
};

export default Appointments;
