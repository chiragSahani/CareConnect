import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Heart, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Links = [
  { path: '/', label: 'Home' },
  { path: '/doctors', label: 'Find Doctors' },
  { path: '/appointments', label: 'My Appointments' },
  { path: '/about', label: 'About' },
];

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link to={to}>
      <Button
        as="a"
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
          textDecoration: 'none',
          bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        bg={isActive ? useColorModeValue('blue.100', 'blue.900') : 'transparent'}
        color={isActive ? 'blue.500' : 'gray.500'}
        position="relative"
      >
        {children}
        {isActive && (
          <motion.div
            layoutId="underline"
            style={{
              position: 'absolute',
              bottom: '-2px',
              left: 0,
              right: 0,
              height: '2px',
              background: 'blue.500',
            }}
          />
        )}
      </Button>
    </Link>
  );
};

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Box
      as={motion.header}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      bg={isScrolled ? useColorModeValue('white', 'gray.800') : 'transparent'}
      px={4}
      shadow={isScrolled ? 'sm' : 'none'}
      position="fixed"
      width="100%"
      zIndex="docked"
      backdropFilter={isScrolled ? 'blur(10px)' : 'none'}
    >
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={'center'}>
          <Link to="/">
            <HStack>
              <Box bg="blue.500" p={2} rounded="lg">
                <Heart size={20} color="white" />
              </Box>
              <Text fontSize="xl" fontWeight="bold">
                CareConnect
              </Text>
            </HStack>
          </Link>
          <HStack
            as={'nav'}
            spacing={4}
            display={{ base: 'none', md: 'flex' }}
          >
            {Links.map((link) => (
              <NavLink key={link.path} to={link.path}>
                {link.label}
              </NavLink>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems={'center'}>
          <Link to="/chat">
            <Button
              variant={'solid'}
              colorScheme={'teal'}
              size={'sm'}
              mr={4}
              leftIcon={<MessageCircle size={16} />}
            >
              AI Assistant
            </Button>
          </Link>
        </Flex>
      </Flex>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Box pb={4} display={{ md: 'none' }}>
              <Stack as={'nav'} spacing={4}>
                {Links.map((link) => (
                  <NavLink key={link.path} to={link.path}>
                    {link.label}
                  </NavLink>
                ))}
              </Stack>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}