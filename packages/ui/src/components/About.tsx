import {
    Box,
    VStack,
    Button,
    Flex,
    Divider,
    chakra,
    Grid,
    Text,
    GridItem,
    Container,
  } from '@chakra-ui/react';
import {IoQrCodeOutline} from "react-icons/io5";
import {AiFillEdit,AiOutlineUnorderedList} from "react-icons/ai"
import {IoIosNotifications} from "react-icons/io"
import "../styles/pages/login.scss"

  export default function About() {
    return (
      <Box bg={"#F7F5F2"} as={Container} maxW={"container.xl"}  pt={"10%"} >
        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(2, 1fr)',
          }}
          gap={4}>
          <GridItem colSpan={1}>
            <VStack pl="10%" alignItems="flex-start" spacing="20px">
              <chakra.h2 fontWeight="bold" fontSize="3xl" >
                Easy to use waiting line app.
              </chakra.h2>
              <Text fontWeight="semibold" fontSize={"lg"}>We bring together everything thats <Text color="blue">required to seamlessly create a waiting line </Text> for your business.</Text>
              <Button colorScheme="blue" rounded="lg" size="md">
                Get started with your queue.
              </Button>
            </VStack>
          </GridItem>
          <GridItem>
            <Flex pt="10%">
              <chakra.p fontWeight="semibold" fontSize={"lg"}>
                We provide easy to use, flexible and secure dashboards to manage your customers.
                Focus on your business and leave the rest to us.
              </chakra.p>
            </Flex>
          </GridItem>
        </Grid>
        <Divider mt={12} mb={12} />
        <Grid
          pl="5%"
          pb="10%"
          templateColumns={{
            base: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          }}
          gap={{ lg: '30', sm: '12', md: '16' }}>
          <GridItem >
        <chakra.h2 pb="10%" fontSize="xl" fontWeight="semibold">
        Create a queue
        </chakra.h2>
        <AiOutlineUnorderedList color="blue" size="35px"/>
        <Text pt="10%" fontWeight={"semibold"}>Start your Lyne with a simple click of a button.</Text>
      </GridItem>
      <GridItem >
        <chakra.h2 pb="5%" fontSize="xl" fontWeight="semibold">
        Simple QR Code to join your queue
        </chakra.h2>
        <IoQrCodeOutline color="blue" size="35px"/>
        <Text pt="3%" fontWeight={"semibold"}>Have your users join simply by scanning your unique waiting line QR code.</Text>
      </GridItem>
      <GridItem >
        <chakra.h2 pb="5%" fontSize="xl" fontWeight="semibold">
       Easily view and control your waiting lines
        </chakra.h2>
        <AiFillEdit color="blue" size="40px"/>
        <Text pt="3%" fontWeight={"semibold"}>Lyne provides you ability to view who is in your queue as well as banning unwanted users.</Text>
      </GridItem>
      <GridItem >
        <chakra.h2 pb="13%" fontSize="xl" fontWeight="semibold">
       Notify your users
        </chakra.h2>
        <IoIosNotifications color="blue" size="40px"/>
        <Text pt="5%" fontWeight={"semibold"}>Send out notifications when you are ready for a user.</Text>
      </GridItem>
        </Grid>
      </Box>
    );
  }