import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  SimpleGrid,
  Image,
  Badge,
  Flex,
  Icon,
  Collapse,
  Select,
  Stack,
} from '@chakra-ui/react';
import { SearchIcon, StarIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import { useApp } from '../contexts/AppContext';
import { mockDoctors } from '../data/mockData';
import { Doctor } from '../types';
import { Clock, DollarSign, Filter } from 'lucide-react';

const MotionBox = motion(Box);

const Doctors: React.FC = () => {
  const { doctors, setDoctors, searchQuery, setSearchQuery, selectedSpecialization, setSelectedSpecialization } = useApp();
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setDoctors(mockDoctors);
  }, [setDoctors]);

  const specializations = [...new Set(doctors.map(doctor => doctor.specialization))];

  const filteredDoctors = useMemo(() => {
    return doctors.filter(doctor => {
      const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSpecialization = selectedSpecialization === '' || doctor.specialization === selectedSpecialization;
      return matchesSearch && matchesSpecialization;
    });
  }, [doctors, searchQuery, selectedSpecialization]);

  return (
    <Box bg="gray.50" minH="100vh" py={8}>
      <Container maxW="7xl">
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          textAlign="center"
          mb={12}
        >
          <Heading as="h1" size="2xl" mb={4}>
            Find Your Doctor
          </Heading>
          <Text fontSize="xl" color="gray.600">
            Connect with qualified healthcare professionals
          </Text>
        </MotionBox>

        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          mb={8}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <InputGroup maxW="2xl" mb={4}>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="Search doctors by name or specialization..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              bg="white"
            />
          </InputGroup>

          <Button onClick={() => setShowFilters(!showFilters)} leftIcon={<Icon as={Filter} />}>
            Filters
          </Button>

          <Collapse in={showFilters} animateOpacity>
            <Box p={4} mt={4} bg="white" rounded="md" shadow="md">
              <Stack>
                <Select
                  placeholder="All Specializations"
                  value={selectedSpecialization}
                  onChange={(e) => setSelectedSpecialization(e.target.value)}
                >
                  {specializations.map(spec => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </Select>
              </Stack>
            </Box>
          </Collapse>
        </MotionBox>

        <Text mb={8} color="gray.600">
          Found {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''}
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {filteredDoctors.map((doctor, index) => (
            <MotionBox
              key={doctor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ y: -5 }}
              bg="white"
              rounded="xl"
              shadow="lg"
              overflow="hidden"
            >
              <Box position="relative">
                <Image src={doctor.image} alt={doctor.name} w="full" h={48} objectFit="cover" />
                <Badge
                  position="absolute"
                  top={4}
                  right={4}
                  colorScheme="yellow"
                  display="flex"
                  alignItems="center"
                >
                  <Icon as={StarIcon} mr={1} /> {doctor.rating}
                </Badge>
              </Box>

              <Box p={6}>
                <Heading as="h3" size="lg" mb={1}>
                  {doctor.name}
                </Heading>
                <Text color="blue.600" fontWeight="medium" mb={3}>
                  {doctor.specialization}
                </Text>

                <Stack spacing={2} mb={4}>
                  <Flex align="center">
                    <Icon as={Clock} mr={2} />
                    <Text fontSize="sm">{doctor.experience} years experience</Text>
                  </Flex>
                  <Flex align="center">
                    <Icon as={DollarSign} mr={2} />
                    <Text fontSize="sm">${doctor.consultationFee} consultation fee</Text>
                  </Flex>
                  <Flex align="center">
                    <Icon as={StarIcon} mr={2} />
                    <Text fontSize="sm">{doctor.reviewCount} reviews</Text>
                  </Flex>
                </Stack>

                <Stack direction="row" spacing={2}>
                  <Link to={`/doctors/${doctor.id}`} style={{ flex: 1 }}>
                    <Button colorScheme="blue" w="full">
                      View Profile
                    </Button>
                  </Link>
                  <Link to={`/book/${doctor.id}`} style={{ flex: 1 }}>
                    <Button variant="outline" colorScheme="blue" w="full">
                      Book Now
                    </Button>
                  </Link>
                </Stack>
              </Box>
            </MotionBox>
          ))}
        </SimpleGrid>

        {filteredDoctors.length === 0 && (
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            textAlign="center"
            py={16}
          >
            <Box bg="gray.100" rounded="full" w={24} h={24} display="flex" alignItems="center" justifyContent="center" mx="auto" mb={4}>
              <Icon as={SearchIcon} w={12} h={12} color="gray.400" />
            </Box>
            <Heading as="h3" size="lg" mb={2}>
              No doctors found
            </Heading>
            <Text color="gray.600" mb={4}>
              Try adjusting your search criteria
            </Text>
            <Button
              onClick={() => {
                setSearchQuery('');
                setSelectedSpecialization('');
              }}
              colorScheme="blue"
            >
              Clear Filters
            </Button>
          </MotionBox>
        )}
      </Container>
    </Box>
  );
};

export default Doctors;