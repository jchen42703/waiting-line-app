import { Link } from "react-router-dom";
import {
    Box,
    Flex,
    Text,
    Button,
    Stack,
    useColorModeValue,
    useBreakpointValue,
  } from '@chakra-ui/react';
  
  export default function Navbar() {
    return (
      <Box>
        <Flex
          bg={useColorModeValue('white', 'gray.800')}
          color={useColorModeValue('gray.600', 'white')}
          minH={'60px'}
          py={{ base: 2 }}
          px={{ base: 4 }}
          borderBottom={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.900')}
          align={'center'}>
          <Flex
            flex={{ base: 1, md: 'auto' }}
            ml={{ base: -2 }}
            display={{ base: 'flex', md: 'none' }}>
  
          </Flex>
          <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
            <Text
              textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
              fontFamily={'heading'}
              fontSize={{sm:"xl",md:"3xl",lg:"3xl"}}
              pl={{md:"1%",lg:"2%"}}
              color={useColorModeValue('gray.800', 'white')}>
              Lyne
            </Text>
  
            <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
              <DesktopNav />
            </Flex>
          </Flex>
  
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            direction={'row'}
            spacing={6}>
               <Link to="/login">
            <Button
              display={{ md: 'inline-flex' }}
              fontSize={{sm:'xs',md:"md",lg:"lg"}}
              fontWeight={600}
              color={'white'}
              bg={'pink.400'}
              _hover={{
                bg: 'pink.300',
              }}>
             Login 
            </Button>
            </Link>
          </Stack>
        </Flex>      
      </Box>
    );
  }
  
  const DesktopNav = () => {
    return (
      <Stack direction={'row'} spacing={4}>
      </Stack>
    );
  };
  
  